import { LOGO_STYLES, LOGO_TINTS } from "./logoStyles";
import { SHAPES } from "./shader";

/**
 * Everything about the background that can be adjusted, in one plain object:
 * the preview pages edit it with their controls, and the chosen values are
 * what the home page will pass to EqualizerBackground.
 */
export interface EqualizerSettings {
    /** Form of the figure: an index into SHAPES. */
    shape: number;
    /** Colour scheme: an index into PALETTES. */
    palette: number;
    /** Hue in degrees, used by the "own hue" palette. */
    hue: number;
    /** Exposure of the whole picture, 1 = default. */
    brightness: number;
    /** How fast the light drifts and the figure turns, 1 = default. */
    speed: number;
    /** How strongly the light follows the music, 1 = default. */
    react: number;
    /** How much the figure floats and changes shape with the music, 1 = default. */
    float: number;
    /** Brightness of the core in the middle, 1 = default. */
    core: number;
    /** Slow motes of dust in the light. */
    dust: boolean;
    /** Logo look: an index into LOGO_STYLES, or -1 for no logo. */
    logo: number;
    /** Logo material: an index into LOGO_TINTS. */
    logoTint: number;
    /** Logo size, 1 = default. */
    logoSize: number;
    /** How much the logo itself moves, 1 = default, 0 = still. */
    logoMotion: number;
}

export const DEFAULT_SETTINGS: EqualizerSettings = {
    shape: 0,
    palette: 0,
    hue: 16,
    brightness: 1,
    speed: 1,
    react: 1,
    float: 1,
    core: 1,
    dust: true,
    logo: 1,
    logoTint: 0,
    logoSize: 1,
    logoMotion: 1,
};

/** Colour schemes. `hue` is in degrees; `fire` is hand-tuned to the TempFM accent. */
export const PALETTES = [
    { id: "fire", name: "Огонь", hue: 16, saturation: 1 },
    { id: "ruby", name: "Рубин", hue: 350, saturation: 1 },
    { id: "gold", name: "Золото", hue: 42, saturation: 1 },
    { id: "lime", name: "Лайм", hue: 96, saturation: 1 },
    { id: "ice", name: "Лёд", hue: 205, saturation: 1 },
    { id: "violet", name: "Фиолет", hue: 282, saturation: 1 },
    { id: "mono", name: "Моно", hue: 30, saturation: 0 },
    { id: "own", name: "Свой", hue: -1, saturation: 1 },
] as const;

type RGB = [number, number, number];

function hsl(h: number, s: number, l: number): RGB {
    const hue = (((h % 360) + 360) % 360) / 60;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((hue % 2) - 1));
    const m = l - c / 2;
    const [r, g, b] =
        hue < 1 ? [c, x, 0] : hue < 2 ? [x, c, 0] : hue < 3 ? [0, c, x] : hue < 4 ? [0, x, c] : hue < 5 ? [x, 0, c] : [c, 0, x];
    return [r + m, g + m, b + m];
}

const FIRE: RGB[] = [
    [0.045, 0.012, 0.008],
    [0.36, 0.045, 0.008],
    [0.93, 0.21, 0.02],
    [1.0, 0.45, 0.07],
    [1.0, 0.8, 0.4],
    [1.0, 0.98, 0.93],
];

/**
 * The colours a palette stands for: six stops from the darkest background
 * tone to the white-hot core, and the accent the logo picks up.
 */
export function paletteColors(settings: Pick<EqualizerSettings, "palette" | "hue">): { ramp: number[]; accent: RGB } {
    const palette = PALETTES[settings.palette] ?? PALETTES[0];
    if (palette.id === "fire") return { ramp: FIRE.flat(), accent: [1, 0.353, 0.078] };

    const h = palette.hue < 0 ? settings.hue : palette.hue;
    const s = palette.saturation;
    // Highlights lean towards the nearest "light" hue: yellow for warm colours, cyan for cold ones.
    const wrapped = ((h % 360) + 360) % 360;
    const target = wrapped >= 120 && wrapped < 300 ? 180 : wrapped >= 300 ? 420 : 60;
    const lean = Math.max(-30, Math.min(30, target - wrapped));
    const stops: RGB[] = [
        hsl(h, 0.75 * s, 0.035),
        hsl(h, 0.9 * s, 0.15),
        hsl(h, s, 0.46),
        hsl(h + 0.45 * lean, s, 0.56),
        hsl(h + 0.9 * lean, s, 0.76),
        s === 0 ? [1, 1, 1] : hsl(h + lean, 0.9, 0.96),
    ];
    return { ramp: stops.flat(), accent: hsl(h + 0.3 * lean, s, 0.54) };
}

/** A palette's signature colour as CSS, for swatches in the controls. */
export function paletteSwatch(index: number, hue: number): string {
    const [r, g, b] = paletteColors({ palette: index, hue }).ramp.slice(6, 9);
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

// ── Controls: one description that both preview pages draw their panels from ──

type Key = keyof EqualizerSettings;

export type Control =
    | { kind: "choice"; key: Key; label: string; options: Array<{ value: number; name: string; swatch?: string }> }
    | { kind: "range"; key: Key; label: string; min: number; max: number; step: number; unit?: string }
    | { kind: "toggle"; key: Key; label: string };

export interface Panel {
    id: string;
    name: string;
    controls: Control[];
}

const percent = (key: Key, label: string, min: number, max: number): Control => ({
    kind: "range", key, label, min, max, step: 0.05, unit: "%",
});

export const PANELS: Panel[] = [
    {
        id: "shape",
        name: "Форма",
        controls: [
            { kind: "choice", key: "shape", label: "Форма фона", options: SHAPES.map((s, value) => ({ value, name: s.name })) },
            percent("float", "Деформация", 0, 2),
        ],
    },
    {
        id: "color",
        name: "Цвет",
        controls: [
            {
                kind: "choice",
                key: "palette",
                label: "Цвет",
                options: PALETTES.map((p, value) => ({ value, name: p.name, swatch: p.id === "own" ? "own" : paletteSwatch(value, 0) })),
            },
            { kind: "range", key: "hue", label: "Свой оттенок", min: 0, max: 360, step: 1, unit: "°" },
            percent("brightness", "Яркость", 0.4, 1.6),
        ],
    },
    {
        id: "logo",
        name: "Лого",
        controls: [
            {
                kind: "choice",
                key: "logo",
                label: "Логотип",
                options: [{ value: -1, name: "Без лого" }, ...LOGO_STYLES.map((s, value) => ({ value, name: s.name }))],
            },
            {
                kind: "choice",
                key: "logoTint",
                label: "Материал",
                options: LOGO_TINTS.map((t, value) => ({ value, name: t.name, swatch: t.color ?? "accent" })),
            },
            percent("logoSize", "Размер", 0.5, 1.5),
            percent("logoMotion", "Движение", 0, 2),
        ],
    },
    {
        id: "motion",
        name: "Движение",
        controls: [
            percent("speed", "Скорость", 0, 2.5),
            percent("react", "Реакция на музыку", 0.2, 2),
            percent("core", "Ядро", 0, 2),
            { kind: "toggle", key: "dust", label: "Пыль в свете" },
        ],
    },
];

/** The settings as a short line of text, for passing a chosen look on. */
export function describeSettings(s: EqualizerSettings): string {
    const pct = (x: number) => `${Math.round(x * 100)}%`;
    const palette = PALETTES[s.palette] ?? PALETTES[0];
    return [
        `форма: ${SHAPES[s.shape]?.name ?? s.shape}`,
        `деформация: ${pct(s.float)}`,
        `цвет: ${palette.name}${palette.id === "own" ? ` (${Math.round(s.hue)}°)` : ""}`,
        `яркость: ${pct(s.brightness)}`,
        `лого: ${s.logo < 0 ? "без лого" : LOGO_STYLES[s.logo]?.name ?? s.logo}`,
        ...(s.logo < 0
            ? []
            : [`материал: ${LOGO_TINTS[s.logoTint]?.name}`, `размер лого: ${pct(s.logoSize)}`, `движение лого: ${pct(s.logoMotion)}`]),
        `скорость: ${pct(s.speed)}`,
        `реакция: ${pct(s.react)}`,
        `ядро: ${pct(s.core)}`,
        `пыль: ${s.dust ? "да" : "нет"}`,
    ].join("; ");
}
