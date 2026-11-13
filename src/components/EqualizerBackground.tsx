"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAudio } from "./AudioProvider";
import { createEqualizer, type EqualizerHandle } from "./equalizer/engine";
import type { Logo3DHandle } from "./equalizer/logo3d";
import { DEFAULT_SETTINGS, paletteColors, type EqualizerSettings } from "./equalizer/settings";

interface EqualizerBackgroundProps {
    className?: string;
    style?: React.CSSProperties;
    /** Form, colours, logo and fine tuning; anything left out takes its default. */
    settings?: Partial<EqualizerSettings>;
    /** Whether the logo may be on screen right now (the home page shows it only on air). */
    logo?: boolean;
    /** Preview only: run the built-in demo beat instead of waiting for the stream. */
    demo?: boolean;
}

/**
 * Light equalizer background. Drop-in replacement for ThreeBackground:
 * an ember glow while the radio is paused, driven by the live stream while it plays.
 */
export default function EqualizerBackground({ className, style, settings, logo = false, demo = false }: EqualizerBackgroundProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const logoCanvasRef = useRef<HTMLCanvasElement>(null);
    const handleRef = useRef<EqualizerHandle | null>(null);
    const logoRef = useRef<Logo3DHandle | null>(null);
    const visibleRef = useRef(true);
    const [unsupported, setUnsupported] = useState(false);
    const [logoReady, setLogoReady] = useState(false);
    const { analyserRef, isPlaying } = useAudio();

    // A stable object while the values stay the same, whatever object the page passes in.
    const key = JSON.stringify(settings ?? {});
    const s = useMemo<EqualizerSettings>(() => ({ ...DEFAULT_SETTINGS, ...JSON.parse(key) }), [key]);
    const showLogo = logo && s.logo >= 0 && !unsupported;
    const settingsRef = useRef(s);

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

    // Where the light comes from: paused, the demo beat, or the live stream.
    useEffect(() => {
        const handle = handleRef.current;
        if (!handle) return;
        handle.setAnalyser(analyserRef.current);
        handle.setMode(demo ? "demo" : isPlaying ? "live" : "idle");
    }, [analyserRef, isPlaying, demo, unsupported]);

    // Settings → background.
    useEffect(() => {
        settingsRef.current = s;
        const handle = handleRef.current;
        if (!handle) return;
        handle.setShape(s.shape);
        handle.setFloat(s.float);
        handle.setRamp(paletteColors(s).ramp);
        handle.tune({ brightness: s.brightness, speed: s.speed, react: s.react, core: s.core, dust: s.dust ? 1 : 0 });
    }, [s, unsupported]);

    // The logo: its module (and three.js with it) is loaded only when a logo is shown.
    useEffect(() => {
        const canvas = logoCanvasRef.current;
        if (!showLogo || !canvas) return;
        let cancelled = false;

        import("./equalizer/logo3d").then(({ createLogo3D }) => {
            if (cancelled) return;
            const handle = createLogo3D(canvas, {
                style: settingsRef.current.logo,
                motion: () => handleRef.current?.getMotion() ?? { swell: 0, sway: 0, beat: 0 },
                reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
            });
            if (!handle) return;
            logoRef.current = handle;
            if (visibleRef.current) handle.start();
            setLogoReady(true);
        });

        return () => {
            cancelled = true;
            logoRef.current?.destroy();
            logoRef.current = null;
            setLogoReady(false);
        };
    }, [showLogo]);

    // Settings → logo. Each look brings its own halo or glow, worn by the canvas as a CSS filter.
    useEffect(() => {
        const handle = logoRef.current;
        const canvas = logoCanvasRef.current;
        if (!handle || !canvas || s.logo < 0) return;
        const [r, g, b] = paletteColors(s).accent;
        handle.setAccent(r, g, b);
        handle.setTint(s.logoTint);
        handle.setStyle(s.logo);
        handle.setMotion(s.logoMotion);
        handle.resize(); // the canvas may have just changed size
        canvas.style.filter = handle.filter();
    }, [s, logoReady]);

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
            {showLogo && (
                <canvas
                    ref={logoCanvasRef}
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        // Never wider than the screen, however large the logo is set.
                        width: `min(100%, calc(min(92%, 720px) * ${s.logoSize}))`,
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
