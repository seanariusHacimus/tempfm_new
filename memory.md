# Memory — TempFM 88.4 Website

## Project Context
- **Type:** Radio station website for Temp FM 88.4 (Tashkent, Uzbekistan)
- **Language:** Uzbek (latin script), some Russian elements
- **Status:** Active development, dev server running

---

## Recent Work & Known Issues

### Stream Data Integration (Feb 12, 2026)
- **Rewrote `useStreamData.ts`** — fixed stale closure bug (now uses `useRef` for change detection), added cover image preloading with 3s timeout, extracted ALBUM/DURATION/GENRE from XML, added next-track artwork via `artwork_next.png`.
- **Updated `AudioProvider.tsx`** — added Apple device detection (`/streamaac` for Apple, `/live` for others), ported from legacy `update_track.js`.
- **Enriched `RadioPlayer.tsx`** — now shows album name, track duration, genre badge, and next-track cover thumbnail.
- Build verified ✅.
- **Updated Source:** Switched to `https://test.tempfm.uz` for XML and artwork.
- **CORS Fix:** Implemented Server Action `fetchStreamDataXml` to fetch XML server-side.

### Advertising Page (`/advertising`)
- Had **recurring JSX syntax errors** (unclosed tags) in earlier sessions (Feb 11-12, 2026).
- A backup exists at `src/app/advertising/page_old.tsx.bak`.
- **Current status:** Builds successfully as of latest build.

---

## Architecture Decisions

1. **Audio via Web Audio API** — `AudioProvider` creates a single `AudioContext` with `AnalyserNode` connected to the live stream `<audio>` element. This feeds frequency data to `ThreeBackground`.
2. **Three.js background** — A full-viewport animated liquid surface uses the audio analyser data for bass/mid reactive animation. Falls back to gentle simulated motion when idle.
3. **Stream data polling** — `useStreamData` hook polls via Server Action (`fetchStreamDataXml`) to bypass CORS for XML. Images are fetched directly from external URL.
4. **Apple device detection** — `update_track.js` handles Apple vs non-Apple stream URLs (`/live` vs `/streamaac`). The React `AudioProvider` currently only uses the `/live` URL.
5. **Tailwind CSS v4** — Uses `@theme` directive for CSS custom properties. No `tailwind.config.js` file.
6. **SVG distortion filter** — Defined in `layout.tsx` for liquid glass visual effect.

---

## File Locations to Remember

| What                        | Path                                           |
|-----------------------------|-------------------------------------------------|
| Theme / CSS variables       | `src/app/globals.css`                           |
| Root layout                 | `src/app/layout.tsx`                            |
| Audio context (stream)      | `src/components/AudioProvider.tsx`               |
| Radio player UI             | `src/components/RadioPlayer.tsx`                 |
| 3D background               | `src/components/ThreeBackground.tsx`             |
| Stream data hook            | `src/hooks/useStreamData.ts`                     |
| Now-playing XML             | `https://test.tempfm.uz/nowonair/nowplaying.xml` |
| Legacy standalone player    | `tempfm_stream_data/update_track.js`             |
| Raw content (Uzbek)         | `content.txt`                                    |

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
**2026-02-12**
