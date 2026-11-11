"use client";

import { useState, useEffect, useCallback } from "react";

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

const EMPTY_TRACK: TrackInfo = {
    title: "",
    artist: "",
    cover: "",
    album: "",
    duration: "",
    genre: "",
};

interface NowPlayingResponse {
    artist?: unknown;
    title?: unknown;
    stale?: unknown;
    fallback?: unknown;
}

function readText(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

export function useStreamData(pollInterval = 5000) {
    const [data, setData] = useState<StreamData>({
        current: EMPTY_TRACK,
        next: EMPTY_TRACK,
        loading: true,
        error: null,
    });

    const fetchStreamData = useCallback(async () => {
        try {
            const response = await fetch("/api/nowplaying", { cache: "no-store" });
            if (!response.ok) {
                throw new Error(`nowplaying ${response.status}`);
            }

            const body = (await response.json()) as NowPlayingResponse;
            const artist = readText(body.artist);
            const title = readText(body.title);
            const unusable =
                body.fallback === true || body.stale === true || !artist || !title;

            setData({
                current: unusable
                    ? EMPTY_TRACK
                    : {
                          title,
                          artist,
                          cover: "",
                          album: "",
                          duration: "",
                          genre: "",
                      },
                next: EMPTY_TRACK,
                loading: false,
                error: null,
            });
        } catch (error) {
            console.warn("[useStreamData] now-playing unavailable", error);
            setData({
                current: EMPTY_TRACK,
                next: EMPTY_TRACK,
                loading: false,
                error: null,
            });
        }
    }, []);

    useEffect(() => {
        fetchStreamData();
        const interval = setInterval(fetchStreamData, pollInterval);
        return () => clearInterval(interval);
    }, [pollInterval, fetchStreamData]);

    return data;
}
