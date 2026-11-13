"use client";

import { useState } from "react";
import HomePage from "@/app/page";
import EqualizerBackground from "@/components/EqualizerBackground";
import { SHAPES } from "@/components/equalizer/shader";

/**
 * Hidden preview of the home page with the light equalizer as its background.
 * Pick a form with the buttons; press play in the player to see it follow the live stream.
 */
export default function EqualizerLabPage() {
    const [shape, setShape] = useState(0);
    const [demo, setDemo] = useState(false);

    const pill =
        "shrink-0 rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer";

    return (
        <>
            <HomePage />

            {/* Sized to the hero (below the 4rem nav) so the light centres on the logo.
                Rendered after the page sections: globals.css gives any section that
                follows a div inside <main> an opaque background, which would hide it. */}
            <EqualizerBackground
                style={{ top: "4rem", height: "calc(100vh - 4rem)" }}
                shape={shape}
                demo={demo}
            />

            {/* The logo sits on the brightest part of the picture: give it a dark halo. */}
            <style>{`main img[alt="TempFM Logo"] { filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.55)) drop-shadow(0 4px 22px rgba(0, 0, 0, 0.7)); }`}</style>

            <div className="fixed top-20 left-0 right-0 z-30 flex justify-center px-3 pointer-events-none">
                <div
                    role="group"
                    aria-label="Форма фона"
                    className="pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-black/65 p-1 backdrop-blur-sm"
                >
                    {SHAPES.map((item, index) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setShape(index)}
                            aria-pressed={shape === index}
                            className={`${pill} ${
                                shape === index
                                    ? "bg-[var(--color-accent)] text-white"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                        >
                            {item.name}
                        </button>
                    ))}
                    <span className="mx-1 h-5 w-px shrink-0 bg-white/15" aria-hidden="true" />
                    <button
                        type="button"
                        onClick={() => setDemo((on) => !on)}
                        aria-pressed={demo}
                        className={`${pill} flex items-center gap-2 ${
                            demo ? "bg-white text-black" : "text-white/70 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        Демо-ритм
                    </button>
                </div>
            </div>
        </>
    );
}
