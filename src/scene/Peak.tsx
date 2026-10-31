"use client";
/* eslint-disable react-hooks/immutability -- a Three.js scene: materials, uniforms and meshes are mutated every frame by design. */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  MathUtils,
  Mesh,
  PlaneGeometry,
  Points,
  ShaderMaterial,
  Vector3,
} from "three";
import type { Tier } from "@/lib/tier";
import { haridwarHour, sunElevation } from "@/lib/time";
import { sunFragment, sunVertex, terrainFragment, terrainVertex } from "./shaders";

export interface PointerState {
  x: number; // -1..1 across the hero
  y: number; // -1..1 down the hero
  dragX: number; // accumulated drag yaw in radians
  dragging: boolean;
}

const DAY = {
  sky: new Color("#e8f2f3"),
  fog: new Color("#dbeaec"),
  rock: new Color("#0e6b76"),
  snow: new Color("#ffffff"),
  sun: new Color("#fff3e6"),
};
const NIGHT = {
  sky: new Color("#0b2e33"),
  fog: new Color("#10383f"),
  rock: new Color("#154a52"),
  snow: new Color("#b7dde1"),
  sun: new Color("#7fc3cb"),
};
const CORAL = new Color("#ee5a3c");
const SUN_DISC = new Color("#f27a55");

function buildGrid(size: number, segments: number) {
  const geometry = new PlaneGeometry(size, size, segments, segments);
  // The vertex shader reads position.xy as ground coordinates and lifts y into height.
  return geometry;
}

function Terrain({ tier, pointer }: { tier: Tier; pointer: RefObject<PointerState> }) {
  const group = useRef<Group>(null);
  const sunMesh = useRef<Mesh>(null);
  const stars = useRef<Points>(null);
  const camera = useThree((s) => s.camera);
  const segments = tier === "full" ? 170 : 100;
  const geometry = useMemo(() => buildGrid(11, segments), [segments]);
  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: terrainVertex,
        fragmentShader: terrainFragment,
        defines: { OCTAVES: tier === "full" ? 5 : 4 },
        uniforms: {
          uTime: { value: 0 },
          uSunDir: { value: new Vector3(0.4, 0.5, -1).normalize() },
          uSunColor: { value: DAY.sun.clone() },
          uRock: { value: DAY.rock.clone() },
          uSnow: { value: DAY.snow.clone() },
          uSky: { value: DAY.sky.clone() },
          uFog: { value: DAY.fog.clone() },
          uCoral: { value: CORAL },
          uDay: { value: 1 },
          uGlow: { value: 0.4 },
          uCamera: { value: new Vector3() },
        },
      }),
    [tier],
  );
  const sunMaterial = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader: sunVertex,
        fragmentShader: sunFragment,
        uniforms: { uColor: { value: SUN_DISC.clone() }, uAlpha: { value: 1 } },
        transparent: true,
        depthWrite: false,
      }),
    [],
  );
  const starGeometry = useMemo(() => {
    const n = 220;
    const positions = new Float32Array(n * 3);
    // Deterministic pseudo-random sky so the same stars come back on every visit.
    let seed = 1234567;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < n; i++) {
      const a = rnd() * Math.PI * 2;
      const el = rnd() * 0.9 + 0.05;
      const r = 40;
      positions[i * 3] = Math.cos(a) * Math.cos(el) * r;
      positions[i * 3 + 1] = Math.sin(el) * r;
      positions[i * 3 + 2] = Math.sin(a) * Math.cos(el) * r - 10;
    }
    const g = new BufferGeometry();
    g.setAttribute("position", new BufferAttribute(positions, 3));
    return g;
  }, []);

  const scene = useThree((s) => s.scene);
  const sky = useMemo(() => new Color(), []);
  const tmp = useMemo(() => new Vector3(), []);
  const reduced = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
    sunMaterial.dispose();
    starGeometry.dispose();
  }, [geometry, material, sunMaterial, starGeometry]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const hour = haridwarHour();
    const el = sunElevation(hour); // -1..1
    const day = MathUtils.smoothstep(el, -0.15, 0.25);
    const glow = 1 - MathUtils.smoothstep(Math.abs(el), 0.05, 0.45); // strongest near the horizon
    const u = material.uniforms;
    u.uDay.value = day;
    u.uGlow.value = 0.25 + glow * 0.9;
    (u.uSky.value as Color).lerpColors(NIGHT.sky, DAY.sky, day);
    (u.uFog.value as Color).lerpColors(NIGHT.fog, DAY.fog, day);
    (u.uRock.value as Color).lerpColors(NIGHT.rock, DAY.rock, day);
    (u.uSnow.value as Color).lerpColors(NIGHT.snow, DAY.snow, day);
    (u.uSunColor.value as Color).lerpColors(NIGHT.sun, DAY.sun, day).lerp(CORAL, glow * 0.1);
    sky.lerpColors(NIGHT.sky, DAY.sky, day);
    scene.background = sky;

    // Sun travels east to west behind the peak; at night it drops below the ridge.
    const az = ((hour - 6) / 12) * Math.PI; // 0 at sunrise, PI at sunset
    const sunDir = tmp.set(-Math.cos(az) * 0.45, Math.max(el, -0.05) * 0.35 + 0.03, -0.85).normalize();
    (u.uSunDir.value as Vector3).copy(sunDir);
    if (sunMesh.current) {
      sunMesh.current.position.copy(sunDir).multiplyScalar(30);
      sunMesh.current.position.y = Math.max(sunMesh.current.position.y + 1.2, 0.6);
      sunMesh.current.lookAt(camera.position);
      sunMaterial.uniforms.uAlpha.value = MathUtils.clamp((el + 0.08) * 6, 0, 1) * 0.8;
    }
    if (stars.current) {
      (stars.current.material as ShaderMaterial & { opacity: number }).opacity = (1 - day) * 0.9;
    }
    (u.uCamera.value as Vector3).copy(camera.position);
    u.uTime.value = t;

    if (group.current) {
      const p = pointer.current;
      const idle = reduced ? 0 : t * 0.045;
      const targetY = idle + (p ? p.x * 0.28 + p.dragX : 0);
      const targetX = p ? -p.y * 0.08 : 0;
      group.current.rotation.y = MathUtils.damp(group.current.rotation.y, targetY, 4, delta);
      group.current.rotation.x = MathUtils.damp(group.current.rotation.x, targetX, 4, delta);
    }
  });

  return (
    <>
      <group ref={group} position={[0, -1.3, 0]}>
        <mesh geometry={geometry} material={material} frustumCulled={false} />
      </group>
      <mesh ref={sunMesh} material={sunMaterial}>
        <planeGeometry args={[9, 9]} />
      </mesh>
      <points ref={stars} geometry={starGeometry}>
        <pointsMaterial color="#c4eef1" size={0.12} sizeAttenuation transparent opacity={0} blending={AdditiveBlending} depthWrite={false} />
      </points>
    </>
  );
}

function Ready({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  useFrame((state) => {
    frames.current += 1;
    if (frames.current !== 4) return;
    // Hand over from the flat mark only once the peak has really been drawn: render once more and read a pixel from the slope.
    const gl = state.gl;
    const ctx = gl.getContext();
    if (ctx.isContextLost()) return;
    gl.render(state.scene, state.camera);
    const px = new Uint8Array(4);
    const w = ctx.drawingBufferWidth;
    const h = ctx.drawingBufferHeight;
    ctx.readPixels(Math.floor(w * 0.5), Math.floor(h * 0.25), 1, 1, ctx.RGBA, ctx.UNSIGNED_BYTE, px);
    const drewSomething = px[3] > 0 && (px[0] + px[1] + px[2] > 0);
    if (drewSomething) requestAnimationFrame(onReady);
  });
  return null;
}

export default function Peak({
  tier,
  pointer,
  active,
  onReady,
  onLost,
}: {
  tier: Tier;
  pointer: RefObject<PointerState>;
  active: boolean;
  onReady: () => void;
  onLost?: () => void;
}) {
  const [ready, setReady] = useState(false);
  return (
    <div className="peak-fade" data-ready={ready} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        dpr={tier === "full" ? [1, 1.75] : [1, 1.25]}
        frameloop={active ? "always" : "never"}
        gl={{ antialias: tier === "full", powerPreference: "high-performance", alpha: false }}
        camera={{ fov: 34, near: 0.1, far: 90, position: [0, 1.0, 7.2] }}
        onCreated={({ camera, gl }) => {
          camera.lookAt(0, 1.0, 0);
          gl.domElement.addEventListener("webglcontextlost", () => onLost?.(), { passive: true });
        }}
        style={{ touchAction: "pan-y" }}
      >
        <Terrain tier={tier} pointer={pointer} />
        <Ready
          onReady={() => {
            setReady(true);
            onReady();
          }}
        />
      </Canvas>
    </div>
  );
}
