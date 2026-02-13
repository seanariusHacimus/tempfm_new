# Memory — TempFM 88.4 Website

## Project Context
- **Type:** Radio station website for Temp FM 88.4 (Toshkent, Uzbekistan)
- **Language:** Fully in Uzbek (latin script)
- **Status:** Active development, dev server running

---

## Recent Work & Known Issues

### Stream Data Integration (Feb 12, 2026)
- **Rewrote `useStreamData.ts`** — fixed stale closure bug (now uses `useRef` for change detection), added cover image preloading with 3s timeout, extracted ALBUM/DURATION/GENRE from XML, added next-track artwork via `artwork_next.png`.
- **Updated `AudioProvider.tsx`** — added Apple device detection (`/streamaac` for Apple, `/live` for others), ported from legacy `update_track.js`.
- **Enriched `RadioPlayer.tsx`** — now shows album name, track duration, genre badge, and next-track cover thumbnail.
- Build verified ✅.
- Switched to `https://test.tempfm.uz` for XML and artwork.
- **CORS Fix:** Implemented Server Action `fetchStreamDataXml` to fetch XML server-side.

### Streaming Robustness Improvements (Feb 12, 2026)
- **Fixed cached audio on resume** — `AudioProvider` now destroys the audio source on pause (`removeAttribute('src')` + `load()`) and assigns a fresh URL with cache-busting `?t=` parameter on play. This forces the browser to open a new HTTP connection, eliminating stale buffered audio.
- **Auto-reconnection** — Added exponential backoff retry logic (5 retries: 2s → 4s → 8s → 16s → 32s) for `error` and `ended` events on the audio element.
- **`streamError` state** — `AudioProvider` now exposes a `streamError` string. `RadioPlayer` shows an amber "Qayta ulanmoqda..." indicator when reconnecting.
- Build verified ✅.

### Full Content Population (Feb 12, 2026)
- **Updated All Pages:** Fully populated Home, About, News, and Schedule pages using `content.txt`.
- **Real Team Members:** Replaced placeholder team with 10 actual hosts and anchors (Otabek Tojiboyev, Go'zal Karimova, etc.).
- **Real Schedule:** Implemented the full weekly schedule including news segments and specific program details.
- **Uzbek Translation:** Cleaned up remaining English UI text (aria-labels, headers, button text) to ensure a 100% Uzbek version.

### Advertising Page (`/advertising`)
- Had **recurring JSX syntax errors** (unclosed tags) in earlier sessions (Feb 11-12, 2026).
- A backup exists at `src/app/advertising/page_old.tsx.bak`.
- **Current status:** Builds successfully as of latest build.

### UI Polishing (Feb 12, 2026)
- **Standardized Headers:** Created `PageHeader.tsx` and applied to `about`, `news`, `schedule`, `advertising`.
- **Fixed Z-Index:** Set `ThreeBackground` to `z-[-1]` to prevent it from blocking interactions.
- **Centered Logo:** Removed padding offset in Hero section for perfect centering.
- **RadioPlayer:** Responsive improvements and better mobile layout.
- **Custom Font:** Integrated `PetrovSans` (Display) and `Roboto` (Body). Standardized all titles and buttons to use the brand font with improved letter-spacing.
- **Standardized Headers:** Created reusable `PageHeader` component for consistent spacing across subpages.
- **Full-Page Mobile Menu (Feb 12-13, 2026):** Redesigned the mobile menu from a dropdown to a full-viewport overlay. Added staggered Framer Motion animations for links, body scroll lock, and Escape key support.
- **Burger Icon Fix:** Refactored the hamburger toggle with absolute positioning to ensure a perfect "X" transformation without any skew.
- **Horizontal Scroll Fixes (Feb 13, 2026):**
  - **Global Fix:** Added `overflow-x: hidden` to `html` in `globals.css` to prevent any horizontal scroll globally.
  - **Section Containment:** Added `overflow-hidden` to multiple sections across `page.tsx`, `about/page.tsx`, and `advertising/page.tsx` that use directional animations (`AnimateIn`) or oversized text.
  - **Navigation Fix:** Added `overflow-x-hidden` to the `<nav>` element in `Navigation.tsx` to prevent header content from causing overflow on mobile.

### Internationalization System (Feb 13, 2026)
- **Root Layout Created:** Created `src/app/layout.tsx` to wrap the entire application with `I18nProvider` and `AudioProvider` contexts. This was missing and causing runtime errors.
- **I18n System:** Implemented custom internationalization system with:
  - `I18nProvider` context for managing locale state (UZ/RU)
  - `useTranslation()` hook for accessing translations in components
  - Locale persistence to localStorage
  - Translation dictionaries in `src/i18n/locales/` (uz.ts, ru.ts)
  - `LanguageSwitcher` component in navigation
- **Font Configuration:** Fixed font paths to use PetrovSans TTF files from `src/app/fonts/petrov_sans/` directory (weights: 400, 700, 900). Removed Roboto font configuration (using system fonts for body text).
- **Build Status:** Production build verified ✅ — all 7 pages compile successfully with no errors.
- Verified with production build ✅.

### News Page & Schedule Updates (Feb 13, 2026)
- **News UI Cleanup:** Commented out "Read More" and "Read Details" spans as they are currently non-functional. Removed `cursor-pointer` from news articles to accurately reflect lack of interactivity.
- **Weekly Schedule Update:** Added News slots to Mon-Fri schedule for both locales:
  - **11:00 — 12:00:** Yangiliklar (O'zb) / Новости (Узб)
  - **14:00 — 15:00:** Yangiliklar (Rus) / Новости (Рус)
- **Role Standardization (RU):** Updated female host roles to "Радиоведущая" (instead of "Радиоведущий" or "Ведущая") for gender accuracy and consistency.

---

## Architecture Decisions

1. **Audio via Web Audio API** — `AudioProvider` creates a single `AudioContext` with `AnalyserNode` connected to the live stream `<audio>` element. On pause the source is destroyed; on play a fresh URL with cache-busting param is assigned to force a new connection. Auto-reconnects with exponential backoff on stream errors.
2. **Three.js background** — A full-viewport animated liquid surface uses the audio analyser data for bass/mid reactive animation. Falls back to gentle simulated motion when idle.
3. **Stream data polling** — `useStreamData` hook polls via Server Action (`fetchStreamDataXml`) to bypass CORS for XML. Images are fetched directly from external URL.
4. **Apple device detection** — `AudioProvider` detects Apple devices via user-agent and uses AAC stream (`/streamaac`), others get `/live`.
5. **Tailwind CSS v4** — Uses `@theme` directive for CSS custom properties. No `tailwind.config.js` file.
6. **SVG distortion filter** — Defined in `layout.tsx` for liquid glass visual effect.

---

## File Locations to Remember

| What                        | Path                                           |
|-----------------------------|------------------------------------------------|
| Theme / CSS variables       | `src/app/globals.css`                          |
| Root layout                 | `src/app/layout.tsx`                           |
| I18n context provider       | `src/i18n/context.tsx`                         |
| Uzbek translations          | `src/i18n/locales/uz.ts`                       |
| Russian translations        | `src/i18n/locales/ru.ts`                       |
| Audio context (stream)      | `src/components/AudioProvider.tsx`             |
| Radio player UI             | `src/components/RadioPlayer.tsx`               |
| 3D background               | `src/components/ThreeBackground.tsx`           |
| Stream data hook            | `src/hooks/useStreamData.ts`                   |
| Now-playing XML             | `https://test.tempfm.uz/nowonair/nowplaying.xml` |
| Legacy standalone player    | `tempfm_stream_data/update_track.js`           |
| Raw content (Uzbek)         | `content.txt`                                  |
| Raw content (Russian)       | `content_ru.txt`                               |

---

## Content / Shows (Key Hosts)

- **Otabek Tojiboyev** — "Wake up shou" (Mon-Fri 8:00-10:00)
- **Jasmin Isroilova** — "Kunduzgi ritm" (Mon-Fri 12:00-14:00)
- **Roksana Abidova** — "Oqshom tempida" (Mon-Fri 18:00-20:00)
- **Toni Lorenso** — "Oqshom jo'shqin ritmda" (Mon-Fri 20:00-21:00)
- **Danata Davronova** — "Korotkiye vstrechi" (interviews)
- **Kamilla Mo'minova** — "Prosto o vajnom" (marketing/life topics)
- **Mixail Subeyev** — Morning show (Tue/Thu 10:00-12:00)
- **Violetta Tadjibayeva** — Culture/history (Mon/Wed/Fri 10:00-12:00)
- **Go'zal Karimova** — News anchor (Uzbek)
- **Anna Axperjan'yans** — News anchor (Russian)

---

## Dev Commands

```bash
npm run dev    # Start dev server (Next.js)
npm run build  # Production build
npm run start  # Start production server
npm run lint   # ESLint
```

---

## Important URLs

- Live stream: `https://tempradio-live.uz/live`
- AAC stream (Apple): `https://tempradio-live.uz/streamaac`
- Now playing XML: `https://test.tempfm.uz/nowonair/nowplaying.xml`

---

## Last Updated
**2026-02-13** (I18n, schedule updates, News page UI cleanup, role standardization)
