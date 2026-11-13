/**
 * TempFM light equalizer — GLSL (WebGL1).
 *
 * Every form is built the same way: a scene function turns a pixel into one
 * or two families of "ribbons" (curves of constant x), and ribbons() fills
 * them with light. The light is layered like folded silk: broad sheets with a
 * razor edge and a long soft falloff, one sheet per frequency band, and fine
 * drifting filaments. A hot core in the middle lights the whole field.
 *
 * uSpec is a BANDS × HISTORY texture (row 0 = now). Each scene decides which
 * band lights a point and how long the sound takes to travel there.
 */

export const BANDS = 16;
export const HISTORY = 64;

/** Forms the background can take. The index is what the engine's setShape() expects. */
export const SHAPES = [
    { id: "cross", name: "Крест" },
    { id: "flower", name: "Цветок" },
    { id: "speaker", name: "Динамик" },
    { id: "vortex", name: "Вихрь" },
    { id: "wave", name: "Волна" },
    { id: "rays", name: "Лучи" },
] as const;

export const VERTEX_SHADER = /* glsl */ `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT_BODY = /* glsl */ `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;    // seconds
uniform float uFlow;    // drift phase; advances faster while the music is loud
uniform sampler2D uSpec;
uniform float uFrac;    // progress towards the next history row, 0..1
uniform float uEnergy;  // overall loudness, 0..1
uniform float uBass;    // low end, 0..1
uniform float uBeat;    // kick impulse, 0..1, decays
uniform float uMid;     // mids, slowly smoothed, 0..1
uniform float uSwell;   // springy bass envelope: the figure swells and settles
uniform float uSway;    // radians: a slight rock from side to side on the beat
uniform float uRipple;  // how strongly the figure ripples, as if lying on water
uniform vec4 uGroup;    // springy levels of four parts of the spectrum (bass … treble); they reshape the figure
uniform float uWave;    // ribbon vibration amount (0 = reduced motion)
uniform float uGlow;    // exposure: dim while paused, full on air
uniform float uCore;    // brightness of the core, 1 = default
uniform float uDust;    // 1 with motes of dust in the light, 0 without
uniform vec3 uRamp[6];  // colour scheme: six stops from the darkest tone to white-hot
uniform float uPx;      // line-width unit in scene units: ~0.9 CSS px, never under one rendered pixel

const float PI = 3.14159265;
const float N = ${BANDS}.0;
const float H = ${HISTORY}.0;
const float SPAN = 34.0;  // history rows a sound crosses on its way out

float hash(float n) {
  return fract(sin(n * 127.1) * 43758.5453);
}

float spec(float band, float lag) {
  return texture2D(uSpec, vec2((band + 0.5) / N, (lag * SPAN - uFrac + 0.5) / H)).r;
}

// Standing wave of one band's ribbon: long, slow swells. Whole numbers of
// half-waves keep mirrored halves seamless; high bands move less.
float standing(float i, float v, float ph) {
  float n = 1.0 + floor(i / 6.0);
  float wave = cos(n * PI * v) * cos(ph * (1.0 + 0.11 * i))
             + 0.5 * cos((n + 1.0) * PI * v) * cos(ph * 0.63 * (1.0 + 0.07 * i) + 1.3);
  return wave / (1.0 + 0.1 * i);
}

// One layer of translucent sheets folded along whole values of q. Each sheet
// has a razor-bright leading edge and a long soft falloff behind it.
//   pq      size of one pixel in q units
//   period  wrap for the per-sheet brightness (0 = none), for closed forms
//   lo      dimmest a sheet may be, 0..1
// Returns (soft body, bright edge).
vec2 sheets(float q, float pq, float key, float period, float lo) {
  float cell = floor(q);
  float fr = q - cell;
  float c0 = cell;
  float c1 = cell + 1.0;
  if (period > 0.5) {
    c0 = mod(c0, period);
    c1 = mod(c1, period);
  }
  float h0 = lo + (1.0 - lo) * hash(c0 + key);
  float h1 = lo + (1.0 - lo) * hash(c1 + key);
  float d1 = 1.0 - fr;

  float soft = h0 * pow(d1, 2.6) * smoothstep(0.0, 1.5 * pq, fr);
  float w = 0.8 * pq;
  float edge = h0 * w * w / (fr * fr + w * w) + h1 * w * w / (d1 * d1 + w * w);
  // A wider, fainter copy of every edge stands in for lens bloom.
  float wb = 7.0 * pq;
  edge += 0.11 * (h0 * wb * wb / (fr * fr + wb * wb) + h1 * wb * wb / (d1 * d1 + wb * wb));

  // Sheets thinner than about three pixels melt into their average.
  float fine = smoothstep(0.2, 0.55, pq);
  float mean = 0.5 * (lo + 1.0);
  return vec2(mix(soft, mean / 3.6, fine), mix(edge, mean * 0.3, fine));
}

// Light carried by one family of ribbons.
//   x     position across the family; one unit is one frequency band wide
//   band  which band lights this point (0 = bass … N-1 = treble)
//   lag   how far the sound has travelled to get here, 0..1
//   v     0..1 along the ribbon, for vibration and shimmer
//   gx    |grad x| in scene units
//   flow  extra drift of the band sheets, in bands (tunnels, rotation)
float ribbons(float x, float band, float lag, float v, float gx, float key, float period, float flow, out float level) {
  float b0 = clamp(floor(band), 0.0, N - 1.0);
  float b1 = min(b0 + 1.0, N - 1.0);
  float f = clamp(band - b0, 0.0, 1.0);
  float reach = mix(1.0, 0.45, lag);  // sound fades as it travels
  float L0 = spec(b0, lag) * reach;
  float L1 = spec(b1, lag) * reach;
  float L = mix(L0, L1, f);
  level = L;

  float ph = uTime * 2.2 + key;
  float ax = abs(x - uWave * 0.45 * mix(L0 * standing(b0, v, ph), L1 * standing(b1, v, ph), f));
  float pq = uPx * gx + 1e-5;

  vec2 broad = sheets(ax * 0.25 - uFlow * 0.05 - flow * 0.25 + key, pq * 0.25, key, period * 0.25, 0.25);
  vec2 bands = sheets(ax - flow, pq, key + 7.0, period, 0.55);
  vec2 silk = sheets(ax * 3.0 - uFlow * 0.35 - flow * 3.0 + key * 3.1, pq * 3.0, key + 13.0, period * 3.0, 0.0);

  float glint = 0.7 + 0.3 * cos(PI * v * 3.0) * sin(uTime * 0.6 + b0 * 0.9);
  float I = (broad.x * 1.5 + broad.y * 0.8) * (0.6 + 0.9 * L);
  I += (bands.x * 0.9 + bands.y * 1.2) * (0.08 + 1.9 * L * L);
  I += (silk.x * 0.3 + silk.y * 0.8) * (0.3 + 1.1 * L) * glint;
  I += 0.25 * L * sqrt(L);
  // The root of the family (x = 0) carries the bass and always glows.
  I += (0.3 + 0.6 * L) * exp(-ax * 1.4);
  return I;
}

#if SHAPE == 0
// ── Крест: hyperbolic ribbons — four lobes meeting in an X that runs to the corners ──

float scene(vec2 q, float aspect, out float open) {
  // The X aims at the corners and scissors open and shut with the mids.
  float k = clamp(aspect * 0.78, 0.6, 1.45) * (1.0 + 0.4 * (uMid - 0.2));
  vec2 p = abs(vec2(q.x / k, q.y));
  float u = p.x * p.x - p.y * p.y;
  float wing = step(0.0, u);                  // 1 in the left/right lobes, 0 above and below
  float d = sqrt(abs(u)) + 1e-4;              // how far from the centre this ribbon turns
  // The side lobes inflate with the bass, the upper and lower ones with the low mids.
  float R = mix(0.98 * (1.0 + 0.45 * (uGroup.y - 0.2)),
                0.98 * max(aspect / k, 0.7) * (1.0 + 0.45 * (uGroup.x - 0.2)), wing);
  float s = d / R;
  float x = min(s, 1.6) * (N - 1.0);
  float v = min(p.x, p.y) / max(max(p.x, p.y), 1e-4);
  float L;
  float I = ribbons(x, x, clamp(length(p) / 1.7, 0.0, 1.0), v,
                    length(vec2(p.x / k, p.y)) / d * (N - 1.0) / R, wing * 3.7, 0.0, 0.0, L);
  open = 1.0 - 0.75 * smoothstep(0.6, 1.1, s);
  return I * (1.0 - smoothstep(0.55, 1.1, s));
}

#elif SHAPE == 1
// ── Цветок: six petals around the core, slowly turning, ripples outside ──

float scene(vec2 q, float aspect, out float open) {
  const float PETALS = 6.0;
  float r = length(q) + 1e-4;
  float th = atan(q.y, q.x) + uFlow * 0.02;
  // Every petal follows its own band and stretches as far as that band is loud.
  float reachOut = 0.0;
  for (int i = 0; i < 6; i++) {
    float fi = float(i);
    reachOut += spec(1.0 + 2.6 * fi, 0.0) * pow(max(cos(th - fi * PI / 3.0), 0.0), 6.0);
  }
  float a = 0.9 * min(1.0, aspect * 1.25) * (0.86 + 0.5 * reachOut * uWave);
  float rn = pow(r / a, PETALS);
  float re = 1.0 - rn * cos(PETALS * th);
  float im = -rn * sin(PETALS * th);
  float m = sqrt(re * re + im * im) + 1e-6;
  float u = log(m);
  float v = abs(atan(im, re)) / PI;
  float grad = PETALS * rn / (r * m);

  float inner = step(u, 0.0);
  float far = PETALS * log(length(vec2(aspect, 1.0)) / a);  // u in the far corner
  float range = mix(far, 0.95, inner);
  float s = abs(u) / range;
  float x = min(s, 1.6) * (N - 1.0);
  float L;
  float I = ribbons((1.0 - 2.0 * inner) * x, x, mix(0.5 * s, v * v * (3.0 - 2.0 * v), inner), v,
                    grad * (N - 1.0) / range, 1.9, 0.0, 0.0, L);

  // Towards a petal's centre the ribbons would shrink into a hard dot;
  // let them melt into a soft ember instead.
  float heart = inner * smoothstep(0.4, 1.0, s);
  open = 1.0 - 0.45 * heart;
  return mix(I * mix(exp(-s * 1.3), 1.0, inner), 0.45, heart);
}

#elif SHAPE == 2
// ── Динамик: rings flying out of the core like a speaker cone ──

float scene(vec2 q, float aspect, out float open) {
  float k = clamp(aspect * 0.8, 0.75, 1.5);
  vec2 e = vec2(q.x / k, q.y);
  // The rim wobbles like jelly, and the bass pushes the inner rings outwards like a cone.
  float rho = length(e) * (1.0 + 0.07 * uMid * cos(2.0 * atan(e.y, e.x) - uFlow * 0.5)) + 1e-4;
  float span = log(length(vec2(aspect / k, 1.0)) / 0.045);
  float s = log(rho / 0.045) / span - 0.14 * uSwell * exp(-rho * 1.6);  // 0 at the core … 1 in the corners
  float x = s * (N - 1.0);
  float v = atan(abs(e.y), abs(e.x)) / (0.5 * PI);
  float grad = length(vec2(e.x / k, e.y)) / (rho * rho);
  float L;
  float I = ribbons(x, x, 0.35 * s, v, grad * (N - 1.0) / span, 5.3, 0.0, uFlow * 0.55, L);
  open = 1.0;
  return I * smoothstep(-0.05, 0.12, s);
}

#elif SHAPE == 3
// ── Вихрь: spiral arms turning around the core ──

float scene(vec2 q, float aspect, out float open) {
  const float TURN = 8.0;  // band cells per full turn: 2 broad arms, 8 band arms, 24 filaments
  float rho = length(q) + 1e-4;
  float th = atan(q.y, q.x);
  float span = log(length(vec2(aspect, 1.0)) / 0.045);
  float s = log(rho / 0.045) / span;
  // The bass winds the spiral tighter; it unwinds as the note fades.
  float radial = (N - 1.0) * 0.5 * (1.0 + 0.5 * (uSwell - 0.25));
  // +64 keeps x positive; it is a whole number of turns for every layer.
  float x = 64.0 + TURN * th / (2.0 * PI) + radial * s;
  float grad = sqrt(TURN * TURN / (4.0 * PI * PI) + radial * radial / (span * span)) / rho;
  float L;
  float I = ribbons(x, s * (N - 1.0), 0.4 * s, s, grad, 2.1, TURN, uFlow * 0.45, L);
  open = 1.0;
  return I * smoothstep(-0.05, 0.12, s);
}

#elif SHAPE == 4
// ── Волна: a horn of sound opening left and right from the core ──

float scene(vec2 q, float aspect, out float open) {
  float ax = abs(q.x) / aspect;  // 0 in the middle … 1 at the side edges
  // The horn's outline is the spectrum itself, bass in the middle and treble at
  // the edges, rolling outwards; the whole horn opens wider on the bass.
  float outline = 0.7 + 1.1 * uWave * spec(ax * (N - 1.0), 0.6 * ax);
  float horn = 0.9 * (1.0 + 0.3 * uSwell) * mix(1.0, outline, smoothstep(0.03, 0.3, ax))
             * (0.045 + 0.955 * pow(ax, 1.25));
  float y = q.y - 0.11 * (0.5 + 1.6 * uMid) * ax * sin(ax * 7.0 - uFlow * 0.9);
  float s = abs(y) / horn;
  float x = min(s, 1.6) * (N - 1.0);
  float L;
  float I = ribbons(x, x, 0.8 * ax, ax, (N - 1.0) / horn, 4.4, 0.0, 0.0, L);
  open = 1.0 - 0.6 * smoothstep(0.75, 1.15, s);
  return I * (1.0 - smoothstep(0.5, 1.05, s));
}

#else
// ── Лучи: a fan of rays, each as long as its band is loud ──

float scene(vec2 q, float aspect, out float open) {
  // The fan turns slowly; the bass curls the rays near the core like a pinwheel.
  float rot = uFlow * 0.012 + 0.7 * uSwell * exp(-length(q) * 1.3);
  vec2 p = abs(vec2(q.x * cos(rot) - q.y * sin(rot), q.x * sin(rot) + q.y * cos(rot)));
  float rho = length(p) + 1e-4;
  float far = length(vec2(aspect, 1.0));
  float x = atan(p.y, p.x) / (0.5 * PI) * (N - 1.0);
  float dist = clamp(rho / far, 0.0, 1.0);
  float L;
  float I = ribbons(x, x, dist, dist, (N - 1.0) / (0.5 * PI * rho), 6.6, 0.0, 0.0, L);
  float reach = far * (0.3 + 1.1 * L);
  open = 1.0;
  return I * (0.25 + 0.75 * (1.0 - smoothstep(0.35 * reach, reach, rho)));
}
#endif

// Intensity to colour through the palette. With the default one: ember,
// TempFM red-orange, amber, white-hot.
vec3 ramp(float t) {
  vec3 c = mix(uRamp[0], uRamp[1], smoothstep(0.0, 0.24, t));
  c = mix(c, uRamp[2], smoothstep(0.24, 0.50, t));
  c = mix(c, uRamp[3], smoothstep(0.50, 0.70, t));
  c = mix(c, uRamp[4], smoothstep(0.70, 0.87, t));
  return mix(c, uRamp[5], smoothstep(0.87, 1.0, t));
}

void main() {
  float aspect = uRes.x / uRes.y;
  vec2 screen = (gl_FragCoord.xy - 0.5 * uRes) / (0.5 * uRes.y);

  // The figure floats and changes shape with the music.
  float tilt = uSway + 0.02 * uWave * sin(uTime * 0.31);
  vec2 q = vec2(screen.x * cos(tilt) - screen.y * sin(tilt), screen.x * sin(tilt) + screen.y * cos(tilt));
  q *= 1.0 - 0.1 * uSwell + 0.012 * sin(uTime * 0.23);
  q += uWave * vec2(0.015 * sin(uTime * 0.37), 0.02 * sin(uTime * 0.29 + 1.0));

  // Curl: the low mids bend the figure one way near the core and the other
  // way further out, and the bend travels outwards.
  float curl = 0.55 * (uGroup.y - 0.12) * sin(length(q) * 2.4 - uFlow * 0.5);
  q = vec2(q.x * cos(curl) - q.y * sin(curl), q.x * sin(curl) + q.y * cos(curl));

  // Morph: the outline is pulled out and pushed in around the circle. Two
  // bulges for the bass, three for the low mids, four for the mids, five for
  // the treble; each set slowly turns at its own pace.
  float around = atan(q.y, q.x);
  float pull = 0.26 * uGroup.x * cos(2.0 * around + uFlow * 0.21)
             + 0.18 * uGroup.y * cos(3.0 * around - uFlow * 0.33 + 1.0)
             + 0.13 * uGroup.z * cos(4.0 * around + uFlow * 0.27 + 2.0)
             + 0.09 * uGroup.w * cos(5.0 * around - uFlow * 0.41 + 0.5);
  q /= 1.0 + clamp(pull, -0.45, 0.6);

  // Ripple, as if the figure were lying on water.
  q += uRipple * vec2(sin(q.y * 2.3 + uFlow * 0.7) + 0.5 * sin(q.y * 4.3 - uFlow * 0.45 + 1.7),
                      sin(q.x * 1.9 - uFlow * 0.6 + 0.8) + 0.5 * sin(q.x * 3.7 + uFlow * 0.5 + 2.9));

  float open;
  float I = scene(q, aspect, open);

  // The core lights everything: ribbons near it burn, far ones still glow.
  float r2 = dot(q * vec2(0.75, 1.0), q * vec2(0.75, 1.0));
  I *= 0.55 + 0.45 / (1.0 + 1.5 * r2) + 0.9 * exp(-r2 / 0.25);
  I += 0.3 * open;

  // On a narrow (portrait) screen the core shrinks so it does not flood the width.
  float narrow = clamp(aspect * 1.2, 0.6, 1.0);
  float rc2 = dot(q * vec2(0.7, 1.0), q * vec2(0.7, 1.0)) / (narrow * narrow);
  float drive = uCore * (0.45 + 0.9 * uBass + 0.9 * uBeat);
  float core = drive * (1.5 / (1.0 + rc2 / 0.009) + 0.4 / (1.0 + rc2 / 0.09));
  // Anamorphic streak and a faint starburst around the core.
  core += drive * 0.2 * exp(-abs(q.y) / 0.02) / (1.0 + 9.0 * q.x * q.x);
  float th = atan(q.y, q.x);
  float burst = pow(0.5 + 0.5 * sin(th * 23.0 + 2.5 * sin(th * 7.0) + uTime * 0.15), 3.0);
  core += drive * 0.1 * burst * exp(-sqrt(rc2) / 0.3);
  I += core;

  // Dust: a few slow motes that catch the light.
  vec2 dq = q * 7.0 + vec2(uTime * 0.02, uTime * 0.035);
  vec2 dc = floor(dq);
  float dh = hash(dc.x * 37.0 + dc.y * 113.0);
  vec2 dp = dq - dc - 0.2 - 0.6 * vec2(dh, fract(dh * 57.3));
  float mote = exp(-dot(dp, dp) * 2600.0) * step(0.55, dh);
  I += uDust * mote * (0.5 + 0.5 * sin(uTime * (0.6 + dh * 2.0) + dh * 60.0)) * (0.6 + 1.5 * uEnergy);

  vec3 col = ramp(1.0 - exp(-I * uGlow));

  // Settle into the page background (#0a0a0a) at the very bottom.
  float vig = 1.0 - 0.22 * smoothstep(0.8, 2.3, length(screen * vec2(0.62, 1.0)));
  vig *= smoothstep(-1.02, -0.62, screen.y);
  col = mix(vec3(0.039), col, vig);

  float dither = (hash(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) - 0.5) / 255.0;
  gl_FragColor = vec4(col + dither, 1.0);
}
`;

/** Fragment shader source for one form (an index into SHAPES). */
export function fragmentShader(shape: number): string {
    return `#define SHAPE ${shape}\n${FRAGMENT_BODY}`;
}
