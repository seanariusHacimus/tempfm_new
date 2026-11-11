/** Live now-playing JSON. Override with the NOWPLAYING_URL environment variable. */
export const DEFAULT_NOWPLAYING_URL =
    "https://temp-fm-monitor-production.up.railway.app/api/nowplaying";

export const NOWPLAYING_REVALIDATE_SECONDS = 5;
const TIMEOUT_MS = 4_000;

export interface NowPlayingPayload {
    artist: string;
    title: string;
    stale: boolean;
    /** True when the player should show the localized station fallback. */
    fallback: boolean;
}

export function fallbackNowPlaying(): NowPlayingPayload {
    return { artist: "", title: "", stale: true, fallback: true };
}

function readText(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

/** Map the monitor payload to a track, or a fallback when it is unusable. */
export function parseNowPlaying(payload: unknown): NowPlayingPayload {
    if (!payload || typeof payload !== "object") return fallbackNowPlaying();

    const record = payload as Record<string, unknown>;
    if (record.stale === true) return fallbackNowPlaying();

    const current =
        record.current && typeof record.current === "object"
            ? (record.current as Record<string, unknown>)
            : null;

    const artist = readText(record.artist) || (current ? readText(current.artist) : "");
    const title = readText(record.title) || (current ? readText(current.title) : "");

    if (!artist || !title) return fallbackNowPlaying();

    return { artist, title, stale: false, fallback: false };
}

export function nowPlayingUrl(): string {
    const configured = process.env.NOWPLAYING_URL?.trim();
    return configured || DEFAULT_NOWPLAYING_URL;
}

const CACHE_MS = NOWPLAYING_REVALIDATE_SECONDS * 1000;

let cached: { expiresAt: number; payload: NowPlayingPayload } | null = null;
let pending: Promise<NowPlayingPayload> | null = null;

async function fetchNowPlaying(): Promise<NowPlayingPayload> {
    const url = nowPlayingUrl();

    try {
        // Bypass the Next.js data cache so the abort signal is kept. A cached
        // revalidation drops the signal and can hang on a dead upstream.
        const response = await fetch(url, {
            cache: "no-store",
            signal: AbortSignal.timeout(TIMEOUT_MS),
            headers: { Accept: "application/json" },
        });

        if (!response.ok) {
            console.warn(`[nowplaying] upstream responded ${response.status}`);
            return fallbackNowPlaying();
        }

        return parseNowPlaying(await response.json());
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.warn(`[nowplaying] upstream request failed: ${message}`);
        return fallbackNowPlaying();
    }
}

/** Fetch now-playing, reusing the last result for a few seconds. */
export function loadNowPlaying(): Promise<NowPlayingPayload> {
    const now = Date.now();
    if (cached && cached.expiresAt > now) return Promise.resolve(cached.payload);
    if (pending) return pending;

    pending = fetchNowPlaying()
        .then((payload) => {
            cached = { expiresAt: Date.now() + CACHE_MS, payload };
            return payload;
        })
        .finally(() => {
            pending = null;
        });

    return pending;
}
