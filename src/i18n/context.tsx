"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from "react";
import { type Locale, DEFAULT_LOCALE, getStoredLocale, setStoredLocale } from "./config";
import uz from "./locales/uz";
import ru from "./locales/ru";

/* ─── Dictionary type (inferred from the Uzbek source-of-truth) ─── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dictionary = Record<string, any>;

const dictionaries: Record<Locale, Dictionary> = { uz, ru };

/* ─── Context ─── */
interface I18nContextValue {
    locale: Locale;
    setLocale: (l: Locale) => void;
    t: (path: string, args?: Record<string, string | number>) => string;
    dict: Dictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/* ─── Provider ─── */
export function I18nProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
    const [mounted, setMounted] = useState(false);

    /* Hydrate from localStorage once on the client */
    useEffect(() => {
        setLocaleState(getStoredLocale());
        setMounted(true);
    }, []);

    /* Update html lang, persist, and re-render */
    const setLocale = useCallback((l: Locale) => {
        setLocaleState(l);
        setStoredLocale(l);
        document.documentElement.lang = l;
    }, []);

    /* Keep html lang in sync on mount */
    useEffect(() => {
        if (mounted) {
            document.documentElement.lang = locale;
        }
    }, [locale, mounted]);

    const dict = dictionaries[locale];

    /**
     * Resolve a dot-separated path like "nav.home" into a value.
     * Returns the key itself when a path is not found (easy debug).
     * Supports {key} interpolation.
     */
    const t = useCallback(
        (path: string, args?: Record<string, string | number>): string => {
            const parts = path.split(".");
            let current: any = dict;
            for (const part of parts) {
                if (current == null || typeof current !== "object") return path;
                current = current[part];
            }

            let value = typeof current === "string" ? current : path;

            if (args) {
                Object.entries(args).forEach(([key, val]) => {
                    value = value.replace(new RegExp(`{${key}}`, "g"), String(val));
                });
            }

            return value;
        },
        [dict],
    );

    return (
        <I18nContext.Provider value={{ locale, setLocale, t, dict }}>
            {children}
        </I18nContext.Provider>
    );
}

/* ─── Hook ─── */
export function useTranslation() {
    const ctx = useContext(I18nContext);
    if (!ctx)
        throw new Error("useTranslation must be used inside <I18nProvider>");
    return ctx;
}
