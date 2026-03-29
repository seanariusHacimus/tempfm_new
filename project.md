# TempFM 88.4 — Website

## Overview
Official website for **Temp FM 88.4**, a live audiovisual radio station based in Toshkent, Uzbekistan. The station streams live music, news, shows, and interactive programs targeting Uzbekistan's youth audience. Content is fully in **Uzbek** (latin script), populated from `content.txt`.

**Live stream URL:** `https://tempradio-live.uz/live`  
**AAC stream (Apple):** `https://tempradio-live.uz/streamaactest`

---

## Tech Stack

| Layer        | Technology                          |
|-------------|--------------------------------------|
| Framework    | **Next.js 16** (App Router)         |
| UI Library   | **React 19**                        |
| Language     | **TypeScript**                      |
| Styling      | **Tailwind CSS v4** (PostCSS)       |
| Animations   | **Framer Motion 12**                |
| 3D Graphics  | **Three.js** (liquid surface bg)    |
| Dev server   | `npm run dev`                       |

---

## Project Structure

```
tempfm_website/
├── public/
│   ├── favicon.png
│   ├── logo.svg
│   └── nowonair/            # Stream metadata (XML + artwork)
│       ├── nowplaying.xml
│       └── images/
├── src/
│   ├── app/
│   │   ├── actions.ts       # Server Actions (XML fetcher to bypass CORS)
│   │   ├── fonts/           # Font files
│   │   │   └── petrov_sans/ # PetrovSans TTF files
│   │   ├── globals.css      # Theme tokens, scrollbar, player styles
│   │   ├── layout.tsx       # Root layout: I18nProvider, AudioProvider, Nav, Footer, Player, Background
│   │   ├── page.tsx         # Home page (hero, shows, stats)
│   │   ├── about/page.tsx   # About page (team, values, stats)
│   │   ├── advertising/page.tsx  # Advertising page (pricing, formats)
│   │   ├── news/page.tsx    # News/articles page
│   │   └── schedule/page.tsx # Weekly schedule (day-by-day)
│   ├── components/
│   │   ├── AnimateIn.tsx     # Scroll-triggered animation wrapper
│   │   ├── AudioProvider.tsx # Audio context provider (play/pause/mute, Web Audio API analyser)
│   │   ├── Footer.tsx       # Site footer
│   │   ├── HomeBackground.tsx # Conditionally renders ThreeBackground on home page only
│   │   ├── LanguageSwitcher.tsx # UZ/RU language toggle
│   │   ├── Navigation.tsx   # Top nav with full-page mobile overlay, staggered animations, active link indicator
│   │   ├── PageHeader.tsx   # Standardized page header (title, accent, description)
│   │   ├── RadioPlayer.tsx  # Floating radio player bar (stream controls, now-playing)
│   │   └── ThreeBackground.tsx # Three.js animated liquid surface (reacts to audio)
│   ├── hooks/
│   │   └── useStreamData.ts # Polls external XML for current/next track
│   └── i18n/
│       ├── config.ts        # Locale configuration and storage
│       ├── context.tsx      # I18nProvider and useTranslation hook
│       ├── index.ts         # Public exports
│       └── locales/
│           ├── uz.ts        # Uzbek translations (source of truth)
│           └── ru.ts        # Russian translations
├── tempfm_stream_data/
│   └── update_track.js      # Standalone JS: audio player, visualizer, track updater (legacy/external)
├── animation.html           # Standalone animation demo page
├── content.txt              # Raw content in Uzbek (shows, hosts, schedules)
├── content_ru.txt           # Raw content in Russian
├── package.json
├── tsconfig.json
├── next.config.ts
└── postcss.config.mjs
```

---

## Pages

| Route          | File                        | Description                                                   |
|----------------|------------------------------|---------------------------------------------------------------|
| `/`            | `src/app/page.tsx`           | Hero section, featured shows carousel, stats, CTA             |
| `/about`       | `src/app/about/page.tsx`     | Station values, team bios, social links                       |
| `/advertising` | `src/app/advertising/page.tsx`| Ad formats, pricing tiers, benefits, contact CTA              |
| `/news`        | `src/app/news/page.tsx`      | Featured article + news grid with categories                  |
| `/schedule`    | `src/app/schedule/page.tsx`  | 7-day schedule with day tabs, show cards with genres           |

---

## Key Components

- **I18nProvider** — React context providing internationalization support. Manages locale state (UZ/RU), persists to localStorage, provides `t()` translation function and `dict` object. All pages and components use `useTranslation()` hook to access translations.
- **AudioProvider** — React context wrapping the `<audio>` element and Web Audio API `AnalyserNode`. Exposes `togglePlay`, `toggleMute`, `isPlaying`, `isMuted`, `streamError`, `audioRef`, `analyserRef`. Destroys and recreates the audio source on every play/pause to ensure fresh live stream (no cached audio). Includes automatic reconnection with exponential backoff (up to 5 retries).
- **ThreeBackground** — Full-viewport Three.js liquid surface that reacts to audio frequency data (bass/mids). Falls back to simulated animation when no audio is playing.
- **RadioPlayer** — Floating bottom player bar. Shows current/next track (via `useStreamData`), play/pause, mute, volume controls. Responsive (desktop/mobile layouts). Uses a gray skeleton box for missing/loading artwork.
- **Navigation** — Fixed top nav with animated active-link indicator (Framer Motion `layoutId`). Features a full-page mobile overlay (`z-40`) with staggered link animations, body scroll lock, and Escape key dismiss. Includes `overflow-x-hidden` to prevent horizontal overflow on mobile. Includes `LanguageSwitcher` for UZ/RU toggle.
- **useStreamData** — Hook that polls external XML every 5s, parses XML, returns current/next track info. Falls back to "TempFM 88.4" for missing titles and empty string for missing artists.

---

## Design System

- **Color scheme:** Dark theme (`#0a0a0a` bg) with orange/red accent (`#ff3d00`)
- **Fonts:** PetrovSans TTF (display font, weights: 400/700/900) with custom letter-spacing. Body text uses system fonts via CSS.
- **Cards:** `#111111` bg with `#222222` borders
- **Glass effect:** SVG filter-based distortion for liquid glass look
- **Animations:** Framer Motion for page transitions, scroll reveals, nav highlights
- **Internationalization:** Full UZ/RU support via custom i18n context system

---

## Navigation Labels (Uzbek)

| Link          | Label            |
|---------------|-----------------|
| Home          | Bosh sahifa      |
| Schedule      | Dasturlar        |
| News          | Yangiliklar      |
| Advertising   | Reklama          |
| About         | Biz haqimizda    |
| Live Button   | Jonli Efir       |

---

## Stream Data Flow

1. `RadioPlayer` calls `useStreamData` hook
2. Hook calls `fetchStreamDataXml` Server Action to fetch XML (server-side)
3. Hook parses XML and fetches artwork directly from external URL
3. `RadioPlayer` displays current/next track from the parsed data
4. `ThreeBackground` reacts to audio frequencies via `AudioProvider`'s analyser node

- Added News slots to Monday-Friday schedule (Uzbek 11:00, Russian 14:00) for both locales.
- Hidden non-functional "Read More" and "Read Details" elements on the News page.
- Standardized female team roles in Russian to "Радиоведущая" for consistency.

---

## Notes

- `tempfm_stream_data/update_track.js` is a standalone (non-React) script with its own audio player logic, visualizer, and track update mechanism — likely used in the old/external version of the player or `animation.html`.
- `advertising/page_old.tsx.bak` is a backup of a previous version of the advertising page.
- The project uses `@/*` path alias mapped to `./src/*`.
- ESLint is configured to allow `<img>` tags in some places (via inline comments).

---

## Last Updated
**2026-02-13** (I18n, schedule updates, News page UI cleanup, role standardization)
