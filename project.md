# TempFM 88.4 — Website

## Overview
Official website for **Temp FM 88.4**, a live audiovisual radio station based in Tashkent, Uzbekistan. The station streams live music, news, shows, and interactive programs targeting Uzbekistan's youth audience. Content is in **Uzbek** (latin script) with some Russian elements.

**Live stream URL:** `https://tempradio-live.uz/live`  
**AAC stream (Apple):** `https://tempradio-live.uz/streamaac`

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
│   │   ├── globals.css      # Theme tokens, scrollbar, player styles
│   │   ├── layout.tsx       # Root layout: Nav, Footer, Player, ThreeBackground
│   │   ├── page.tsx         # Home page (hero, shows, stats)
│   │   ├── about/page.tsx   # About page (team, values, stats)
│   │   ├── advertising/page.tsx  # Advertising page (pricing, formats)
│   │   ├── news/page.tsx    # News/articles page
│   │   └── schedule/page.tsx # Weekly schedule (day-by-day)
│   ├── components/
│   │   ├── AnimateIn.tsx     # Scroll-triggered animation wrapper
│   │   ├── AudioProvider.tsx # Audio context provider (play/pause/mute, Web Audio API analyser)
│   │   ├── Footer.tsx       # Site footer
│   │   ├── Navigation.tsx   # Top nav with mobile menu, active link highlight
│   │   ├── RadioPlayer.tsx  # Floating radio player bar (stream controls, now-playing)
│   │   └── ThreeBackground.tsx # Three.js animated liquid surface (reacts to audio)
│   └── hooks/
│       └── useStreamData.ts # Polls external XML for current/next track
├── tempfm_stream_data/
│   └── update_track.js      # Standalone JS: audio player, visualizer, track updater (legacy/external)
├── animation.html           # Standalone animation demo page
├── content.txt              # Raw content in Uzbek (shows, hosts, schedules)
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

- **AudioProvider** — React context wrapping the `<audio>` element and Web Audio API `AnalyserNode`. Exposes `togglePlay`, `toggleMute`, `isPlaying`, `isMuted`, `audioRef`, `analyserRef`.
- **ThreeBackground** — Full-viewport Three.js liquid surface that reacts to audio frequency data (bass/mids). Falls back to simulated animation when no audio is playing.
- **RadioPlayer** — Floating bottom player bar. Shows current/next track (via `useStreamData`), play/pause, mute, volume controls. Responsive (desktop/mobile layouts).
- **Navigation** — Fixed top nav with animated active-link indicator (Framer Motion `layoutId`). Mobile hamburger menu with AnimatePresence.
- **useStreamData** — Hook that polls external XML every 5s, parses XML, returns current/next track info with artwork.

---

## Design System

- **Color scheme:** Dark theme (`#0a0a0a` bg) with orange/red accent (`#ff3d00`)
- **Fonts:** Arial Black (display), Helvetica Neue (body)
- **Cards:** `#111111` bg with `#222222` borders
- **Glass effect:** SVG filter-based distortion for liquid glass look
- **Animations:** Framer Motion for page transitions, scroll reveals, nav highlights

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

---

## Notes

- `tempfm_stream_data/update_track.js` is a standalone (non-React) script with its own audio player logic, visualizer, and track update mechanism — likely used in the old/external version of the player or `animation.html`.
- `advertising/page_old.tsx.bak` is a backup of a previous version of the advertising page.
- The project uses `@/*` path alias mapped to `./src/*`.
- ESLint is configured to allow `<img>` tags in some places (via inline comments).
