"use client";

import { useState } from "react";
import HomePage from "@/app/page";
import { useAudio } from "@/components/AudioProvider";
import EqualizerBackground from "@/components/EqualizerBackground";
import {
    DEFAULT_SETTINGS,
    PALETTES,
    PANELS,
    describeSettings,
    paletteSwatch,
    type Control,
    type EqualizerSettings,
} from "@/components/equalizer/settings";

const OWN_PALETTE = PALETTES.findIndex((p) => p.id === "own");

const CHIP =
    "flex items-center justify-center gap-1.5 rounded-full border px-2 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer";
const CHIP_ON = "border-[var(--color-accent)] bg-[var(--color-accent)] text-white";
const CHIP_OFF = "border-white/15 text-white/70 hover:bg-white/10 hover:text-white";

/**
 * Hidden preview of the home page with the light equalizer as its background.
 * The settings panel changes the form, colours, logo and fine tuning; press
 * play in the player to see it all follow the live stream.
 */
export default function EqualizerLabPage() {
    const [settings, setSettings] = useState<EqualizerSettings>(DEFAULT_SETTINGS);
    const [demo, setDemo] = useState(false);
    const [open, setOpen] = useState(true);
    const [tab, setTab] = useState(PANELS[0].id);
    const [copied, setCopied] = useState<string | null>(null);
    const { isPlaying } = useAudio();
    // The demo rhythm shows the on-air look without sound: logo in the middle, no hero text.
    const onAirLook = isPlaying || demo;

    const set = (key: keyof EqualizerSettings, value: number | boolean) =>
        setSettings((current) => ({
            ...current,
            [key]: value,
            // Moving the hue slider means "use my own hue".
            ...(key === "hue" ? { palette: OWN_PALETTE } : {}),
        }));

    const copy = async () => {
        const text = describeSettings(settings);
        try {
            await navigator.clipboard.writeText(text);
            setCopied("Скопировано");
        } catch {
            setCopied(text); // clipboard unavailable: show the line to copy by hand
        }
    };

    const swatch = (value: string | undefined) => {
        if (!value) return null;
        const background =
            value === "own" || value === "accent"
                ? paletteSwatch(value === "own" ? OWN_PALETTE : settings.palette, settings.hue)
                : value;
        return <span className="h-2.5 w-2.5 shrink-0 rounded-full border border-white/30" style={{ background }} />;
    };

    const draw = (control: Control) => {
        const value = settings[control.key];
        if (control.kind === "choice") {
            return (
                <div key={control.key} role="group" aria-label={control.label} className="grid grid-cols-3 gap-1.5">
                    {control.options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => set(control.key, option.value)}
                            aria-pressed={value === option.value}
                            className={`${CHIP} ${value === option.value ? CHIP_ON : CHIP_OFF}`}
                        >
                            {swatch(option.swatch)}
                            {option.name}
                        </button>
                    ))}
                </div>
            );
        }
        if (control.kind === "range") {
            const shown = control.unit === "%" ? `${Math.round(Number(value) * 100)}%` : `${Math.round(Number(value))}${control.unit ?? ""}`;
            return (
                <label key={control.key} className="flex items-center gap-3 text-xs text-white/70">
                    <span className="w-32 shrink-0">{control.label}</span>
                    <input
                        type="range"
                        min={control.min}
                        max={control.max}
                        step={control.step}
                        value={Number(value)}
                        onChange={(event) => set(control.key, Number(event.target.value))}
                        className="min-w-0 flex-1 accent-[var(--color-accent)]"
                    />
                    <span className="w-10 shrink-0 text-right tabular-nums text-white">{shown}</span>
                </label>
            );
        }
        return (
            <button
                key={control.key}
                type="button"
                onClick={() => set(control.key, !value)}
                aria-pressed={Boolean(value)}
                className={`${CHIP} ${value ? CHIP_ON : CHIP_OFF}`}
            >
                {control.label}: {value ? "да" : "нет"}
            </button>
        );
    };

    return (
        <>
            <HomePage />

            {/* Sized to the hero (below the 4rem nav) so the light centres on the logo.
                Rendered after the page sections: globals.css gives any section that
                follows a div inside <main> an opaque background, which would hide it. */}
            <EqualizerBackground
                style={{ top: "4rem", height: "calc(100vh - 4rem)" }}
                settings={settings}
                logo={onAirLook}
                demo={demo}
            />

            {/* The logo in the background replaces the home page's flat one. With the
                demo rhythm on but the radio paused, the hero text steps aside as well. */}
            <style>{`
                main img[alt="TempFM Logo"] { visibility: hidden; }
                ${demo && !isPlaying ? "main > section:first-of-type > div { visibility: hidden; }" : ""}
            `}</style>

            <div className="fixed right-3 top-20 z-30 flex gap-1 rounded-full border border-white/15 bg-black/70 p-1 backdrop-blur-sm">
                <button
                    type="button"
                    onClick={() => setDemo((on) => !on)}
                    aria-pressed={demo}
                    className={`${CHIP} border-transparent px-3.5 ${demo ? "bg-white text-black" : "text-white/70 hover:bg-white/10"}`}
                >
                    Демо-ритм
                </button>
                <button
                    type="button"
                    onClick={() => setOpen((on) => !on)}
                    aria-expanded={open}
                    className={`${CHIP} border-transparent px-3.5 text-white/70 hover:bg-white/10`}
                >
                    {open ? "Скрыть настройки" : "Настройки"}
                </button>
            </div>

            {/* On a phone the panel sits at the bottom, over the player, so the logo
                in the middle stays in view while it is being adjusted. */}
            {open && (
                <div className="fixed inset-x-2 bottom-2 z-[60] flex max-h-[38vh] flex-col gap-3 overflow-y-auto rounded-2xl border border-white/15 bg-black/80 p-3 backdrop-blur-md sm:inset-x-auto sm:bottom-auto sm:right-3 sm:top-[8.5rem] sm:z-30 sm:max-h-[calc(100vh-15.5rem)] sm:w-[360px]">
                    <div role="tablist" aria-label="Что настроить" className="grid grid-cols-4 gap-1 rounded-full border border-white/15 p-1">
                        {PANELS.map((panel) => (
                            <button
                                key={panel.id}
                                type="button"
                                role="tab"
                                aria-selected={tab === panel.id}
                                onClick={() => setTab(panel.id)}
                                className={`rounded-full px-1 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                                    tab === panel.id ? "bg-white/15 text-white" : "text-white/60 hover:text-white"
                                }`}
                            >
                                {panel.name}
                            </button>
                        ))}
                    </div>

                    <div role="tabpanel" className="flex flex-col gap-3">
                        {PANELS.find((panel) => panel.id === tab)?.controls.map(draw)}
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 border-t border-white/10 pt-3">
                        <button
                            type="button"
                            onClick={() => {
                                setSettings(DEFAULT_SETTINGS);
                                setCopied(null);
                            }}
                            className={`${CHIP} ${CHIP_OFF}`}
                        >
                            Сбросить
                        </button>
                        <button type="button" onClick={copy} className={`${CHIP} ${CHIP_OFF}`}>
                            Скопировать настройки
                        </button>
                        {copied && (
                            <p role="status" className="col-span-2 text-xs leading-relaxed text-white/70">
                                {copied}
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
