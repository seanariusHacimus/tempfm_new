"use client";

import {
    createContext,
    useContext,
    useRef,
    useState,
    useCallback,
    useEffect,
    type ReactNode,
} from "react";

interface AudioContextValue {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    analyserRef: React.RefObject<AnalyserNode | null>;
    isPlaying: boolean;
    isMuted: boolean;
    streamError: string | null;
    togglePlay: () => void;
    toggleMute: () => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function useAudio() {
    const ctx = useContext(AudioCtx);
    if (!ctx) throw new Error("useAudio must be used within AudioProvider");
    return ctx;
}

const MAX_RETRIES = 5;
const BASE_RETRY_DELAY_MS = 2000;

export default function AudioProvider({ children }: { children: ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const streamUrlRef = useRef<string>("");

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [streamError, setStreamError] = useState<string | null>(null);

    const previousVolumeRef = useRef(1.0);
    const retryCountRef = useRef(0);
    const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isPlayingRef = useRef(false); // mirror for event handlers (avoids stale closures)

    // Keep the ref in sync with state
    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    // ─── Resolve stream URL once on mount ───
    useEffect(() => {
        const isApple = /iphone|ipad|ipod|mac/i.test(navigator.userAgent);
        streamUrlRef.current = isApple
            ? "https://tempradio-live.uz/streamaac"
            : "https://tempradio-live.uz/live";
    }, []);

    // ─── Create a fresh Audio element (no source yet) on mount ───
    useEffect(() => {
        const audio = new Audio();
        audio.crossOrigin = "anonymous";
        audio.preload = "none";
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.removeAttribute("src");
            audio.load();
        };
    }, []);

    // ─── Web Audio API wiring (called once per element lifetime) ───
    const initAudioContext = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Create the AudioContext if it doesn't exist
        if (!audioCtxRef.current) {
            try {
                const AC =
                    window.AudioContext ||
                    (window as unknown as { webkitAudioContext: typeof AudioContext })
                        .webkitAudioContext;
                audioCtxRef.current = new AC();
            } catch {
                return; // fallback: animation will use simulation
            }
        }

        // Create analyser + source only if we haven't for this element
        if (!sourceRef.current) {
            try {
                const analyser = audioCtxRef.current.createAnalyser();
                analyser.fftSize = 512;
                analyserRef.current = analyser;

                const source = audioCtxRef.current.createMediaElementSource(audio);
                source.connect(analyser);
                source.connect(audioCtxRef.current.destination);
                sourceRef.current = source;
            } catch {
                // already connected or not supported
            }
        }

        if (audioCtxRef.current.state === "suspended") {
            audioCtxRef.current.resume();
        }
    }, []);

    // ─── Auto-reconnect logic ───
    const attemptReconnect = useCallback(() => {
        if (retryCountRef.current >= MAX_RETRIES) {
            setStreamError("Oqim uzildi. Qayta tinglash uchun ▶ tugmasini bosing.");
            setIsPlaying(false);
            isPlayingRef.current = false;
            retryCountRef.current = 0;
            return;
        }

        const delay = BASE_RETRY_DELAY_MS * Math.pow(2, retryCountRef.current);
        retryCountRef.current += 1;
        setStreamError("Qayta ulanmoqda...");

        console.warn(
            `[AudioProvider] Reconnect attempt ${retryCountRef.current}/${MAX_RETRIES} in ${delay}ms`
        );

        retryTimerRef.current = setTimeout(() => {
            const audio = audioRef.current;
            if (!audio || !isPlayingRef.current) return;

            // Fresh connection
            audio.src = streamUrlRef.current + "?t=" + Date.now();
            audio
                .play()
                .then(() => {
                    retryCountRef.current = 0;
                    setStreamError(null);
                    setIsPlaying(true);
                    isPlayingRef.current = true;
                })
                .catch(() => {
                    attemptReconnect();
                });
        }, delay);
    }, []);

    // ─── Attach error / stall listeners ───
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleError = () => {
            console.error("[AudioProvider] Audio error event fired");
            if (isPlayingRef.current) {
                attemptReconnect();
            }
        };

        const handleStalled = () => {
            console.warn("[AudioProvider] Audio stalled");
            // Only act if we've been stalled for a while
            // The browser fires 'stalled' frequently on live streams, so we debounce
        };

        const handleEnded = () => {
            console.warn("[AudioProvider] Audio ended (unexpected for live stream)");
            if (isPlayingRef.current) {
                attemptReconnect();
            }
        };

        audio.addEventListener("error", handleError);
        audio.addEventListener("stalled", handleStalled);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("error", handleError);
            audio.removeEventListener("stalled", handleStalled);
            audio.removeEventListener("ended", handleEnded);
        };
    }, [attemptReconnect]);

    // ─── Cleanup retry timer on unmount ───
    useEffect(() => {
        return () => {
            if (retryTimerRef.current) {
                clearTimeout(retryTimerRef.current);
            }
        };
    }, []);

    // ─── Play / Pause ───
    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Cancel any pending retry
        if (retryTimerRef.current) {
            clearTimeout(retryTimerRef.current);
            retryTimerRef.current = null;
        }

        if (isPlaying) {
            // ── PAUSE: destroy the source so no stale buffer remains ──
            audio.pause();
            audio.removeAttribute("src");
            audio.load(); // resets internal state
            setIsPlaying(false);
            isPlayingRef.current = false;
            setStreamError(null);
            retryCountRef.current = 0;
        } else {
            // ── PLAY: assign a fresh URL to force a new HTTP connection ──
            audio.src = streamUrlRef.current + "?t=" + Date.now();
            initAudioContext();
            audio
                .play()
                .then(() => {
                    setIsPlaying(true);
                    isPlayingRef.current = true;
                    setStreamError(null);
                    retryCountRef.current = 0;
                })
                .catch((err) => {
                    console.error("Stream play error:", err);
                    setIsPlaying(false);
                    isPlayingRef.current = false;
                    setStreamError("Oqimni boshlashda xatolik yuz berdi.");
                });
        }
    }, [isPlaying, initAudioContext]);

    // ─── Mute / Unmute ───
    const toggleMute = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isMuted) {
            audio.volume = previousVolumeRef.current;
            setIsMuted(false);
        } else {
            previousVolumeRef.current = audio.volume > 0 ? audio.volume : 1.0;
            audio.volume = 0;
            setIsMuted(true);
        }
    }, [isMuted]);

    return (
        <AudioCtx.Provider
            value={{
                audioRef,
                analyserRef,
                isPlaying,
                isMuted,
                streamError,
                togglePlay,
                toggleMute,
            }}
        >
            {children}
        </AudioCtx.Provider>
    );
}
