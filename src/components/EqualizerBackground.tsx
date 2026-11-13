"use client";

import { useEffect, useRef, useState } from "react";
import { useAudio } from "./AudioProvider";
import { createEqualizer, type EqualizerHandle } from "./equalizer/engine";

interface EqualizerBackgroundProps {
    className?: string;
    style?: React.CSSProperties;
    /** Which form to draw: an index into SHAPES (default 0, "Крест"). */
    shape?: number;
    /** Preview only: run the built-in demo beat instead of waiting for the stream. */
    demo?: boolean;
}

/**
 * Light equalizer background. Drop-in replacement for ThreeBackground:
 * an ember glow while the radio is paused, driven by the live stream while it plays.
 */
export default function EqualizerBackground({ className, style, shape = 0, demo = false }: EqualizerBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const handleRef = useRef<EqualizerHandle | null>(null);
    const [unsupported, setUnsupported] = useState(false);
    const { analyserRef, isPlaying } = useAudio();

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        const handle = createEqualizer(canvas, {
            reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        });
        if (!handle) {
            setUnsupported(true);
            return;
        }
        handleRef.current = handle;

        // Render only while the canvas is on screen and the tab is visible.
        let onScreen = true;
        const sync = () => {
            if (onScreen && !document.hidden) handle.start();
            else handle.stop();
        };
        const intersection = new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting;
            sync();
        });
        intersection.observe(container);
        const resizeObserver = new ResizeObserver(() => handle.resize());
        resizeObserver.observe(container);
        document.addEventListener("visibilitychange", sync);
        sync();

        return () => {
            intersection.disconnect();
            resizeObserver.disconnect();
            document.removeEventListener("visibilitychange", sync);
            handle.destroy();
            handleRef.current = null;
        };
    }, []);

    useEffect(() => {
        const handle = handleRef.current;
        if (!handle) return;
        handle.setShape(shape);
        handle.setAnalyser(analyserRef.current);
        handle.setMode(demo ? "demo" : isPlaying ? "live" : "idle");
    }, [analyserRef, isPlaying, demo, shape, unsupported]);

    return (
        <div
            ref={containerRef}
            className={className}
            aria-hidden="true"
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                pointerEvents: "none",
                overflow: "hidden",
                // Static glow for browsers without WebGL.
                background: unsupported
                    ? "radial-gradient(ellipse at center, rgba(255, 61, 0, 0.28), rgba(10, 10, 10, 0) 62%), #0a0a0a"
                    : "#0a0a0a",
                ...style,
            }}
        >
            {!unsupported && (
                <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
            )}
        </div>
    );
}
