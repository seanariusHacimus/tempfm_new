import { useState, useEffect, useRef, useCallback } from "react";
import { fetchStreamDataXml } from "@/app/actions";

export interface TrackInfo {
    title: string;
    artist: string;
    cover: string;
    album: string;
    duration: string;
    genre: string;
}

export interface StreamData {
    current: TrackInfo;
    next: TrackInfo;
    loading: boolean;
    error: string | null;
}

const STREAM_BASE = "https://test.tempfm.uz/nowonair";
const DEFAULT_COVER = "/images/no_cover.png"; // local fallback (moved to /public/images to avoid proxy)
const ARTWORK_CURRENT = `${STREAM_BASE}/images/artwork.png`;
const ARTWORK_NEXT = `${STREAM_BASE}/images/artwork_next.png`;
const PRELOAD_TIMEOUT_MS = 3000;

/** Preload an image and resolve with the URL, or fall back on error/timeout. */
function preloadImage(src: string, fallback: string): Promise<string> {
    return new Promise((resolve) => {
        const img = new Image();
        const timer = setTimeout(() => {
            img.onload = null;
            img.onerror = null;
            resolve(fallback);
        }, PRELOAD_TIMEOUT_MS);

        img.onload = () => {
            clearTimeout(timer);
            resolve(src);
        };
        img.onerror = () => {
            clearTimeout(timer);
            resolve(fallback);
        };
        img.src = src;
    });
}

/** Extract a TRACK element's attributes into a partial TrackInfo. */
function parseTrackNode(node: Element | null): Omit<TrackInfo, "cover"> {
    return {
        title: node?.getAttribute("TITLE") || "Unknown Title",
        artist: node?.getAttribute("ARTIST") || "Unknown Artist",
        album: node?.getAttribute("ALBUM") || "",
        duration: node?.getAttribute("DURATION") || "",
        genre: node?.getAttribute("GENRE") || "",
    };
}

export function useStreamData(pollInterval = 5000) {
    const [data, setData] = useState<StreamData>({
        current: {
            title: "Loading...",
            artist: "TempFM",
            cover: DEFAULT_COVER,
            album: "",
            duration: "",
            genre: "",
        },
        next: {
            title: "",
            artist: "",
            cover: "",
            album: "",
            duration: "",
            genre: "",
        },
        loading: true,
        error: null,
    });

    // Refs to track previous values — avoids stale closure issues
    const prevCurrentRef = useRef({ title: "", artist: "" });
    const prevNextRef = useRef({ title: "", artist: "" });

    const fetchStreamData = useCallback(async () => {
        try {
            console.log("[useStreamData] Fetching XML via Server Action...");
            // Use Server Action to bypass CORS on the client
            const xmlText = await fetchStreamDataXml();

            console.log("[useStreamData] XML received (len):", xmlText.length);
            // console.log("[useStreamData] XML preview:", xmlText.substring(0, 100));

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "text/xml");

            // Current track
            const currentTrackNode = xmlDoc.querySelector("TRACK");
            const current = parseTrackNode(currentTrackNode);
            console.log("[useStreamData] Parsed current:", current);

            // Next track
            const nextTrackNode = xmlDoc.querySelector("NEXTTRACK TRACK");
            const next = parseTrackNode(nextTrackNode);
            console.log("[useStreamData] Parsed next:", next);

            const prev = prevCurrentRef.current;
            const prevNext = prevNextRef.current;

            // Check if anything actually changed
            const currentChanged =
                current.title !== prev.title ||
                current.artist !== prev.artist;
            const nextChanged =
                next.title !== prevNext.title ||
                next.artist !== prevNext.artist;

            if (!currentChanged && !nextChanged) {
                // Nothing changed — just clear loading on first successful fetch
                setData((d) =>
                    d.loading ? { ...d, loading: false, error: null } : d
                );
                return;
            }

            // Preload cover images when tracks change
            let currentCover: string;
            let nextCover: string;

            if (currentChanged) {
                currentCover = await preloadImage(
                    `${ARTWORK_CURRENT}?t=${Date.now()}`,
                    DEFAULT_COVER
                );
                prevCurrentRef.current = {
                    title: current.title,
                    artist: current.artist,
                };
            } else {
                // Keep existing cover
                currentCover = ""; // sentinel — will be replaced below
            }

            if (nextChanged) {
                nextCover = await preloadImage(
                    `${ARTWORK_NEXT}?t=${Date.now()}`,
                    DEFAULT_COVER
                );
                prevNextRef.current = {
                    title: next.title,
                    artist: next.artist,
                };
            } else {
                nextCover = "";
            }

            setData((prevData) => ({
                current: {
                    ...current,
                    cover: currentChanged
                        ? currentCover
                        : prevData.current.cover,
                },
                next: {
                    ...next,
                    cover: nextChanged ? nextCover : prevData.next.cover,
                },
                loading: false,
                error: null,
            }));
        } catch (err) {
            console.error("Stream data fetch error:", err);
            setData((prev) => ({
                ...prev,
                loading: false,
                error: "Failed to load stream data",
            }));
        }
    }, []);

    useEffect(() => {
        // Initial fetch
        fetchStreamData();

        // Poll
        const interval = setInterval(fetchStreamData, pollInterval);

        return () => {
            clearInterval(interval);
        };
    }, [pollInterval, fetchStreamData]);

    return data;
}
