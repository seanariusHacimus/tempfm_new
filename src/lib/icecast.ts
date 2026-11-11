/**
 * Icecast 2.4 status-json.xsl → current track.
 * `source` is an object when one mount is up and an array otherwise.
 * `title` (StreamTitle) is omitted until the encoder sends metadata.
 */

export const ICECAST_STATUS_URL = "https://tempradio-live.uz/status-json.xsl";

/** Public mounts, most representative first. */
export const MOUNT_PRIORITY = ["/live", "/streammp3", "/streamaac", "/streamaactest"] as const;

export interface IcecastSource {
    listenurl?: string;
    title?: unknown;
    yp_currently_playing?: unknown;
}

export interface TrackTitle {
    artist: string;
    title: string;
}

export interface PickedTrack {
    hasTrack: boolean;
    artist: string;
    title: string;
    rawTitle: string | null;
    mount: string | null;
}

const TITLE_SEPARATOR = /^(.*?)\s+[-–—]\s+(.+)$/;

export function parseTrackTitle(raw: string): TrackTitle {
    const cleaned = decodeBasicEntities(raw).replace(/\s+/g, " ").trim();
    const match = TITLE_SEPARATOR.exec(cleaned);
    if (match) {
        const artist = match[1].trim();
        const title = match[2].trim();
        if (artist && title) return { artist, title };
    }
    return { artist: "", title: cleaned };
}

export function isUsableTitle(value: unknown): value is string {
    if (typeof value !== "string") return false;
    const trimmed = value.trim();
    if (!trimmed) return false;
    return !/^[-–—.\s]+$/.test(trimmed);
}

export function pickTrack(status: unknown): PickedTrack {
    const sources = listSources(status)
        .map((source) => ({ source, mount: mountFromListenUrl(source.listenurl) }))
        .filter((item): item is { source: IcecastSource; mount: string } => item.mount != null)
        .filter((item) => (MOUNT_PRIORITY as readonly string[]).includes(item.mount))
        .sort(
            (a, b) =>
                (MOUNT_PRIORITY as readonly string[]).indexOf(a.mount) -
                (MOUNT_PRIORITY as readonly string[]).indexOf(b.mount),
        );

    for (const item of sources) {
        const raw = firstUsable(item.source.title, item.source.yp_currently_playing);
        if (!raw) continue;
        const parsed = parseTrackTitle(raw);
        if (!parsed.title) continue;
        return {
            hasTrack: true,
            artist: parsed.artist,
            title: parsed.title,
            rawTitle: raw.trim(),
            mount: item.mount,
        };
    }

    return {
        hasTrack: false,
        artist: "",
        title: "",
        rawTitle: null,
        mount: sources[0]?.mount ?? null,
    };
}

function listSources(status: unknown): IcecastSource[] {
    if (!status || typeof status !== "object") return [];
    const source = (status as { icestats?: { source?: unknown } }).icestats?.source;
    if (!source) return [];
    const list = Array.isArray(source) ? source : [source];
    return list.filter(isSource);
}

function isSource(value: unknown): value is IcecastSource {
    return Boolean(value) && typeof value === "object";
}

export function mountFromListenUrl(listenurl: unknown): string | null {
    if (typeof listenurl !== "string" || !listenurl.trim()) return null;
    try {
        const pathname = new URL(listenurl).pathname.replace(/\/+$/, "");
        return pathname || null;
    } catch {
        const match = listenurl.match(/\/(live|streammp3|streamaac|streamaactest)\/?$/);
        return match ? `/${match[1]}` : null;
    }
}

function firstUsable(...values: unknown[]): string | null {
    for (const value of values) {
        if (isUsableTitle(value)) return value;
    }
    return null;
}

function decodeBasicEntities(value: string): string {
    return value
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
}
