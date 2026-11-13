"use client";

import { useEffect, useRef, useState } from "react";
import { useAudio } from "./AudioProvider";
import { createEqualizer, type EqualizerHandle } from "./equalizer/engine";
import type { Logo3DHandle } from "./equalizer/logo3d";

interface EqualizerBackgroundProps {
    className?: string;
    style?: React.CSSProperties;
    /** Which form to draw: an index into SHAPES (default 0, "Крест"). */
    shape?: number;
    /** How much the figure itself floats and changes shape with the music: 0 = still, 1 = default. */
    float?: number;
    /** Show the 3D TempFM logo in the middle. */
    logo?: boolean;
    /** Which look the 3D logo takes: an index into LOGO_STYLES (default 0, "Хром"). */
    logoStyle?: number;
    /** Preview only: run the built-in demo beat instead of waiting for the stream. */
    demo?: boolean;
}

/**
 * Light equalizer background. Drop-in replacement for ThreeBackground:
 * an ember glow while the radio is paused, driven by the live stream while it plays.
 */
export default function EqualizerBackground({
    className,
    style,
    shape = 0,
    float = 1,
    logo = false,
    logoStyle = 0,
    demo = false,
}: EqualizerBackgroundProps) {
    const logoStyleRef = useRef(logoStyle);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const logoCanvasRef = useRef<HTMLCanvasElement>(null);
    const handleRef = useRef<EqualizerHandle | null>(null);
    const logoRef = useRef<Logo3DHandle | null>(null);
    const visibleRef = useRef(true);
    const [unsupported, setUnsupported] = useState(false);
    const [logoReady, setLogoReady] = useState(false);
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
            visibleRef.current = onScreen && !document.hidden;
            if (visibleRef.current) {
                handle.start();
                logoRef.current?.start();
            } else {
                handle.stop();
                logoRef.current?.stop();
            }
        };
        const intersection = new IntersectionObserver(([entry]) => {
            onScreen = entry.isIntersecting;
            sync();
        });
        intersection.observe(container);
        const resizeObserver = new ResizeObserver(() => {
            handle.resize();
            logoRef.current?.resize();
        });
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
        handle.setFloat(float);
        handle.setAnalyser(analyserRef.current);
        handle.setMode(demo ? "demo" : isPlaying ? "live" : "idle");
    }, [analyserRef, isPlaying, demo, shape, float, unsupported]);

    // The 3D logo: loaded only when asked for, so three.js stays out of the way otherwise.
    useEffect(() => {
        const canvas = logoCanvasRef.current;
        if (!logo || unsupported || !canvas) return;
        let cancelled = false;

        import("./equalizer/logo3d").then(({ createLogo3D }) => {
            if (cancelled) return;
            const handle = createLogo3D(canvas, {
                style: logoStyleRef.current,
                motion: () => handleRef.current?.getMotion() ?? { swell: 0, sway: 0, beat: 0 },
                reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
            });
            if (!handle) return;
            logoRef.current = handle;
            canvas.style.filter = handle.filter();
            if (visibleRef.current) handle.start();
            setLogoReady(true);
        });

        return () => {
            cancelled = true;
            logoRef.current?.destroy();
            logoRef.current = null;
            setLogoReady(false);
        };
    }, [logo, unsupported]);

    // Each look brings its own halo or glow, worn by the canvas as a CSS filter.
    useEffect(() => {
        logoStyleRef.current = logoStyle;
        const handle = logoRef.current;
        const canvas = logoCanvasRef.current;
        if (!handle || !canvas) return;
        handle.setStyle(logoStyle);
        canvas.style.filter = handle.filter();
    }, [logoStyle, logoReady]);

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
            {!unsupported && logo && (
                <canvas
                    ref={logoCanvasRef}
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: "min(92%, 720px)",
                        aspectRatio: "2.4 / 1",
                        transform: "translate(-50%, -50%)",
                        opacity: logoReady ? 1 : 0,
                        transition: "opacity 0.6s ease",
                    }}
                />
            )}
        </div>
    );
}
