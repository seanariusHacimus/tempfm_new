import { BANDS, HISTORY, SHAPES, VERTEX_SHADER, fragmentShader } from "./shader";

/**
 * Framework-free renderer for the ribbon equalizer.
 * Owns the WebGL program, the band analysis and the scrolling history texture.
 */

/** idle — calm breathing; demo — built-in synthetic beat; live — real stream audio. */
export type SignalMode = "idle" | "demo" | "live";

export interface EqualizerOptions {
    /** Upper bound for devicePixelRatio (default 2). */
    maxPixelRatio?: number;
    /** Calm rendering without ribbon vibration (prefers-reduced-motion). */
    reducedMotion?: boolean;
}

export interface EqualizerHandle {
    setMode(mode: SignalMode): void;
    /** Switch form: an index into SHAPES. */
    setShape(shape: number): void;
    /** How much the figure itself floats and changes shape with the music: 0 = still, 1 = default. */
    setFloat(amount: number): void;
    /** What the music is doing to the figure right now; the 3D logo moves with it. */
    getMotion(): { swell: number; sway: number; beat: number };
    /** The site's shared analyser; a private high-resolution tap is attached to it. */
    setAnalyser(analyser: AnalyserNode | null): void;
    resize(): void;
    start(): void;
    stop(): void;
    /** Advance and draw a single frame by hand (stills, tests). */
    step(dt: number): void;
    destroy(): void;
}

const STEP = 1 / 60; // analysis rate, independent of display refresh rate
const F_LO = 45;
const F_HI = 13000;
const MAX_PIXELS = 2.2e6;
const SILENCE_STEPS = 90; // 1.5 s of all-zero FFT data => stream is not analysable
const UNIFORMS = [
    "uRes", "uTime", "uFlow", "uSpec", "uFrac", "uEnergy", "uBass", "uMid", "uBeat",
    "uSwell", "uSway", "uRipple", "uGroup", "uWave", "uGlow", "uPx",
];

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);

/** Band edges in Hz, log-spaced. */
const EDGES = Array.from({ length: BANDS + 1 }, (_, i) => F_LO * Math.pow(F_HI / F_LO, i / BANDS));

function idleSignal(out: Float32Array, t: number) {
    for (let i = 0; i < BANDS; i++) {
        const x = 0.14 + 0.07 * Math.sin(t * 0.55 + i * 0.7) + 0.05 * Math.sin(t * 0.21 * (1 + i * 0.35) + i);
        out[i] = clamp01(x * (1 - i * 0.02));
    }
}

/** A looping four-on-the-floor pattern, good enough to show how the ribbons move. */
function demoSignal(out: Float32Array, t: number) {
    const beat = 60 / 122;
    const pos = t / beat;
    const inBeat = pos % 1;
    const beatNo = Math.floor(pos) % 4;
    const sixteenth = Math.floor(pos * 4);
    const in16 = (pos * 4) % 1;
    const in8 = (pos * 2) % 1;

    const kick = Math.exp(-inBeat * 7);
    const snare = beatNo % 2 === 1 ? Math.exp(-inBeat * 9) : 0;
    const hat = Math.exp(-((inBeat + 0.5) % 1) * 12);
    const bassStep = [1, 0, 0.6, 0, 0.9, 0, 0.5, 0.7][sixteenth % 8];
    const bassline = bassStep * Math.exp(-in16 * 3.5);
    const note = Math.floor(pos * 2);
    const pseudoRandom = Math.abs(Math.sin(note * 12.9898) * 43758.5453) % 1;
    const melodyBand = 6 + Math.floor(pseudoRandom * 5);
    const melody = Math.exp(-in8 * 2.6);
    const bar = Math.floor(pos / 16) % 2; // every other 16 beats the highs open up

    for (let i = 0; i < BANDS; i++) {
        let x = 0.06;
        if (i <= 2) x += kick * (1 - i * 0.12);
        if (i >= 1 && i <= 4) x += bassline * 0.55;
        if (i >= 5 && i <= 11) x += snare * 0.6 * (1 - Math.abs(i - 8) * 0.1);
        x += melody * 0.75 * Math.exp(-Math.pow(i - melodyBand, 2) / 1.6);
        if (i >= 11) x += hat * (0.45 + 0.25 * bar);
        x += 0.05 * Math.sin(t * 3.1 + i * 1.9);
        out[i] = clamp01(x);
    }
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("[Equalizer] shader error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

export function createEqualizer(
    canvas: HTMLCanvasElement,
    options: EqualizerOptions = {}
): EqualizerHandle | null {
    const maxPixelRatio = options.maxPixelRatio ?? 2;
    const reducedMotion = options.reducedMotion ?? false;

    const gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "high-performance",
    });
    if (!gl) return null;

    // ── GL resources ──
    // One program per form, compiled the first time that form is shown.
    interface Pipeline {
        program: WebGLProgram;
        uniforms: Record<string, WebGLUniformLocation | null>;
    }
    const pipelines = new Map<number, Pipeline>();
    let pipeline: Pipeline | null = null;
    let shape = 0;
    let texture: WebGLTexture | null = null;
    let buffer: WebGLBuffer | null = null;

    function usePipeline(index: number): boolean {
        let next = pipelines.get(index);
        if (!next) {
            const vs = compile(gl!, gl!.VERTEX_SHADER, VERTEX_SHADER);
            const fs = compile(gl!, gl!.FRAGMENT_SHADER, fragmentShader(index));
            if (!vs || !fs) return false;

            const program = gl!.createProgram();
            if (!program) return false;
            gl!.attachShader(program, vs);
            gl!.attachShader(program, fs);
            gl!.bindAttribLocation(program, 0, "aPos"); // same slot in every program
            gl!.linkProgram(program);
            gl!.deleteShader(vs);
            gl!.deleteShader(fs);
            if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
                console.error("[Equalizer] link error:", gl!.getProgramInfoLog(program));
                return false;
            }
            const uniforms: Pipeline["uniforms"] = {};
            for (const name of UNIFORMS) uniforms[name] = gl!.getUniformLocation(program, name);
            next = { program, uniforms };
            pipelines.set(index, next);
        }
        pipeline = next;
        gl!.useProgram(next.program);
        gl!.uniform1i(next.uniforms.uSpec, 0);
        return true;
    }

    function initGL(): boolean {
        pipelines.clear();
        pipeline = null;

        // One oversized triangle covers the viewport.
        buffer = gl!.createBuffer();
        gl!.bindBuffer(gl!.ARRAY_BUFFER, buffer);
        gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl!.STATIC_DRAW);
        gl!.enableVertexAttribArray(0);
        gl!.vertexAttribPointer(0, 2, gl!.FLOAT, false, 0, 0);

        texture = gl!.createTexture();
        gl!.activeTexture(gl!.TEXTURE0);
        gl!.bindTexture(gl!.TEXTURE_2D, texture);
        gl!.pixelStorei(gl!.UNPACK_ALIGNMENT, 1);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
        gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
        gl!.texImage2D(
            gl!.TEXTURE_2D, 0, gl!.LUMINANCE, BANDS, HISTORY, 0,
            gl!.LUMINANCE, gl!.UNSIGNED_BYTE, history
        );

        return usePipeline(shape);
    }

    // ── Signal state ──
    const history = new Uint8Array(BANDS * HISTORY); // row 0 = newest
    const target = new Float32Array(BANDS);
    const levels = new Float32Array(BANDS);
    const sustain = new Float32Array(BANDS); // slow per-band average of the live signal
    let mode: SignalMode = "idle";
    let source: AnalyserNode | null = null;
    let tap: AnalyserNode | null = null;
    let bytes: Uint8Array<ArrayBuffer> = new Uint8Array(0);
    let silentSteps = 0;
    let agc = 0.6;
    let energy = 0;
    let bass = 0;
    let beat = 0;
    let bassAvg = 0;
    let prevBass = 0;
    let sinceBeat = 1;
    // Floating: the figure is a weight on springs that the music pushes around.
    let floatAmount = 1;
    let mid = 0;
    let swell = 0;
    let swellSpeed = 0;
    let sway = 0;
    let swaySpeed = 0;
    let swaySide = 1;
    let ripple = 0;
    // Four parts of the spectrum, each on its own spring; they reshape the figure.
    const GROUPS = [0, 3, 7, 11, BANDS];
    const group = new Float32Array(4);
    const groupSpeed = new Float32Array(4);

    function detachTap() {
        if (source && tap && tap !== source) {
            try {
                source.disconnect(tap);
            } catch {
                /* already disconnected */
            }
        }
        tap = null;
    }

    function attachTap(node: AnalyserNode) {
        // A private analyser with finer bass resolution; the shared one keeps its settings.
        try {
            const own = node.context.createAnalyser();
            own.fftSize = 2048;
            own.smoothingTimeConstant = 0.5;
            own.minDecibels = -85;
            own.maxDecibels = -18;
            node.connect(own);
            tap = own;
        } catch {
            tap = node;
        }
        bytes = new Uint8Array(tap.frequencyBinCount);
    }

    /** Fills `target` from the stream. Returns false when the FFT is all zeros. */
    function readLive(): boolean {
        if (!tap) return false;
        tap.getByteFrequencyData(bytes);
        const binHz = tap.context.sampleRate / tap.fftSize;
        let total = 0;
        let top = 0;
        for (let i = 0; i < BANDS; i++) {
            const a = Math.min(Math.floor(EDGES[i] / binHz), bytes.length - 1);
            const b = Math.min(Math.max(a + 1, Math.ceil(EDGES[i + 1] / binHz)), bytes.length);
            let sum = 0;
            let peak = 0;
            for (let j = a; j < b; j++) {
                sum += bytes[j];
                if (bytes[j] > peak) peak = bytes[j];
            }
            total += sum;
            let x = (0.5 * (sum / (b - a)) + 0.5 * peak) / 255;
            x *= 1 + 0.035 * i; // lift the highs: music energy falls with frequency
            x = clamp01((x - 0.18) / 0.82);
            x = Math.pow(x, 1.4);
            target[i] = x;
            if (x > top) top = x;
        }
        // Slow automatic gain so quiet and loud tracks fill the same range.
        agc = Math.max(agc * 0.9995, top);
        const norm = 1 / Math.max(agc, 0.45);
        for (let i = 0; i < BANDS; i++) {
            // Dense, heavily compressed music keeps every band high all the time.
            // Weigh each band against its own recent average so hits still stand out.
            const x = clamp01(target[i] * norm);
            sustain[i] += (x - sustain[i]) * 0.02;
            target[i] = clamp01(0.5 * x + 1.7 * Math.max(0, x - sustain[i]));
        }
        return total > 0;
    }

    let signalTime = 0;

    function stepSignal() {
        signalTime += STEP;

        if (mode === "live" && tap) {
            if (readLive()) {
                silentSteps = 0;
            } else {
                // Buffering, or the stream cannot be analysed (cross-origin audio
                // on some browsers): stay calm briefly, then dance on our own.
                silentSteps++;
                if (silentSteps > SILENCE_STEPS) demoSignal(target, signalTime);
                else idleSignal(target, signalTime);
            }
        } else if (mode === "idle") {
            idleSignal(target, signalTime);
        } else {
            // Demo mode, or live without Web Audio support: dance on our own.
            demoSignal(target, signalTime);
        }

        let sum = 0;
        let left = target[0];
        for (let i = 0; i < BANDS; i++) {
            // A touch of blur across neighbouring bands keeps the light continuous.
            const right = target[Math.min(i + 1, BANDS - 1)];
            const x = 0.2 * left + 0.6 * target[i] + 0.2 * right;
            left = target[i];
            const cur = levels[i];
            levels[i] = cur + (x - cur) * (x > cur ? 0.26 : 0.09); // quick attack, slow release
            sum += levels[i];
        }
        energy += (sum / BANDS - energy) * 0.1;
        bass += ((levels[0] + levels[1] + levels[2]) / 3 - bass) * 0.35;

        // Kick detection on the unsmoothed low end.
        const b = (target[0] + target[1] + target[2]) / 3;
        bassAvg += (b - bassAvg) * 0.03;
        sinceBeat += STEP;
        if (b - prevBass > 0.1 && b > bassAvg * 1.15 + 0.05 && sinceBeat > 0.2) {
            beat = 1;
            sinceBeat = 0;
        }
        const kicked = sinceBeat === 0;
        prevBass = b;
        beat *= 0.92;

        // Swell: a soft spring chasing the bass, with a little overshoot.
        mid += ((levels[5] + levels[6] + levels[7] + levels[8] + levels[9] + levels[10]) / 6 - mid) * 0.05;
        swellSpeed += (42 * (bass + 0.6 * beat - swell) - 6.5 * swellSpeed) * STEP;
        swell += swellSpeed * STEP;
        // Sway: every kick nudges a slow pendulum the other way, like a boat on a swell.
        if (kicked) {
            swaySpeed += swaySide * (0.5 + 0.9 * b);
            swaySide = -swaySide;
        }
        swaySpeed += (-9 * sway - 2.2 * swaySpeed) * STEP;
        sway += swaySpeed * STEP;
        ripple += (0.014 + 0.05 * energy - ripple) * 0.03;

        // Shape: each part of the spectrum drives a spring, so the outline is
        // pushed out by a hit and wobbles back like jelly.
        for (let g = 0; g < 4; g++) {
            let total = 0;
            for (let i = GROUPS[g]; i < GROUPS[g + 1]; i++) total += levels[i];
            const level = total / (GROUPS[g + 1] - GROUPS[g]);
            groupSpeed[g] += (60 * (level - group[g]) - 6 * groupSpeed[g]) * STEP;
            group[g] += groupSpeed[g] * STEP;
        }

        history.copyWithin(BANDS, 0, BANDS * (HISTORY - 1));
        for (let i = 0; i < BANDS; i++) history[i] = Math.round(levels[i] * 255);
    }

    // ── Rendering ──
    let time = 0;
    let flow = 0;
    let glow = 0.42;
    let acc = 0;
    let scale = 1;
    let slowFrames = 0;
    let raf = 0;
    let running = false;
    let lost = false;
    let last = 0;

    function resize() {
        const cssW = canvas.clientWidth || window.innerWidth;
        const cssH = canvas.clientHeight || window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, maxPixelRatio) * scale;
        let w = Math.max(1, Math.round(cssW * dpr));
        let h = Math.max(1, Math.round(cssH * dpr));
        if (w * h > MAX_PIXELS) {
            const k = Math.sqrt(MAX_PIXELS / (w * h));
            w = Math.round(w * k);
            h = Math.round(h * k);
        }
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }
    }

    function advance(dt: number) {
        const pace = reducedMotion ? 0.25 : 1;
        time += dt * pace;
        flow += dt * pace * (0.35 + 1.3 * energy); // drift speeds up with the music
        // Paused: an ember glow that leaves the hero text readable. On air: full light.
        glow += ((mode === "idle" ? 0.42 : 1) - glow) * Math.min(1, dt * 2.5);
        acc += dt;
        let steps = 0;
        while (acc >= STEP && steps < 6) {
            stepSignal();
            acc -= STEP;
            steps++;
        }
        if (acc >= STEP) acc = 0; // long stall: do not try to catch up
        return steps > 0;
    }

    function draw(upload: boolean) {
        if (lost || !pipeline) return;
        const uniforms = pipeline.uniforms;
        const w = canvas.width;
        const h = canvas.height;
        gl!.viewport(0, 0, w, h);
        if (upload) {
            gl!.texSubImage2D(
                gl!.TEXTURE_2D, 0, 0, 0, BANDS, HISTORY,
                gl!.LUMINANCE, gl!.UNSIGNED_BYTE, history
            );
        }
        gl!.uniform2f(uniforms.uRes, w, h);
        gl!.uniform1f(uniforms.uTime, time);
        gl!.uniform1f(uniforms.uFlow, flow);
        gl!.uniform1f(uniforms.uFrac, acc / STEP);
        gl!.uniform1f(uniforms.uEnergy, energy);
        gl!.uniform1f(uniforms.uBass, bass);
        const drift = reducedMotion ? 0 : floatAmount;
        gl!.uniform1f(uniforms.uMid, mid);
        gl!.uniform1f(uniforms.uBeat, reducedMotion ? 0 : beat);
        gl!.uniform1f(uniforms.uSwell, Math.min(Math.max(swell, 0), 1.3) * drift);
        gl!.uniform1f(uniforms.uSway, 0.07 * sway * drift);
        gl!.uniform1f(uniforms.uRipple, ripple * drift);
        gl!.uniform4f(uniforms.uGroup, group[0] * drift, group[1] * drift, group[2] * drift, group[3] * drift);
        gl!.uniform1f(uniforms.uWave, reducedMotion ? 0 : 1);
        gl!.uniform1f(uniforms.uGlow, glow * (1 - 0.42 * energy)); // ease exposure when everything is loud
        // Lines are ~0.9 CSS px wide, but never thinner than one rendered pixel.
        const density = h / (canvas.clientHeight || h);
        gl!.uniform1f(uniforms.uPx, (2 / h) * Math.max(1, 0.9 * density));
        gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    function frame(now: number) {
        if (!running) return;
        raf = requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;

        // Shed resolution if the device cannot keep up.
        if (dt > 1 / 42) slowFrames++;
        else if (slowFrames > 0) slowFrames--;
        if (slowFrames > 45 && scale > 0.5) {
            scale *= 0.8;
            slowFrames = 0;
            resize();
        }

        draw(advance(dt));
    }

    function onLost(event: Event) {
        event.preventDefault();
        lost = true;
        cancelAnimationFrame(raf);
    }

    function onRestored() {
        lost = !initGL();
        if (running && !lost) {
            last = performance.now();
            raf = requestAnimationFrame(frame);
        }
    }

    canvas.addEventListener("webglcontextlost", onLost);
    canvas.addEventListener("webglcontextrestored", onRestored);

    if (!initGL()) {
        canvas.removeEventListener("webglcontextlost", onLost);
        canvas.removeEventListener("webglcontextrestored", onRestored);
        return null;
    }
    resize();

    return {
        setMode(next) {
            mode = next;
            silentSteps = 0;
        },
        setFloat(amount) {
            floatAmount = Math.min(Math.max(amount, 0), 2);
        },
        getMotion() {
            return { swell: Math.min(Math.max(swell, 0), 1.3), sway, beat };
        },
        setShape(next) {
            const index = Math.min(Math.max(Math.round(next) || 0, 0), SHAPES.length - 1);
            if (index === shape) return;
            const previous = shape;
            shape = index;
            if (!lost && !usePipeline(index)) {
                // Keep showing the previous form if this one fails to compile.
                shape = previous;
                usePipeline(previous);
            }
        },
        setAnalyser(node) {
            if (node === source) return;
            detachTap();
            source = node;
            if (node) attachTap(node);
        },
        resize,
        start() {
            if (running) return;
            running = true;
            last = performance.now();
            if (!lost) raf = requestAnimationFrame(frame);
        },
        stop() {
            running = false;
            cancelAnimationFrame(raf);
        },
        step(dt) {
            draw(advance(dt));
        },
        destroy() {
            running = false;
            cancelAnimationFrame(raf);
            canvas.removeEventListener("webglcontextlost", onLost);
            canvas.removeEventListener("webglcontextrestored", onRestored);
            detachTap();
            source = null;
            if (!lost) {
                gl.deleteTexture(texture);
                gl.deleteBuffer(buffer);
                pipelines.forEach((p) => gl.deleteProgram(p.program));
            }
            pipelines.clear();
            pipeline = null;
        },
    };
}
