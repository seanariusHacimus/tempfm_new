"use client";

import { useState } from "react";
import HomePage from "@/app/page";
import { useAudio } from "@/components/AudioProvider";
import EqualizerBackground from "@/components/EqualizerBackground";
import { LOGO_STYLES } from "@/components/equalizer/logoStyles";
import { SHAPES } from "@/components/equalizer/shader";

/** How strongly the figure floats and changes shape with the music; the button cycles through these. */
const FLOAT_LEVELS = [
    { name: "слабо", amount: 0.5 },
    { name: "средне", amount: 1 },
    { name: "сильно", amount: 1.7 },
];

const PILL =
    "shrink-0 rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer";
const PILL_ON = "bg-[var(--color-accent)] text-white";
const PILL_OFF = "text-white/70 hover:bg-white/10 hover:text-white";
const BAR =
    "pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/15 bg-black/65 p-1 backdrop-blur-sm";

/**
 * Hidden preview of the home page with the light equalizer as its background.
 * Pick a form, how much it deforms and a logo with the buttons; press play in
 * the player to see it all follow the live stream.
 */
export default function EqualizerLabPage() {
    const [shape, setShape] = useState(0);
    const [float, setFloat] = useState(1);
    const [logoStyle, setLogoStyle] = useState(0);
    const [demo, setDemo] = useState(false);
    const { isPlaying } = useAudio();
    // The demo rhythm shows the on-air look without sound: logo in the middle, no hero text.
    const onAirLook = isPlaying || demo;

    return (
        <>
            <HomePage />

            {/* Sized to the hero (below the 4rem nav) so the light centres on the logo.
                Rendered after the page sections: globals.css gives any section that
                follows a div inside <main> an opaque background, which would hide it. */}
            <EqualizerBackground
                style={{ top: "4rem", height: "calc(100vh - 4rem)" }}
                shape={shape}
                float={FLOAT_LEVELS[float].amount}
                logo={onAirLook}
                logoStyle={logoStyle}
                demo={demo}
            />

            {/* The 3D logo in the background replaces the home page's flat one. With the
                demo rhythm on but the radio paused, the hero text steps aside as well. */}
            <style>{`
                main img[alt="TempFM Logo"] { visibility: hidden; }
                ${demo && !isPlaying ? "main > section:first-of-type > div { visibility: hidden; }" : ""}
            `}</style>

            <div className="fixed top-20 left-0 right-0 z-30 flex flex-col items-center gap-2 px-3 pointer-events-none">
                <div role="group" aria-label="Форма фона" className={BAR}>
                    {SHAPES.map((item, index) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setShape(index)}
                            aria-pressed={shape === index}
                            className={`${PILL} ${shape === index ? PILL_ON : PILL_OFF}`}
                        >
                            {item.name}
                        </button>
                    ))}
                    <span className="mx-1 h-5 w-px shrink-0 bg-white/15" aria-hidden="true" />
                    <button
                        type="button"
                        onClick={() => setFloat((level) => (level + 1) % FLOAT_LEVELS.length)}
                        className={`${PILL} ${PILL_OFF}`}
                    >
                        Деформация: {FLOAT_LEVELS[float].name}
                    </button>
                    <button
                        type="button"
                        onClick={() => setDemo((on) => !on)}
                        aria-pressed={demo}
                        className={`${PILL} ${demo ? "bg-white text-black" : PILL_OFF}`}
                    >
                        Демо-ритм
                    </button>
                </div>

                <div role="group" aria-label="3D-логотип" className={BAR}>
                    <span className="shrink-0 pl-3 pr-1 text-xs font-bold uppercase tracking-wider text-white/45">
                        Лого
                    </span>
                    {LOGO_STYLES.map((item, index) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setLogoStyle(index)}
                            aria-pressed={logoStyle === index}
                            className={`${PILL} ${logoStyle === index ? PILL_ON : PILL_OFF}`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
