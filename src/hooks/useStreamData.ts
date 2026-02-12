import { useState, useEffect } from "react";

export interface TrackInfo {
    title: string;
    artist: string;
    cover: string;
}

export interface StreamData {
    current: TrackInfo;
    next: TrackInfo;
    loading: boolean;
    error: string | null;
}

const DEFAULT_COVER = "/nowonair/images/no_cover.png"; // Fallback if artwork fails

export function useStreamData(pollInterval = 5000) {
    const [data, setData] = useState<StreamData>({
        current: { title: "Loading...", artist: "TempFM", cover: DEFAULT_COVER },
        next: { title: "", artist: "", cover: "" },
        loading: true,
        error: null,
    });

    useEffect(() => {
        let isMounted = true;

        const fetchStreamData = async () => {
            try {
                const response = await fetch("/nowonair/nowplaying.xml?t=" + Date.now());
                if (!response.ok) throw new Error("Failed to fetch stream data");

                const xmlText = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, "text/xml");

                // Current Track
                const trackNode = xmlDoc.querySelector("TRACK");
                const title = trackNode?.getAttribute("TITLE") || "Unknown Title";
                const artist = trackNode?.getAttribute("ARTIST") || "Unknown Artist";

                // Only update cover timestamp if track changed
                let cover = data.current.cover;
                if (title !== data.current.title || artist !== data.current.artist) {
                    cover = `/nowonair/images/artwork.png?t=${Date.now()}`;
                }

                // Next Track
                const nextTrackNode = xmlDoc.querySelector("NEXTTRACK TRACK");
                const nextTitle = nextTrackNode?.getAttribute("TITLE") || "Unknown Title";
                const nextArtist = nextTrackNode?.getAttribute("ARTIST") || "Unknown Artist";

                if (isMounted) {
                    // Deep check to avoid unnecessary re-renders if nothing changed
                    if (title !== data.current.title || artist !== data.current.artist ||
                        nextTitle !== data.next.title || nextArtist !== data.next.artist) {

                        setData({
                            current: { title, artist, cover },
                            next: { title: nextTitle, artist: nextArtist, cover: "" },
                            loading: false,
                            error: null,
                        });
                    }
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Stream data fetch error:", err);
                    setData(prev => ({ ...prev, loading: false, error: "Failed to load stream data" }));
                }
            }
        };

        // Initial fetch
        fetchStreamData();

        // Poll every 5 seconds
        const interval = setInterval(fetchStreamData, pollInterval);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [pollInterval]);

    return data;
}
