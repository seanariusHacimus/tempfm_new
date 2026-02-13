"use client";

import { useTranslation, SUPPORTED_LOCALES, LOCALE_LABELS, type Locale } from "@/i18n";

export default function LanguageSwitcher() {
    const { locale, setLocale } = useTranslation();

    return (
        <div className="flex items-center gap-0.5 bg-[var(--color-bg-card)] rounded-lg p-0.5">
            {SUPPORTED_LOCALES.map((l: Locale) => (
                <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-200 ${locale === l
                            ? "bg-[var(--color-accent)] text-white shadow-sm"
                            : "text-[var(--color-text-secondary)] hover:text-white"
                        }`}
                >
                    {LOCALE_LABELS[l]}
                </button>
            ))}
        </div>
    );
}
