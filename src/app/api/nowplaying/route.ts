import { NextResponse } from "next/server";
import { loadNowPlaying, NOWPLAYING_REVALIDATE_SECONDS } from "@/lib/nowplaying";

// Fresh on each request. loadNowPlaying keeps a short in-memory cache, and
// the CDN may reuse this response for NOWPLAYING_REVALIDATE_SECONDS.
export const dynamic = "force-dynamic";

export async function GET() {
    const body = await loadNowPlaying();

    return NextResponse.json(body, {
        headers: {
            "Cache-Control": `public, max-age=0, s-maxage=${NOWPLAYING_REVALIDATE_SECONDS}, stale-while-revalidate=10`,
        },
    });
}
