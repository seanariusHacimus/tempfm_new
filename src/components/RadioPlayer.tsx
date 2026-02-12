"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAudio } from "./AudioProvider";
import { useStreamData } from "../hooks/useStreamData";

// SVG Icons
const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5">
        <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
);

const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="4" height="16" x="6" y="4" />
        <rect width="4" height="16" x="14" y="4" />
    </svg>
);

const VolumeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
);

const MuteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" x2="17" y1="9" y2="15" />
        <line x1="17" x2="23" y1="9" y2="15" />
    </svg>
);

const ArrowUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 15-6-6-6 6" />
    </svg>
);

export default function RadioPlayer() {
    const { isPlaying, isMuted, togglePlay, toggleMute } = useAudio();
    const { current, next } = useStreamData(5000); // Poll every 5s
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mounted, setMounted] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(1280);

    // Entrance animation delay
    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 400);
        return () => clearTimeout(timer);
    }, []);

    // Track viewport width
    useEffect(() => {
        setViewportWidth(window.innerWidth);
        const onResize = () => setViewportWidth(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Progressive scroll — map scroll position to 0..1
    useEffect(() => {
        let ticking = false;

        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    // Start shrinking after 80px, fully minimized by 400px
                    const progress = Math.min(1, Math.max(0, (scrollY - 80) / 320));
                    setScrollProgress(progress);
                    ticking = false;
                });
                ticking = true;
            }
        }

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isMinimized = scrollProgress > 0.9;

    // Progressive width: from max-w-7xl (1280px) down to compact
    const expandedWidth = Math.min(1280, viewportWidth - 32);
    const minimizedWidth = 280;
    const currentWidth = expandedWidth - (expandedWidth - minimizedWidth) * scrollProgress;

    // Progressive opacity for side sections
    const sideOpacity = Math.max(0, 1 - scrollProgress * 1.5);

    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
            }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
        >
            {/* Scroll to Top Button */}
            <div
                className="absolute bottom-full left-0 right-0 mb-5 flex justify-center transition-all duration-500 pointer-events-none"
                style={{
                    opacity: scrollProgress > 0.15 ? 1 : 0,
                    transform: `translateY(${scrollProgress > 0.15 ? 0 : 10}px)`
                }}
            >
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="pointer-events-auto bg-black/60 hover:bg-[var(--color-accent)] backdrop-blur-md border border-white/10 text-white p-2.5 rounded-full shadow-lg transition-all duration-300 animate-bounce"
                    title="Back to Top"
                >
                    <ArrowUpIcon />
                </button>
            </div>
            <div
                className="player-bar-box overflow-hidden"
                style={{
                    width: `${currentWidth}px`,
                    transition: "width 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
            >
                <div className="flex items-center gap-4 px-5 md:px-8 py-3">
                    {/* LEFT: Album Art & Song Info — fades out progressively */}
                    <div
                        className="flex items-center gap-4 min-w-0 overflow-hidden"
                        style={{
                            flex: isMinimized ? "0 0 0px" : "1 1 0%",
                            opacity: sideOpacity,
                            maxWidth: isMinimized ? 0 : "none",
                            transition: "opacity 0.4s ease, flex 0.4s ease, max-width 0.4s ease",
                            pointerEvents: isMinimized ? "none" : "auto",
                        }}
                    >
                        <div className="relative group shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={current.cover}
                                alt="Album Art"
                                className="w-12 h-12 rounded-[10px] object-cover border border-white/5 transition-transform duration-500 group-hover:scale-105"
                                onError={(e) => {
                                    // Fallback if image fails to load
                                    (e.target as HTMLImageElement).src = "/nowonair/images/no_cover.png";
                                }}
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[10px]">
                                <div className="flex gap-0.5 items-end h-3">
                                    <div className="w-0.5 bg-white h-full animate-pulse" />
                                    <div className="w-0.5 bg-white h-2/3 animate-pulse" style={{ animationDelay: "0.1s" }} />
                                    <div className="w-0.5 bg-white h-1/2 animate-pulse" style={{ animationDelay: "0.2s" }} />
                                </div>
                            </div>
                        </div>

                        <div className="min-w-0 flex flex-col justify-center">
                            <h2 className="text-sm font-bold text-white truncate leading-tight">
                                {current.title}
                            </h2>
                            <p className="text-[var(--color-accent)] text-[10px] font-semibold uppercase tracking-wider truncate mt-0.5">
                                {current.artist}
                            </p>
                        </div>
                    </div>

                    {/* CENTER: Playback Controls — always visible */}
                    <div className="flex items-center justify-center gap-4 flex-shrink-0">
                        {/* Live Indicator */}
                        <div className="flex items-center gap-2 cursor-default" title="Live">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600" />
                            </span>
                            <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest whitespace-nowrap">
                                On Air
                            </span>
                        </div>

                        {/* Play Button */}
                        <button
                            onClick={togglePlay}
                            className={`w-12 h-12 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 hover:bg-orange-50 transition-all duration-300 shadow-lg shadow-[var(--color-accent)]/20 active:scale-95 ${isPlaying ? "play-pulse" : ""
                                }`}
                        >
                            {isPlaying ? <PauseIcon /> : <PlayIcon />}
                        </button>

                        {/* Mute Button */}
                        <button
                            onClick={toggleMute}
                            className={`p-2 rounded-full transition hover:bg-white/5 ${isMuted ? "text-red-500" : "text-gray-300 hover:text-white"
                                }`}
                            title="Mute/Unmute"
                        >
                            {isMuted ? <MuteIcon /> : <VolumeIcon />}
                        </button>
                    </div>

                    {/* RIGHT: Up Next — fades out progressively */}
                    <div
                        className="hidden md:flex flex-col items-end justify-center text-right min-w-0 overflow-hidden"
                        style={{
                            flex: isMinimized ? "0 0 0px" : "1 1 0%",
                            opacity: sideOpacity,
                            maxWidth: isMinimized ? 0 : "none",
                            transition: "opacity 0.4s ease, flex 0.4s ease, max-width 0.4s ease",
                            pointerEvents: isMinimized ? "none" : "auto",
                        }}
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                <path d="M21 15V6" />
                                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                <path d="M12 12H3" />
                                <path d="M16 6H3" />
                                <path d="M12 18H3" />
                            </svg>
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider whitespace-nowrap">
                                Up Next
                            </span>
                        </div>
                        <span className="text-xs text-gray-300 font-medium truncate max-w-[200px]">
                            {next.artist && next.title ? `${next.artist} — ${next.title}` : "Loading..."}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
