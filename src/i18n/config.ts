export type Locale = "uz" | "ru";

export const DEFAULT_LOCALE: Locale = "uz";
export const SUPPORTED_LOCALES: Locale[] = ["uz", "ru"];

export const LOCALE_LABELS: Record<Locale, string> = {
    uz: "UZ",
    ru: "RU",
};

const STORAGE_KEY = "tempfm-locale";
const COOKIE_NAME = "tempfm-locale";

/** Read the persisted locale from localStorage (client-side only). */
export function getStoredLocale(): Locale {
    if (typeof window === "undefined") return DEFAULT_LOCALE;
    try {
        const v = localStorage.getItem(STORAGE_KEY);
        if (v && SUPPORTED_LOCALES.includes(v as Locale)) return v as Locale;
    } catch { /* SSR / incognito fallback */ }
    return DEFAULT_LOCALE;
}

/** Persist the locale to both localStorage and a cookie (for potential SSR). */
export function setStoredLocale(locale: Locale): void {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, locale);
        document.cookie = `${COOKIE_NAME}=${locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    } catch { /* ignore */ }
}
