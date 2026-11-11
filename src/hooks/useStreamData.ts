"use client";

import { useEffect, useMemo, useState } from "react";
import { findCurrentShow, findNextShow, type WeeklySchedule } from "@/lib/schedule";
import { useTranslation } from "@/i18n";

interface NowPlayingResponse {
    ok: boolean;
    hasTrack: boolean;
    artist: string;
    title: string;
    rawTitle: string | null;
    mount: string | null;
    fetchedAt: string | null;
}

export interface TrackInfo {
    title: string;
    artist: string;
    cover: string;
    album: string;
    duration: string;
    genre: string;
}

export type NowPlayingMode = "track" | "show" | "station";

export interface StreamData {
    current: TrackInfo;
    next: TrackInfo;
    /** Where the current line came from. Icecast has no artwork. */
    mode: NowPlayingMode;
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

const EMPTY_API: NowPlayingResponse = {
    ok: false,
    hasTrack: false,
    artist: "",
    title: "",
    rawTitle: null,
    mount: null,
    fetchedAt: null,
};

export function useStreamData(pollInterval = 10_000): StreamData {
    const { dict, t } = useTranslation();
    const [api, setApi] = useState<NowPlayingResponse | null>(null);
    const [now, setNow] = useState<Date | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const load = async () => {
            setNow(new Date());
            try {
                const response = await fetch("/api/now-playing", { cache: "no-store" });
                if (!response.ok) throw new Error(`now-playing ${response.status}`);
                const body = (await response.json()) as NowPlayingResponse;
                if (!cancelled) setApi(body);
            } catch (error) {
                console.error("[useStreamData] now-playing fetch failed:", error);
                if (!cancelled) setApi(EMPTY_API);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        load();
        const interval = setInterval(load, pollInterval);
        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, [pollInterval]);

    const shows = dict.schedule?.shows as WeeklySchedule | undefined;
    const stationFallback = t("player.stationFallback");

    return useMemo(() => {
        let current: TrackInfo = { ...EMPTY_TRACK, title: stationFallback };
        let mode: NowPlayingMode = "station";

        if (api?.hasTrack && api.title) {
            current = { ...EMPTY_TRACK, title: api.title, artist: api.artist };
            mode = "track";
        } else if (now && shows) {
            const show = findCurrentShow(shows, now);
            if (show) {
                current = {
                    ...EMPTY_TRACK,
                    title: show.title,
                    artist: show.host,
                    genre: show.genre ?? "",
                };
                mode = "show";
            }
        }

        const upcoming = now && shows ? findNextShow(shows, now) : null;
        const next: TrackInfo = upcoming
            ? {
                ...EMPTY_TRACK,
                title: upcoming.title,
                artist: upcoming.host,
                genre: upcoming.genre ?? "",
            }
            : EMPTY_TRACK;

        return { current, next, mode, loading, error: null };
    }, [api, now, shows, stationFallback, loading]);
}
