"use client";

import { useState } from "react";
import HomePage from "@/app/page";
import EqualizerBackground from "@/components/EqualizerBackground";

/**
 * Hidden preview of the home page with the ribbon equalizer as its background.
 * Press play in the player to see it follow the live stream.
 */
export default function EqualizerLabPage() {
    const [demo, setDemo] = useState(false);

    return (
        <>
            <HomePage />

            {/* Sized to the hero (below the 4rem nav) so the light centres on the logo.
                Rendered after the page sections: globals.css gives any section that
                follows a div inside <main> an opaque background, which would hide it. */}
            <EqualizerBackground style={{ top: "4rem", height: "calc(100vh - 4rem)" }} demo={demo} />

            <button
                type="button"
                onClick={() => setDemo((on) => !on)}
                aria-pressed={demo}
                className="fixed top-20 right-4 z-30 flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-black/80 cursor-pointer"
            >
                <span
                    className={`h-2 w-2 rounded-full ${demo ? "bg-[var(--color-accent)]" : "bg-white/30"}`}
                />
                Демо-ритм: {demo ? "вкл" : "выкл"}
            </button>
        </>
    );
}
