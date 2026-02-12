"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAudio } from "./AudioProvider";
import { useStreamData } from "../hooks/useStreamData";

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
        fill="currentColor" className="ml-0.5">
        <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
);

const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
        fill="currentColor">
        <rect width="4" height="16" x="6" y="4" />
        <rect width="4" height="16" x="14" y="4" />
    </svg>
);

const VolumeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
);

const MuteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" x2="17" y1="9" y2="15" />
        <line x1="17" x2="23" y1="9" y2="15" />
    </svg>
);

const NextTrackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-text-muted)]">
        <path d="M21 15V6" />
        <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
        <path d="M12 12H3" />
        <path d="M16 6H3" />
        <path d="M12 18H3" />
    </svg>
);

export default function RadioPlayer() {
    const { isPlaying, isMuted, streamError, togglePlay, toggleMute } = useAudio();
    const { current, next } = useStreamData(5000);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 400);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-5xl"
        >
            <div className="bg-black/90 backdrop-blur-xl border border-[var(--color-border)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                {/* ─── Main Row ─── */}
                <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-5 py-2.5 sm:py-3">

                    {/* Play Button */}
                    <button
                        onClick={togglePlay}
                        className={`w-11 h-11 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 hover:bg-orange-50 transition-all duration-200 shadow-lg shadow-[var(--color-accent)]/20 active:scale-95 shrink-0 ${isPlaying ? "play-pulse" : ""}`}
                    >
                        {isPlaying ? <PauseIcon /> : <PlayIcon />}
                    </button>

                    {/* Album Art */}
                    <div className="relative shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={current.cover}
                            alt="Album Art"
                            className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl object-cover border border-white/10"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "/images/no_cover.png";
                            }}
                        />
                        {isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/20">
                                <div className="flex gap-[3px] items-end h-3">
                                    <div className="w-[3px] bg-white/80 rounded-full h-full animate-pulse" />
                                    <div className="w-[3px] bg-white/80 rounded-full h-2/3 animate-pulse" style={{ animationDelay: "0.15s" }} />
                                    <div className="w-[3px] bg-white/80 rounded-full h-1/3 animate-pulse" style={{ animationDelay: "0.3s" }} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Track Info */}
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                            {streamError ? (
                                <>
                                    <span className="relative flex h-2 w-2 shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                                    </span>
                                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">
                                        {streamError}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="relative flex h-2 w-2 shrink-0">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                                    </span>
                                    <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">
                                        Efirda
                                    </span>
                                    {current.duration && (
                                        <span className="text-[10px] text-[var(--color-text-muted)] tabular-nums">
                                            {current.duration}
                                        </span>
                                    )}
                                </>
                            )}
                            {current.genre && (
                                <span className="hidden sm:inline text-[9px] text-[var(--color-text-muted)] bg-white/5 border border-white/10 px-1.5 py-px rounded-full">
                                    {current.genre}
                                </span>
                            )}
                        </div>
                        <h2 className="font-display text-sm sm:text-[15px] font-bold text-white truncate leading-tight tracking-wide">
                            {current.title}
                        </h2>
                        <p className="font-display text-xs text-[var(--color-accent)] font-bold uppercase tracking-wide truncate">
                            {current.artist}
                        </p>
                    </div>

                    {/* Volume — hidden on very small, shown sm+ */}
                    <button
                        onClick={toggleMute}
                        className={`hidden sm:flex p-2 rounded-full transition-colors shrink-0 ${isMuted
                            ? "text-red-500 bg-red-500/10"
                            : "text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5"
                            }`}
                        title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
                    >
                        {isMuted ? <MuteIcon /> : <VolumeIcon />}
                    </button>

                    {/* Divider — desktop only */}
                    <div className="hidden md:block w-px h-10 bg-[var(--color-border)] shrink-0" />

                    {/* Up Next — desktop/tablet only */}
                    <div className="hidden md:flex items-center gap-3 min-w-0 shrink-0 max-w-[240px]">
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                                <NextTrackIcon />
                                <span className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">
                                    Keyingi tarona
                                </span>
                            </div>
                            <p className="text-xs text-[var(--color-text-secondary)] font-medium truncate">
                                {next.artist && next.title
                                    ? `${next.artist} — ${next.title}`
                                    : "Yuklanmoqda..."}
                            </p>
                        </div>
                        {next.cover && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={next.cover}
                                alt="Next track"
                                className="w-9 h-9 rounded-lg object-cover border border-white/10 shrink-0"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* ─── Mobile Bottom Row: Up Next + Volume ─── */}
                <div className="md:hidden border-t border-white/5 px-3 py-2 flex items-center gap-3">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                        <NextTrackIcon />
                        <span className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider shrink-0">
                            Keyingi
                        </span>
                        {next.cover && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={next.cover}
                                alt="Next"
                                className="w-6 h-6 rounded object-cover border border-white/10 shrink-0"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                }}
                            />
                        )}
                        <p className="text-[11px] text-[var(--color-text-secondary)] truncate min-w-0">
                            {next.artist && next.title
                                ? `${next.artist} — ${next.title}`
                                : "Loading..."}
                        </p>
                    </div>

                    {current.genre && (
                        <span className="sm:hidden text-[9px] text-[var(--color-text-muted)] bg-white/5 border border-white/10 px-1.5 py-px rounded-full shrink-0">
                            {current.genre}
                        </span>
                    )}

                    <button
                        onClick={toggleMute}
                        className={`sm:hidden p-1.5 rounded-full transition-colors shrink-0 ${isMuted
                            ? "text-red-500 bg-red-500/10"
                            : "text-[var(--color-text-secondary)] hover:text-white"
                            }`}
                        title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
                    >
                        {isMuted ? <MuteIcon /> : <VolumeIcon />}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
