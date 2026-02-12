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
    togglePlay: () => void;
    toggleMute: () => void;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

export function useAudio() {
    const ctx = useContext(AudioCtx);
    if (!ctx) throw new Error("useAudio must be used within AudioProvider");
    return ctx;
}

export default function AudioProvider({ children }: { children: ReactNode }) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const previousVolumeRef = useRef(1.0);

    const initAudioContext = useCallback(() => {
        if (!audioCtxRef.current && audioRef.current) {
            try {
                const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
                audioCtxRef.current = new AC();
                const analyser = audioCtxRef.current.createAnalyser();
                analyser.fftSize = 512;
                analyserRef.current = analyser;

                const source = audioCtxRef.current.createMediaElementSource(audioRef.current);
                source.connect(analyser);
                source.connect(audioCtxRef.current.destination);
                sourceRef.current = source;
            } catch {
                // Fallback: animation will use simulation
            }
        }
        if (audioCtxRef.current?.state === "suspended") {
            audioCtxRef.current.resume();
        }
    }, []);

    const togglePlay = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            initAudioContext();
            audio
                .play()
                .then(() => setIsPlaying(true))
                .catch((err) => {
                    console.error("Stream error:", err);
                    setIsPlaying(false);
                });
        }
    }, [isPlaying, initAudioContext]);

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

    useEffect(() => {
        // Create the audio element on mount
        const audio = new Audio();
        audio.src = "https://tempradio-live.uz/live";
        audio.crossOrigin = "anonymous";
        audio.preload = "none";
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, []);

    return (
        <AudioCtx.Provider
            value={{ audioRef, analyserRef, isPlaying, isMuted, togglePlay, toggleMute }}
        >
            {children}
        </AudioCtx.Provider>
    );
}
