import { ICECAST_STATUS_URL, pickTrack } from "@/lib/icecast";

export const dynamic = "force-dynamic";

const CACHE_TTL_MS = 10_000;
const STALE_TTL_MS = 60_000;
const UPSTREAM_TIMEOUT_MS = 5_000;

export interface NowPlayingResponse {
    ok: boolean;
    hasTrack: boolean;
    artist: string;
    title: string;
    rawTitle: string | null;
    mount: string | null;
    fetchedAt: string | null;
}

interface CacheEntry {
    expiresAt: number;
    body: NowPlayingResponse;
}

let cache: CacheEntry | null = null;
let pending: Promise<NowPlayingResponse> | null = null;

export async function GET() {
    const now = Date.now();
    if (cache && now < cache.expiresAt) {
        return respond(cache.body, true);
    }

    try {
        return respond(await loadShared(), true);
    } catch (error) {
        console.error("[now-playing] Icecast status fetch failed:", error);
        if (cache && now < cache.expiresAt + STALE_TTL_MS) {
            return respond(cache.body, true);
        }
        return respond(
            {
                ok: false,
                hasTrack: false,
                artist: "",
                title: "",
                rawTitle: null,
                mount: null,
                fetchedAt: null,
            },
            false,
        );
    }
}

function loadShared(): Promise<NowPlayingResponse> {
    if (!pending) {
        pending = loadFromIcecast()
            .then((body) => {
                cache = { body, expiresAt: Date.now() + CACHE_TTL_MS };
                return body;
            })
            .finally(() => {
                pending = null;
            });
    }
    return pending;
}

async function loadFromIcecast(): Promise<NowPlayingResponse> {
    const response = await fetch(ICECAST_STATUS_URL, {
        cache: "no-store",
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        headers: {
            Accept: "application/json",
            "User-Agent": "TempFM-Website/1.0",
        },
    });

    if (!response.ok) {
        throw new Error(`Icecast status ${response.status}`);
    }

    const picked = pickTrack(await response.json());
    return {
        ok: true,
        hasTrack: picked.hasTrack,
        artist: picked.artist,
        title: picked.title,
        rawTitle: picked.rawTitle,
        mount: picked.mount,
        fetchedAt: new Date().toISOString(),
    };
}

function respond(body: NowPlayingResponse, cacheable: boolean) {
    return Response.json(body, {
        status: 200,
        headers: {
            "Cache-Control": cacheable
                ? "public, max-age=0, s-maxage=10, stale-while-revalidate=30"
                : "no-store",
        },
    });
}
