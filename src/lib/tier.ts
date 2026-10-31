export type Tier = "full" | "lite" | "static";

type NavigatorHints = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

// Entry-level mobile GPUs that cannot hold the full scene smoothly, plus software renderers.
const LOW_END_GPU =
  /Mali-(4\d\d|T\d+|G31|G51|G52|G57|G71|G72)\b|Adreno \(TM\) ([2-5]\d\d|6[01]\d)\b|PowerVR|Vivante|SwiftShader|llvmpipe/i;

function probeRenderer(): string | null {
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    if (!gl) return null;
    let renderer = String(gl.getParameter(gl.RENDERER));
    if (/webkit/i.test(renderer)) {
      const info = gl.getExtension("WEBGL_debug_renderer_info");
      if (info) renderer = String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL));
    }
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return renderer;
  } catch {
    return null;
  }
}

/** How much 3D this device gets. Add `?quality=full|lite|static` to the URL to force a tier. */
export function detectTier(): Tier {
  if (typeof window === "undefined") return "static";
  const forced = new URLSearchParams(window.location.search).get("quality");
  if (forced === "full" || forced === "lite" || forced === "static") return forced;
  const renderer = probeRenderer();
  if (renderer === null) return "static";
  const nav = navigator as NavigatorHints;
  const memory = nav.deviceMemory ?? 8;
  if (nav.connection?.saveData || memory <= 2) return "static";
  if (LOW_END_GPU.test(renderer) || memory <= 4 || window.innerWidth < 720) return "lite";
  return "full";
}
