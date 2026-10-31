// Procedural Himalayan massif: a ridged-noise peak lifted in the vertex shader, lit by a sun
// whose height follows the real time of day in Haridwar.

export const terrainVertex = /* glsl */ `
  #ifndef OCTAVES
  #define OCTAVES 5
  #endif
  uniform float uTime;
  varying float vH;
  varying vec3 vN;
  varying vec3 vPos;

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float ridged(vec2 p) {
    float sum = 0.0;
    float amp = 0.5;
    float prev = 1.0;
    for (int i = 0; i < OCTAVES; i++) {
      float n = 1.0 - abs(noise(p) * 2.0 - 1.0);
      n = pow(n, 1.6);
      sum += n * amp * (0.6 + 0.4 * prev);
      prev = n;
      amp *= 0.47;
      p = p * 2.0 + vec2(1.7, 9.2);
    }
    return sum;
  }
  float fbm(vec2 p) {
    float sum = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      sum += noise(p) * amp;
      amp *= 0.5;
      p = p * 2.0 + vec2(3.1, 1.7);
    }
    return sum;
  }
  float height(vec2 p) {
    vec2 q = p * vec2(1.0, 1.3);
    float d = dot(q, q);
    float massif = exp(-d * 0.16);
    float summit = exp(-dot(p - vec2(0.2, -0.3), p - vec2(0.2, -0.3)) * 0.9);
    float r = ridged(p * 0.7 + vec2(2.3, 4.1));
    float base = fbm(p * 0.6 + vec2(5.2, 1.1));
    float h = massif * (1.7 * r + 0.3) + summit * 0.9 * (0.5 + r) + base * 0.35 * (0.3 + massif) - 0.3;
    return h;
  }
  void main() {
    vec2 p = position.xy;
    float h = height(p);
    float e = 0.06;
    float hx = height(p + vec2(e, 0.0)) - height(p - vec2(e, 0.0));
    float hy = height(p + vec2(0.0, e)) - height(p - vec2(0.0, e));
    vec3 n = normalize(vec3(-hx, 2.0 * e, -hy));
    vec3 pos = vec3(p.x, h, -p.y);
    vH = h;
    vN = n;
    vPos = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const terrainFragment = /* glsl */ `
  precision highp float;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform vec3 uRock;
  uniform vec3 uSnow;
  uniform vec3 uSky;
  uniform vec3 uFog;
  uniform vec3 uCoral;
  uniform float uDay;     // 0 night, 1 day
  uniform float uGlow;    // coral rim strength, strongest at dawn and dusk
  uniform vec3 uCamera;
  varying float vH;
  varying vec3 vN;
  varying vec3 vPos;

  void main() {
    vec3 n = normalize(vN);
    vec3 sun = normalize(uSunDir);
    float ndl = max(dot(n, sun), 0.0);
    float snowLine = 0.8;
    float snow = smoothstep(snowLine, snowLine + 0.7, vH) * smoothstep(0.3, 0.7, n.y);
    snow = max(snow, smoothstep(1.6, 2.4, vH) * 0.9);
    vec3 albedo = mix(uRock, uSnow, snow);
    vec3 ambient = uSky * (0.35 + 0.25 * n.y);
    vec3 col = albedo * (ambient * mix(0.9, 1.0, uDay) + uSunColor * ndl * mix(0.55, 1.1, uDay));
    vec3 view = normalize(uCamera - vPos);
    float rim = pow(1.0 - max(dot(n, view), 0.0), 4.0) * smoothstep(0.2, 0.9, dot(n, sun));
    col += uCoral * rim * uGlow * 0.22;
    col = mix(col, uCoral, uGlow * ndl * snow * 0.35);
    float dist = length(uCamera - vPos);
    float fog = 1.0 - exp(-dist * dist * 0.0028);
    float valley = 1.0 - smoothstep(-0.4, 0.9, vH);
    fog = max(fog, valley * 0.85);
    col = mix(col, uFog, clamp(fog, 0.0, 1.0));
    gl_FragColor = vec4(col, 1.0);
  }
`;

export const sunVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const sunFragment = /* glsl */ `
  precision highp float;
  uniform vec3 uColor;
  uniform float uAlpha;
  varying vec2 vUv;
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float disc = smoothstep(0.42, 0.38, d);
    float halo = smoothstep(1.0, 0.4, d) * 0.35;
    gl_FragColor = vec4(uColor, (disc + halo) * uAlpha);
  }
`;
