import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

/**
 * The TempFM logo as a 3D object in the middle of the equalizer.
 *
 * It comes in several looks (LOGO_STYLES). All of them are built around the
 * wordmark's own outlines, but each is a composition of its own — liquid
 * chrome, a winged emblem, orbiting rings, a neon sign, glowing iron, a deep
 * retro block — with its own small motion, nudged by the music.
 * Framework-free; draws on its own transparent canvas.
 */

export { LOGO_STYLES } from "./logoStyles";

/** Outlines from public/logo.svg (1389 × 254 units). */
const W = 1389;
const H = 254;
const LOGO_PATHS = [
    "M672.417 39.8751V253.215H618.01V105.016C599.569 141.048 577.014 192.777 557.594 253.215H481.415C480.413 223.562 478.976 186.071 477.06 140.917C472.227 150.388 466.958 161.491 461.407 174.293C449.868 200.876 440.027 228.265 432.842 253.193H376.432C385.533 217.814 399.924 177.559 417.341 139.502C455.768 55.5507 478.018 44.9044 496.394 45.9276C503.687 46.3413 527.592 50.565 529.247 88.2298C530.444 115.227 531.489 140.09 532.447 162.776C540.242 143.16 548.45 124.044 556.962 105.843C570.09 77.7577 583.023 53.8089 594.344 36.6094C607.559 16.5142 622.712 -1.73041 643.766 0.751548C648.534 1.31761 672.439 5.86787 672.439 39.8751H672.417Z",
    "M0 127.005H59.7413V253.476H115.411V127.005H175.153V71.3564H0V127.005Z",
    "M241.513 134.385H363.021V190.447H241.513V197.806H363.021V253.258L188.826 253.476V71.3564H363.021V127.005H241.513V134.385Z",
    "M815.585 71.3564H714.108V71.4653H686.11V253.476H741.78V189.359H815.585C848.134 189.359 874.586 162.884 874.586 130.357C874.586 97.8307 848.112 71.3564 815.585 71.3564ZM822.008 134.037H741.301V126.678H822.008C824.033 126.678 825.687 128.333 825.687 130.357C825.687 132.382 824.033 134.037 822.008 134.037Z",
    "M1342.67 71.4119H1388.13L1387.87 253.234H1362.67V84.9186L1274.1 253.234H1238.25L1149.68 84.9186V253.234H1124.49V71.4119H1169.94L1256.7 239.467L1342.67 71.4119Z",
    "M926.633 253.234V71.4119H1087.67V92.711H952.607V154.271H1062.48V175.05H952.607V253.234H926.633Z",
];

const FOV = 26;
const HALO = "drop-shadow(0 0 2px rgba(0, 0, 0, 0.5)) drop-shadow(0 10px 28px rgba(0, 0, 0, 0.6))";

/** What the music is doing right now; see EqualizerHandle.getMotion(). */
export interface LogoMotion {
    /** Springy bass envelope, about 0..1. */
    swell: number;
    /** Slow side-to-side pendulum, about -1..1. */
    sway: number;
    /** Kick impulse, 0..1. */
    beat: number;
}

export interface Logo3DOptions {
    /** Which look to start with: an index into LOGO_STYLES (default 0). */
    style?: number;
    motion?: () => LogoMotion;
    /** Hold a fixed three-quarter pose instead of moving. */
    reducedMotion?: boolean;
}

export interface Logo3DHandle {
    /** Switch look: an index into LOGO_STYLES. */
    setStyle(style: number): void;
    /** CSS filter the canvas should wear for the current look (halo or glow). */
    filter(): string;
    resize(): void;
    start(): void;
    stop(): void;
    destroy(): void;
}

/** One look: what is in the scene and how it moves. */
interface Look {
    root: THREE.Object3D;
    /** How many logo widths the camera must take in. */
    fit: number;
    filter: string;
    environment?: THREE.WebGLRenderTarget;
    update(pivot: THREE.Object3D, time: number, m: LogoMotion): void;
    dispose(): void;
}

// ── Shared building blocks ──

function logoShapes(): THREE.Shape[] {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">${LOGO_PATHS.map(
        (d) => `<path d="${d}"/>`
    ).join("")}</svg>`;
    return new SVGLoader().parse(svg).paths.flatMap((path) => SVGLoader.createShapes(path));
}

interface Solid {
    object: THREE.Group;
    geometries: THREE.BufferGeometry[];
}

/** Average width of a letter's strokes: twice its area over its outline length. */
function strokeWidth(shape: THREE.Shape): number {
    const { shape: outline, holes } = shape.extractPoints(8);
    let area = Math.abs(THREE.ShapeUtils.area(outline));
    let length = shape.getLength();
    holes.forEach((hole, i) => {
        area -= Math.abs(THREE.ShapeUtils.area(hole));
        length += shape.holes[i].getLength();
    });
    return (2 * area) / length;
}

/**
 * A gently rippled surface as a tiling normal map. Flat metal reflects one
 * flat tone; with this the reflections flow across each face like liquid.
 */
function ripples(): THREE.CanvasTexture {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const image = ctx.createImageData(size, size);
    const TAU = Math.PI * 2;
    // Whole numbers of waves across the tile keep it seamless.
    const height = (x: number, y: number) =>
        Math.sin(TAU * (x + 0.35 * Math.sin(TAU * y))) +
        0.6 * Math.sin(TAU * (2 * y - x) + 1.3) +
        0.35 * Math.sin(TAU * (3 * x + 2 * y) + 2.1);
    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            const x = i / size;
            const y = j / size;
            const e = 1 / size;
            const dx = (height(x + e, y) - height(x - e, y)) / (2 * e);
            const dy = (height(x, y + e) - height(x, y - e)) / (2 * e);
            const n = new THREE.Vector3(-dx * 0.05, -dy * 0.05, 1).normalize();
            image.data.set([(n.x * 0.5 + 0.5) * 255, (n.y * 0.5 + 0.5) * 255, (n.z * 0.5 + 0.5) * 255, 255], (j * size + i) * 4);
        }
    }
    ctx.putImageData(image, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    // Extruded geometry's UVs are in logo units: one tile spans most of the wordmark's height.
    texture.repeat.set(1 / 620, 1 / 620);
    return texture;
}

/** Polished metal with liquid reflections. */
function liquidMetal(color: number, roughness: number, flow: THREE.Texture): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
        color,
        metalness: 1,
        roughness,
        normalMap: flow,
        normalScale: new THREE.Vector2(0.55, 0.55),
    });
}

/** The wordmark as a solid, centred on the origin and facing the viewer. */
function wordmark(
    shapes: THREE.Shape[],
    material: THREE.Material | THREE.Material[],
    depth: number,
    bevel?: { thickness: number; size: number; inset: number }
): Solid {
    const object = new THREE.Group();
    // SVG's y axis points down: flip it and centre the mark.
    object.scale.set(1, -1, 1);
    object.position.set(-W / 2, H / 2, -depth / 2);
    const geometries = shapes.map((shape) => {
        // Thin letters (the "FM") get a proportionally slimmer bevel, or it would eat them.
        const slim = Math.min(1, strokeWidth(shape) / 48);
        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth,
            curveSegments: 10,
            bevelEnabled: !!bevel,
            bevelThickness: (bevel?.thickness ?? 0) * slim,
            bevelSize: (bevel?.size ?? 0) * slim,
            // Pull the outline in first, so a fat round bevel keeps the letters' true width.
            bevelOffset: bevel ? -bevel.inset * slim : 0,
            bevelSegments: 8,
        });
        object.add(new THREE.Mesh(geometry, material));
        return geometry;
    });
    return { object, geometries };
}

/**
 * What polished metal reflects: a studio painted as an equirectangular image.
 * "silver" is cool white light over a dark floor with a warm glow from below;
 * "furnace" is mostly dark with fire all around.
 */
function studio(renderer: THREE.WebGLRenderer, mood: "silver" | "furnace"): THREE.WebGLRenderTarget {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    const stops: Array<[number, string]> =
        mood === "silver"
            ? [[0, "#ffffff"], [0.3, "#f1ece8"], [0.52, "#bdb6b0"], [0.6, "#2a2320"], [0.7, "#120d0b"], [0.86, "#a8330a"], [1, "#ff6a1f"]]
            : [[0, "#2a0d05"], [0.3, "#0c0504"], [0.5, "#1a0906"], [0.62, "#ff5a14"], [0.72, "#3a0c04"], [1, "#0a0403"]];
    const sky = ctx.createLinearGradient(0, 0, 0, 256);
    for (const [at, color] of stops) sky.addColorStop(at, color);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 512, 256);

    // Upright bands of light and shade around the side that faces the viewer
    // (u = 0.75): as the logo turns, they sweep across its face.
    const light = mood === "silver" ? "rgba(255, 255, 255, 1)" : "rgba(255, 190, 120, 0.9)";
    const shade = mood === "silver" ? "rgba(48, 40, 36, 0.72)" : "rgba(0, 0, 0, 0.7)";
    const bands: Array<[number, number, string]> = [
        [384, 40, light], [326, 30, shade], [442, 30, shade], [274, 30, light], [494, 30, light],
    ];
    for (const [x, half, color] of bands) {
        const band = ctx.createLinearGradient(x - half, 0, x + half, 0);
        band.addColorStop(0, "rgba(0, 0, 0, 0)");
        band.addColorStop(0.5, color);
        band.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = band;
        ctx.fillRect(x - half, 0, half * 2, 150);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.mapping = THREE.EquirectangularReflectionMapping;
    texture.colorSpace = THREE.SRGBColorSpace;
    const pmrem = new THREE.PMREMGenerator(renderer);
    const target = pmrem.fromEquirectangular(texture);
    texture.dispose();
    pmrem.dispose();
    return target;
}

/** The basic stance: a slow turn from side to side, a nod, a bob; the music leans it and makes it swell. */
function float(pivot: THREE.Object3D, time: number, m: LogoMotion, yaw: number, pitch: number) {
    pivot.rotation.y = yaw * Math.sin(time * 0.55) + 0.35 * m.sway;
    pivot.rotation.x = -0.05 + pitch * Math.sin(time * 0.41 + 1.0);
    pivot.rotation.z = 0.02 * Math.sin(time * 0.33 + 2.0);
    pivot.position.y = 9 * Math.sin(time * 0.8);
    pivot.scale.setScalar(1 + 0.06 * m.swell + 0.035 * m.beat);
}

const ROUND = { thickness: 13, size: 9, inset: 7 }; // fat, soft edges: liquid metal

// ── Looks ──

/** Хром: the wordmark poured from liquid chrome. */
function chromeLook(renderer: THREE.WebGLRenderer, shapes: THREE.Shape[]): Look {
    const environment = studio(renderer, "silver");
    const flow = ripples();
    const material = liquidMetal(0xffffff, 0.08, flow);
    const solid = wordmark(shapes, material, 56, ROUND);
    return {
        root: solid.object,
        fit: 1.22,
        filter: HALO,
        environment,
        update(pivot, time, m) {
            float(pivot, time, m, 0.34, 0.12);
            // The ripples creep across the metal, so the reflections never sit still.
            flow.offset.set(time * 0.012, time * 0.007);
        },
        dispose() {
            solid.geometries.forEach((g) => g.dispose());
            material.dispose();
            flow.dispose();
        },
    };
}

/** Крылья: a chrome emblem — the wordmark on a fan of curved blades that flex with the bass. */
function wingsLook(renderer: THREE.WebGLRenderer, shapes: THREE.Shape[]): Look {
    const environment = studio(renderer, "silver");
    const flow = ripples();
    const chrome = liquidMetal(0xffffff, 0.08, flow);
    const steel = liquidMetal(0xaeb3bb, 0.14, flow);
    const root = new THREE.Group();
    const solid = wordmark(shapes, chrome, 48, ROUND);
    root.add(solid.object);

    // A blade: wide at the root, sweeping to a point that curls up or down.
    const blade = (length: number, width: number, curl: number) => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -width / 2);
        shape.quadraticCurveTo(length * 0.55, -width * 0.45 + curl * 0.2, length, curl);
        shape.quadraticCurveTo(length * 0.42, width * 0.8 + curl * 0.55, 0, width / 2);
        shape.closePath();
        return new THREE.ExtrudeGeometry(shape, {
            depth: 22, curveSegments: 24, bevelEnabled: true, bevelThickness: 9, bevelSize: 7, bevelOffset: -5, bevelSegments: 6,
        });
    };
    //            angle°, length, width, curl, root x, root y
    const plan = [
        [14, 640, 120, 250, 330, 70],
        [2, 760, 84, 40, 400, 0],
        [-14, 600, 112, -240, 330, -70],
        [30, 380, 96, 170, 200, 110],
        [-30, 350, 90, -160, 200, -110],
    ];
    const geometries: THREE.BufferGeometry[] = [];
    const blades: Array<{ holder: THREE.Group; rest: number; order: number }> = [];
    for (const side of [1, -1]) {
        const wing = new THREE.Group();
        wing.scale.x = side;
        wing.position.z = -52;
        plan.forEach(([angle, length, width, curl, x, y], order) => {
            const geometry = blade(length, width, curl);
            geometries.push(geometry);
            const holder = new THREE.Group();
            holder.position.set(x, y, -order * 6);
            holder.rotation.z = (angle * Math.PI) / 180;
            holder.add(new THREE.Mesh(geometry, steel));
            wing.add(holder);
            blades.push({ holder, rest: holder.rotation.z, order });
        });
        root.add(wing);
    }
    return {
        root,
        fit: 1.62,
        filter: HALO,
        environment,
        update(pivot, time, m) {
            float(pivot, time, m, 0.26, 0.1);
            flow.offset.set(time * 0.012, time * 0.007);
            // The blades open on the bass and breathe on their own in between.
            for (const b of blades) {
                const lift = Math.sign(b.rest) || 1;
                b.holder.rotation.z = b.rest + lift * (0.035 * Math.sin(time * 0.9 + b.order * 1.3) + 0.16 * m.swell);
            }
        },
        dispose() {
            solid.geometries.forEach((g) => g.dispose());
            geometries.forEach((g) => g.dispose());
            chrome.dispose();
            steel.dispose();
            flow.dispose();
        },
    };
}

/** Орбита: the wordmark with rings turning around it and a signal racing along each. */
function orbitLook(renderer: THREE.WebGLRenderer, shapes: THREE.Shape[]): Look {
    const environment = studio(renderer, "silver");
    const flow = ripples();
    const chrome = liquidMetal(0xffffff, 0.08, flow);
    const spark = new THREE.MeshBasicMaterial({ color: 0xffd9a8, toneMapped: false });
    const root = new THREE.Group();
    const solid = wordmark(shapes, chrome, 48, ROUND);
    root.add(solid.object);

    const sparkGeometry = new THREE.SphereGeometry(17, 20, 14);
    const geometries: THREE.BufferGeometry[] = [sparkGeometry];
    //           radius, tilt x, tilt z, speed, start
    const plan = [
        [800, 1.22, 0.2, 0.9, 0],
        [880, 1.32, -0.32, -0.65, 2.1],
        [730, 1.12, 0.9, 0.5, 4.2],
    ];
    const rings = plan.map(([radius, tiltX, tiltZ, speed, start]) => {
        const geometry = new THREE.TorusGeometry(radius, 9, 14, 180);
        geometries.push(geometry);
        const ring = new THREE.Group();
        ring.rotation.set(tiltX, 0, tiltZ);
        ring.add(new THREE.Mesh(geometry, chrome));
        const signal = new THREE.Mesh(sparkGeometry, spark);
        ring.add(signal);
        root.add(ring);
        return { ring, signal, radius, speed, start, tiltX };
    });
    return {
        root,
        fit: 1.42,
        filter: HALO,
        environment,
        update(pivot, time, m) {
            float(pivot, time, m, 0.22, 0.08);
            flow.offset.set(time * 0.012, time * 0.007);
            for (const r of rings) {
                // The rings tip back and forth; the signals run faster when the music is loud.
                r.ring.rotation.x = r.tiltX + 0.07 * Math.sin(time * 0.5 + r.start);
                const at = r.start + time * r.speed * (1 + 0.6 * m.swell);
                r.signal.position.set(Math.cos(at) * r.radius, Math.sin(at) * r.radius, 0);
                r.signal.scale.setScalar(1 + 0.8 * m.beat);
            }
        },
        dispose() {
            solid.geometries.forEach((g) => g.dispose());
            geometries.forEach((g) => g.dispose());
            chrome.dispose();
            spark.dispose();
            flow.dispose();
        },
    };
}

/** Неон: the outlines as glowing tubes on a pane of dark glass. */
function neonLook(_renderer: THREE.WebGLRenderer, shapes: THREE.Shape[]): Look {
    const hot = new THREE.MeshBasicMaterial({ color: 0xfff3e2, toneMapped: false });
    const amber = new THREE.MeshBasicMaterial({ color: 0xff5a14, toneMapped: false });
    const glass = new THREE.MeshBasicMaterial({ color: 0x050202, transparent: true, opacity: 0.62, toneMapped: false });
    const geometries: THREE.BufferGeometry[] = [];
    const root = new THREE.Group();

    // Two runs of tube trace every outline: a white-hot one in front, an amber one behind it.
    const tubes = new THREE.Group();
    tubes.scale.set(1, -1, 1);
    tubes.position.set(-W / 2, H / 2, 0);
    for (const shape of shapes) {
        for (const contour of [shape.getPoints(6), ...shape.holes.map((hole) => hole.getPoints(6))]) {
            const points = contour.map((p) => new THREE.Vector3(p.x, p.y, 0));
            if (points.length > 1 && points[0].distanceTo(points[points.length - 1]) < 0.01) points.pop();
            const path = new THREE.CurvePath<THREE.Vector3>();
            points.forEach((p, i) => path.add(new THREE.LineCurve3(p, points[(i + 1) % points.length])));
            const steps = Math.max(48, Math.round(path.getLength() / 5));
            const front = new THREE.TubeGeometry(path, steps, 5, 8, true);
            const back = new THREE.TubeGeometry(path, steps, 8, 8, true);
            geometries.push(front, back);
            tubes.add(new THREE.Mesh(front, hot));
            const behind = new THREE.Mesh(back, amber);
            behind.position.z = -26;
            tubes.add(behind);
        }
    }
    root.add(tubes);

    const paneShape = new THREE.Shape();
    const pw = W / 2 + 110;
    const ph = H / 2 + 90;
    const radius = 70;
    paneShape.moveTo(-pw + radius, -ph);
    paneShape.lineTo(pw - radius, -ph);
    paneShape.quadraticCurveTo(pw, -ph, pw, -ph + radius);
    paneShape.lineTo(pw, ph - radius);
    paneShape.quadraticCurveTo(pw, ph, pw - radius, ph);
    paneShape.lineTo(-pw + radius, ph);
    paneShape.quadraticCurveTo(-pw, ph, -pw, ph - radius);
    paneShape.lineTo(-pw, -ph + radius);
    paneShape.quadraticCurveTo(-pw, -ph, -pw + radius, -ph);
    const paneGeometry = new THREE.ShapeGeometry(paneShape, 12);
    geometries.push(paneGeometry);
    const pane = new THREE.Mesh(paneGeometry, glass);
    pane.position.z = -70;
    root.add(pane);

    const white = new THREE.Color(0xfff3e2);
    const orange = new THREE.Color(0xff5a14);
    return {
        root,
        fit: 1.42,
        filter:
            "drop-shadow(0 0 4px rgba(255, 150, 70, 0.95)) drop-shadow(0 0 16px rgba(255, 70, 0, 0.9)) drop-shadow(0 0 44px rgba(255, 61, 0, 0.55))",
        update(pivot, time, m) {
            float(pivot, time, m, 0.3, 0.1);
            // The sign hums, flares on the kick and now and then flickers.
            const flicker = Math.sin(time * 37) * Math.sin(time * 5.3) > 0.93 ? 0.72 : 1;
            const power = flicker * (0.86 + 0.14 * Math.sin(time * 2.1) + 0.3 * m.beat);
            hot.color.copy(white).multiplyScalar(Math.min(power, 1.15));
            amber.color.copy(orange).multiplyScalar(0.75 + 0.35 * power + 0.5 * m.swell);
        },
        dispose() {
            geometries.forEach((g) => g.dispose());
            hot.dispose();
            amber.dispose();
            glass.dispose();
        },
    };
}

/** Жар: dark iron straight from the forge — its edges glow, brighter with the bass. */
function emberLook(renderer: THREE.WebGLRenderer, shapes: THREE.Shape[]): Look {
    const environment = studio(renderer, "furnace");
    const heat = { value: 1 };
    const iron = new THREE.MeshStandardMaterial({ color: 0x1b1512, metalness: 0.9, roughness: 0.34 });
    // Light the surface up wherever it turns away from the viewer: the bevels and sides.
    iron.onBeforeCompile = (shader) => {
        shader.uniforms.uHeat = heat;
        shader.fragmentShader = shader.fragmentShader
            .replace("#include <common>", "#include <common>\nuniform float uHeat;")
            .replace(
                "#include <emissivemap_fragment>",
                `#include <emissivemap_fragment>
                float rim = 1.0 - clamp(dot(normal, normalize(vViewPosition)), 0.0, 1.0);
                totalEmissiveRadiance += uHeat * (pow(rim, 1.5) * vec3(1.0, 0.3, 0.03) + pow(rim, 4.0) * vec3(1.0, 0.8, 0.45));`
            );
    };
    const solid = wordmark(shapes, iron, 70, { thickness: 15, size: 10, inset: 8 });
    return {
        root: solid.object,
        fit: 1.22,
        filter: "drop-shadow(0 0 10px rgba(255, 90, 10, 0.75)) drop-shadow(0 8px 30px rgba(0, 0, 0, 0.7))",
        environment,
        update(pivot, time, m) {
            float(pivot, time, m, 0.38, 0.13);
            heat.value = 1.1 + 0.25 * Math.sin(time * 1.3) + 1.6 * m.swell + 1.2 * m.beat;
        },
        dispose() {
            solid.geometries.forEach((g) => g.dispose());
            iron.dispose();
        },
    };
}

/** Ретро: a deep block of type, white on the face and fading from fire to dark down its sides. */
function retroLook(_renderer: THREE.WebGLRenderer, shapes: THREE.Shape[]): Look {
    const depth = 300;
    const face = new THREE.MeshBasicMaterial({ color: 0xfff4e6, toneMapped: false });
    const sides = new THREE.MeshLambertMaterial({ vertexColors: true });
    const solid = wordmark(shapes, [face, sides], depth);
    // Colour the sides by depth: fire at the face, embers at the back.
    const near = new THREE.Color(0xff5a14);
    const far = new THREE.Color(0x3d0900);
    const mixed = new THREE.Color();
    for (const geometry of solid.geometries) {
        const position = geometry.getAttribute("position");
        const colors = new Float32Array(position.count * 3);
        for (let i = 0; i < position.count; i++) {
            mixed.copy(far).lerp(near, Math.pow(position.getZ(i) / depth, 1.6));
            colors.set([mixed.r, mixed.g, mixed.b], i * 3);
        }
        geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    }
    const root = new THREE.Group();
    solid.object.position.z = -depth; // the face stays at the pivot, the block runs back from it
    root.add(solid.object);
    root.add(new THREE.AmbientLight(0xffffff, 1.5));
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(-1, 1.4, 1.2);
    root.add(key);
    return {
        root,
        fit: 1.5,
        filter: HALO,
        update(pivot, time, m) {
            // A wider swing than the others, so the depth shows on both sides in turn.
            pivot.rotation.y = 0.5 * Math.sin(time * 0.45) + 0.35 * m.sway;
            pivot.rotation.x = 0.16 + 0.08 * Math.sin(time * 0.37 + 1.0);
            pivot.rotation.z = 0;
            pivot.position.y = 9 * Math.sin(time * 0.8);
            pivot.scale.setScalar(1 + 0.06 * m.swell + 0.035 * m.beat);
        },
        dispose() {
            solid.geometries.forEach((g) => g.dispose());
            face.dispose();
            sides.dispose();
        },
    };
}

const LOOKS = [chromeLook, wingsLook, orbitLook, neonLook, emberLook, retroLook];
const REST: LogoMotion = { swell: 0, sway: 0, beat: 0 };

export function createLogo3D(canvas: HTMLCanvasElement, options: Logo3DOptions = {}): Logo3DHandle | null {
    const motion = options.motion;
    const reducedMotion = options.reducedMotion ?? false;

    let renderer: THREE.WebGLRenderer;
    try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
        return null;
    }
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(FOV, 1, 10, 20000);
    const pivot = new THREE.Group();
    scene.add(pivot);

    const shapes = logoShapes();
    let look: Look | null = null;
    let style = -1;

    function resize() {
        const width = canvas.clientWidth || 1;
        const height = canvas.clientHeight || 1;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        // Far enough that this look, with room to move, spans the canvas width.
        const halfWidth = (W * (look?.fit ?? 1.22)) / 2;
        camera.position.z = halfWidth / (Math.tan((FOV * Math.PI) / 360) * camera.aspect);
        camera.updateProjectionMatrix();
    }

    let time = 0;
    let last = 0;
    let raf = 0;
    let running = false;

    function draw(dt: number) {
        time += dt;
        if (look) {
            // Reduced motion: one frozen moment of the look's own movement, no music.
            if (reducedMotion) look.update(pivot, 0.9, REST);
            else look.update(pivot, time, motion ? motion() : REST);
        }
        renderer.render(scene, camera);
    }

    function setStyle(next: number) {
        const index = Math.min(Math.max(Math.round(next) || 0, 0), LOOKS.length - 1);
        if (index === style) return;
        if (look) {
            pivot.remove(look.root);
            look.dispose();
            look.environment?.dispose();
        }
        pivot.rotation.set(0, 0, 0);
        pivot.position.set(0, 0, 0);
        pivot.scale.setScalar(1);
        style = index;
        look = LOOKS[index](renderer, shapes);
        scene.environment = look.environment?.texture ?? null;
        pivot.add(look.root);
        resize();
        if (!running) draw(0);
    }

    function frame(now: number) {
        if (!running) return;
        raf = requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.1);
        last = now;
        draw(dt);
    }

    setStyle(options.style ?? 0);

    return {
        setStyle,
        filter: () => look?.filter ?? HALO,
        resize() {
            resize();
            if (!running) draw(0);
        },
        start() {
            if (running) return;
            running = true;
            last = performance.now();
            raf = requestAnimationFrame(frame);
        },
        stop() {
            running = false;
            cancelAnimationFrame(raf);
        },
        destroy() {
            running = false;
            cancelAnimationFrame(raf);
            if (look) {
                look.dispose();
                look.environment?.dispose();
            }
            renderer.dispose();
        },
    };
}
