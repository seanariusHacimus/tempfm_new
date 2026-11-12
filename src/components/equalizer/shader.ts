/**
 * TempFM "light ribbons" equalizer — GLSL (WebGL1).
 *
 * Geometry: two orthogonal families of Cassini ovals. For foci at (0, ±a)
 * the complex function w = (z² + a²) / a² gives a conformal coordinate pair:
 *   u = log|w|  — which ribbon we are on (0 = the lemniscate, the central "X")
 *   v = arg(w)  — position along that ribbon (0 at the centre, π at the far tip)
 * Lines of constant u are the ribbons. |u| is the frequency axis: bass sits on
 * the X and in the core, treble on the rims of the four dark ovals.
 *
 * uSpec is a BANDS × HISTORY texture (row 0 = now). Sampling it with a lag
 * proportional to v makes every sound travel outward along its ribbon.
 */

export const BANDS = 16;
export const HISTORY = 64;

export const VERTEX_SHADER = /* glsl */ `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER = /* glsl */ `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform sampler2D uSpec;
uniform float uFrac;    // progress towards the next history row, 0..1
uniform float uEnergy;  // overall loudness, 0..1
uniform float uBass;    // low end, 0..1
uniform float uBeat;    // kick impulse, 0..1, decays
uniform float uWave;    // ribbon vibration amount (0 = reduced motion)
uniform float uGain;    // master exposure
uniform vec2 uFocus;    // x: focus distance of the left/right family, y: top/bottom
uniform float uPx;      // line-width unit in scene units: ~0.9 CSS px, never under one rendered pixel

const float PI = 3.14159265;
const float N = ${BANDS}.0;
const float H = ${HISTORY}.0;
const float SPAN = 34.0;   // history rows spread along one ribbon
const float U_IN = 0.95;   // |u| where the dark ovals begin
const float U_OUT = 0.80;  // |u| where the outer ribbons fade out
const float SILK = 2.0;    // fine filaments per band
const float KAPPA = 0.22;  // keeps line width finite at the central saddle

float hash(float n) {
  return fract(sin(n * 127.1) * 43758.5453);
}

float spec(float band, float lag) {
  return texture2D(uSpec, vec2((band + 0.5) / N, (lag * SPAN - uFrac + 0.5) / H)).r;
}

// Standing wave of one band's string. Whole numbers of half-waves keep the
// mirrored quadrants seamless; high bands ripple finer but shallower.
float standing(float i, float v, float ph) {
  float n = 2.0 + floor(i * 0.5);
  float wave = cos(n * PI * v) * cos(ph * (1.0 + 0.11 * i))
             + 0.5 * cos((n + 1.0) * PI * v) * cos(ph * 0.63 * (1.0 + 0.07 * i) + 1.3);
  return wave / (1.0 + 0.12 * i);
}

// One family of ribbons, foci at (0, ±a). p is already folded into x,y >= 0.
// open: 1 outside this family's dark oval, 0 inside it.
vec3 family(vec2 p, float a, float seed, out float open) {
  float a2 = a * a;
  float re = p.x * p.x - p.y * p.y + a2;
  float im = 2.0 * p.x * p.y;
  float m2 = re * re + im * im + 1e-9;
  float u = 0.5 * log(m2 / (a2 * a2));
  float v = atan(im, re) / PI;
  float g = 2.0 * length(p) / sqrt(m2);

  float inner = step(u, 0.0);
  float range = mix(U_OUT, U_IN, inner);
  float s = abs(u) / range;
  float t = min(s, 1.5) * (N - 1.0);

  float i0 = min(floor(t), N - 1.0);
  float i1 = min(i0 + 1.0, N - 1.0);
  float f = clamp(t - i0, 0.0, 1.0);
  float lag = v * v * (3.0 - 2.0 * v);
  float reach = mix(1.0, 0.4, v);  // sound fades as it travels outward
  float L0 = spec(i0, lag) * reach;
  float L1 = spec(i1, lag) * reach;
  float Lb = mix(L0, L1, f);

  // Each ribbon is a string: standing waves keep the mirror symmetry seamless.
  float ph = uTime * 2.2 + seed;
  float D = uWave * 0.75 * mix(L0 * standing(i0, v, ph), L1 * standing(i1, v, ph), f);

  float tw = (1.0 - 2.0 * inner) * t - D;
  float bandToU = range / (N - 1.0);
  float inv = 1.0 / (g + KAPPA);
  float px = uPx;

  // Band strings — one per frequency band.
  float k = floor(tw + 0.5);
  float e = (tw - k) * bandToU * inv;
  float w = px * (0.7 + 2.6 * Lb);
  float str = w * w / (e * e + w * w) * (0.10 + 2.4 * Lb * Lb);
  str += exp(-abs(tw - k) * 3.0) * Lb * Lb * 0.45;

  // Body — the whole band lights up softly with its level (inside the lobes
  // only, easing in from the X so the lobe outline never shows as a hard edge).
  float body = 0.03 + 0.26 * Lb * sqrt(Lb);

  // Silk — translucent veils drifting from the X towards the rims. Each veil
  // has a crisp leading edge and fades away behind it.
  float qs = abs(tw) * SILK - uTime * 0.16 + seed * 1.37;
  float cell = floor(qs);
  float fr = qs - cell;
  float hv = hash(cell + seed * 31.0);
  float cellPx = bandToU / SILK * inv / px;      // veil width in pixels
  float edge = clamp(fr * cellPx / 1.5, 0.0, 1.0);
  float glint = 0.5 + 0.5 * cos(PI * v * (2.0 + floor(hv * 5.0))) * sin(uTime * (0.35 + hv * 0.8) + hv * 40.0);
  float veil = pow(1.0 - fr, 3.0) * edge * (0.035 + 0.16 * hv * hv + 0.55 * Lb * hv) * (0.3 + 0.7 * glint);

  float kl = floor(qs + 0.5);
  float hl = hash(kl + seed * 31.0);
  float el = (qs - kl) * bandToU / SILK * inv;
  float wl = px * 0.65;
  float gl2 = 0.5 + 0.5 * cos(PI * v * (2.0 + floor(hl * 5.0))) * sin(uTime * (0.35 + hl * 0.8) + hl * 40.0);
  float line = wl * wl / (el * el + wl * wl) * (0.05 + 0.45 * hl * hl + 0.9 * Lb * hl) * (0.3 + 0.7 * gl2);

  float envIn = 1.0 - smoothstep(0.72, 1.0, s);
  // Outside the X the ribbons hug the centre and die out along their length,
  // so they never read as straight columns across the other family.
  float envOut = exp(-s * 6.5) * (1.0 - smoothstep(0.55, 0.9, s)) * (1.0 - smoothstep(0.04, 0.5, v));
  float env = mix(envOut, envIn, inner);
  open = mix(1.0, envIn, inner);

  float haze = exp(-s * 3.5) * (0.07 + 0.55 * uBass);

  float I = (str + veil + line + body * inner * smoothstep(0.0, 0.22, s)) * env + haze * open;
  vec3 tint = mix(vec3(1.0, 0.17, 0.02), vec3(1.0, 0.42, 0.09), clamp(s, 0.0, 1.0));
  return tint * I;
}

void main() {
  vec2 q = (gl_FragCoord.xy - 0.5 * uRes) / (0.5 * uRes.y);
  q *= 1.0 - 0.02 * uBeat + 0.012 * sin(uTime * 0.23);
  vec2 p = abs(q);

  float openV, openH;
  vec3 cv = family(p, uFocus.y, 0.0, openV);
  vec3 ch = family(p.yx, uFocus.x, 3.7, openH);
  vec3 col = cv * openH + ch * openV;

  // Core: a lens of light driven by the low end, plus a thin anamorphic streak.
  float r2 = dot(q * vec2(0.55, 1.0), q * vec2(0.55, 1.0));
  float core = exp(-r2 / 0.012) * (0.12 + 1.9 * uBass + 1.4 * uBeat);
  core += exp(-abs(q.y) / 0.012) * exp(-q.x * q.x / 0.35) * (0.10 + 0.5 * uBass + 0.5 * uBeat);
  col += vec3(1.0, 0.34, 0.07) * core * openV * openH;

  // Dust: a few slow motes that catch the light with the highs.
  vec2 dq = q * 7.0 + vec2(uTime * 0.02, uTime * 0.035);
  vec2 dc = floor(dq);
  float dh = hash(dc.x * 37.0 + dc.y * 113.0);
  vec2 dp = dq - dc - 0.2 - 0.6 * vec2(dh, fract(dh * 57.3));
  float mote = exp(-dot(dp, dp) * 2600.0) * step(0.55, dh);
  mote *= 0.5 + 0.5 * sin(uTime * (0.6 + dh * 2.0) + dh * 60.0);
  col += vec3(1.0, 0.55, 0.20) * mote * (0.5 + 2.0 * uEnergy) * openV * openH;

  // Faint warm air around the centre.
  col += vec3(1.0, 0.16, 0.02) * exp(-dot(q, q) * 0.9) * (0.03 + 0.10 * uEnergy) * openV * openH;

  vec3 lit = 1.0 - exp(-col * uGain);

  // Fade into the page background (#0a0a0a) at the edges and at the bottom.
  float vig = 1.0 - 0.55 * smoothstep(0.6, 2.2, length(q * vec2(0.62, 1.0)));
  vig *= smoothstep(-1.02, -0.45, q.y);

  float dither = (hash(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) - 0.5) / 255.0;
  gl_FragColor = vec4(vec3(0.039) + lit * vig + dither, 1.0);
}
`;
