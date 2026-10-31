"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { detectTier, type Tier } from "@/lib/tier";
import type { PointerState } from "@/scene/Peak";
import { RingSvg } from "./RingSvg";

const Peak = dynamic(() => import("@/scene/Peak"), { ssr: false });

/**
 * The "e" of the logo with a live 3D Himalayan peak inside its bowl.
 * Below the seam of the hero the ring turns white, like the headline.
 */
export function HeroMark() {
  const [tier, setTier] = useState<Tier | null>(null);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const pointer = useRef<PointerState>({ x: 0, y: 0, dragX: 0, dragging: false });
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Probe the GPU once the page is interactive, off the first paint.
    const id = requestAnimationFrame(() => setTier(detectTier()));
    return () => cancelAnimationFrame(id);
  }, []);

  // Pointer parallax over the whole hero, drag to turn the peak, pause when off screen.
  useEffect(() => {
    const hero = box.current?.closest(".hero") as HTMLElement | null;
    if (!hero) return;
    const p = pointer.current;
    let lastX = 0;
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      p.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      p.y = ((e.clientY - r.top) / Math.min(r.height, window.innerHeight)) * 2 - 1;
      if (p.dragging) {
        p.dragX += ((e.clientX - lastX) / r.width) * 2.4;
        lastX = e.clientX;
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!(e.target as HTMLElement).closest(".mark__bowl")) return;
      p.dragging = true;
      lastX = e.clientX;
    };
    const onUp = () => {
      p.dragging = false;
    };
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.05 });
    if (box.current) io.observe(box.current);
    const onVis = () => setActive(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const live = tier !== null && tier !== "static";

  return (
    <div className="mark" ref={box} data-live={live} aria-label="EarthClique mark with a live 3D Himalayan peak inside. Drag to turn it.">
      {live && (
        <div className="mark__bowl">
          <Peak tier={tier} pointer={pointer} active={active} onReady={() => setReady(true)} onLost={() => { setReady(false); setTier("static"); }} />
        </div>
      )}
      <img className="mark__flat" src="/brand/mark.svg" alt="" width={512} height={512} data-hide={ready} fetchPriority="high" />
      <div className="mark__ring mark__ring--top" aria-hidden="true"style={{ opacity: ready ? 1 : 0, transition: "opacity 600ms ease" }}>
        <RingSvg />
      </div>
      <div className="mark__ring mark__ring--bottom" aria-hidden="true" style={{ opacity: ready ? 1 : 0, transition: "opacity 600ms ease" }}>
        <RingSvg />
      </div>
    </div>
  );
}

