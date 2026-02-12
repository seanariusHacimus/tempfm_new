"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";

interface Show {
  time: string;
  title: string;
  host: string;
  description: string;
  genre: string;
  isNowPlaying?: boolean;
}

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

const days: { key: DayKey; label: string; short: string }[] = [
  { key: "mon", label: "Monday", short: "Mon" },
  { key: "tue", label: "Tuesday", short: "Tue" },
  { key: "wed", label: "Wednesday", short: "Wed" },
  { key: "thu", label: "Thursday", short: "Thu" },
  { key: "fri", label: "Friday", short: "Fri" },
  { key: "sat", label: "Saturday", short: "Sat" },
  { key: "sun", label: "Sunday", short: "Sun" },
];

const schedule: Record<DayKey, Show[]> = {
  mon: [
    {
      time: "06:00 — 07:00",
      title: "First Light",
      host: "Auto Mix",
      description:
        "Ease into the day with ambient textures and gentle electronica. A calm start before the city wakes up.",
      genre: "Ambient",
    },
    {
      time: "07:00 — 10:00",
      title: "Morning Pulse",
      host: "Kamila & Rustam",
      description:
        "Tashkent&apos;s favourite morning show. News, conversations, traffic updates, and the freshest tracks to start your day right.",
      genre: "Morning Show",
      isNowPlaying: true,
    },
    {
      time: "10:00 — 12:00",
      title: "Midday Mix",
      host: "DJ Zara",
      description:
        "A high-energy blend of pop, R&B, and global hits to power through the morning. Requests open via Telegram.",
      genre: "Pop / R&B",
    },
    {
      time: "12:00 — 13:00",
      title: "News Break",
      host: "Alisher Karimov",
      description:
        "The headlines that matter. Local and international news, tech updates, and cultural happenings across Uzbekistan.",
      genre: "News",
    },
    {
      time: "13:00 — 15:00",
      title: "Afternoon Sessions",
      host: "Malika Rakhimova",
      description:
        "Laid-back beats and deep conversations with local creatives. Interviews with artists, founders, and makers.",
      genre: "Talk / Indie",
    },
    {
      time: "15:00 — 17:00",
      title: "Rush Hour",
      host: "Timur K",
      description:
        "High-tempo tracks and rapid-fire segments. The perfect soundtrack for the afternoon hustle.",
      genre: "Hip-Hop / Electronic",
    },
    {
      time: "17:00 — 19:00",
      title: "Drive Time",
      host: "Bobur & Lola",
      description:
        "Commute companion. Feel-good music, listener call-ins, and the best of Tashkent&apos;s evening energy.",
      genre: "Pop / Hits",
    },
    {
      time: "19:00 — 21:00",
      title: "Global Frequency",
      host: "Sarvar Ibragimov",
      description:
        "World music exploration. From Afrobeats to K-Pop, Latin grooves to Central Asian fusion — no borders on the dial.",
      genre: "World Music",
    },
    {
      time: "21:00 — 23:00",
      title: "Velvet Hour",
      host: "DJ Nilufar",
      description:
        "Smooth jazz, neo-soul, and downtempo vibes. Wind down with the city&apos;s most sophisticated evening set.",
      genre: "Jazz / Soul",
    },
    {
      time: "23:00 — 01:00",
      title: "Night Drive",
      host: "Auto Mix",
      description:
        "Lo-fi, ambient, and chill. The perfect companion for late-night Tashkent streets and quiet moments.",
      genre: "Lo-fi / Chill",
    },
    {
      time: "01:00 — 06:00",
      title: "Deep Sleep Radio",
      host: "Auto Mix",
      description:
        "Continuous ambient soundscapes and minimal electronica. The city rests, the signal stays alive.",
      genre: "Ambient",
    },
  ],
  tue: [
    {
      time: "06:00 — 07:00",
      title: "First Light",
      host: "Auto Mix",
      description:
        "Ease into the day with ambient textures and gentle electronica. A calm start before the city wakes up.",
      genre: "Ambient",
    },
    {
      time: "07:00 — 10:00",
      title: "Morning Pulse",
      host: "Kamila & Rustam",
      description:
        "Wake up with Tashkent. News roundups, guest interviews, and music curated to energize your morning routine.",
      genre: "Morning Show",
    },
    {
      time: "10:00 — 12:00",
      title: "Midday Mix",
      host: "DJ Zara",
      description:
        "Upbeat playlist curation and listener requests. The midday boost Tashkent runs on.",
      genre: "Pop / R&B",
    },
    {
      time: "12:00 — 13:00",
      title: "News Break",
      host: "Alisher Karimov",
      description:
        "Your daily news digest. Politics, business, culture, and sports — everything in one focused hour.",
      genre: "News",
    },
    {
      time: "13:00 — 15:00",
      title: "Vinyl Vault",
      host: "Otabek Narzullayev",
      description:
        "Deep dives into classic albums and forgotten gems. Music history told through the records that shaped generations.",
      genre: "Classic / Retro",
    },
    {
      time: "15:00 — 17:00",
      title: "Rush Hour",
      host: "Timur K",
      description:
        "Non-stop bangers and rapid-fire countdowns. The afternoon energy injection you didn&apos;t know you needed.",
      genre: "Hip-Hop / Electronic",
    },
    {
      time: "17:00 — 19:00",
      title: "Drive Time",
      host: "Bobur & Lola",
      description:
        "Evening commute essentials. Trending tracks, viral moments, and the pulse of Tashkent after hours.",
      genre: "Pop / Hits",
    },
    {
      time: "19:00 — 21:00",
      title: "Tech Forward",
      host: "Jasur Alimov",
      description:
        "Where technology meets culture. Startup stories, app reviews, and how Tashkent&apos;s tech scene is evolving.",
      genre: "Talk / Tech",
    },
    {
      time: "21:00 — 23:00",
      title: "Velvet Hour",
      host: "DJ Nilufar",
      description:
        "Smooth transitions from evening to night. Jazz-inflected sets with neo-soul undertones.",
      genre: "Jazz / Soul",
    },
    {
      time: "23:00 — 01:00",
      title: "Night Drive",
      host: "Auto Mix",
      description:
        "Nocturnal frequencies for the sleepless. Ambient, lo-fi, and minimal electronic selections.",
      genre: "Lo-fi / Chill",
    },
    {
      time: "01:00 — 06:00",
      title: "Deep Sleep Radio",
      host: "Auto Mix",
      description:
        "Continuous ambient soundscapes through the night. Low volume, high atmosphere.",
      genre: "Ambient",
    },
  ],
  wed: [
    {
      time: "06:00 — 07:00",
      title: "First Light",
      host: "Auto Mix",
      description:
        "Soft tones to wake the city. Ambient and acoustic textures to greet the morning.",
      genre: "Ambient",
    },
    {
      time: "07:00 — 10:00",
      title: "Morning Pulse",
      host: "Kamila & Rustam",
      description:
        "Midweek motivation. Culture picks, local events, and the soundtrack to your Wednesday morning.",
      genre: "Morning Show",
    },
    {
      time: "10:00 — 12:00",
      title: "Midday Mix",
      host: "DJ Zara",
      description:
        "Wednesday&apos;s curated playlist. Fresh releases, throwbacks, and everything in between.",
      genre: "Pop / R&B",
    },
    {
      time: "12:00 — 13:00",
      title: "News Break",
      host: "Alisher Karimov",
      description:
        "The midweek news roundup. In-depth analysis and the stories shaping Uzbekistan this week.",
      genre: "News",
    },
    {
      time: "13:00 — 15:00",
      title: "Culture Dose",
      host: "Nodira Azimova",
      description:
        "Art, film, music, literature — a deep dive into what&apos;s shaping Uzbek culture right now. Guests, reviews, and hot takes.",
      genre: "Culture / Talk",
    },
    {
      time: "15:00 — 17:00",
      title: "Rush Hour",
      host: "Timur K",
      description:
        "Turning up the midweek energy. Hip-hop heaters and electronic bangers to break the slump.",
      genre: "Hip-Hop / Electronic",
    },
    {
      time: "17:00 — 19:00",
      title: "Drive Time",
      host: "Bobur & Lola",
      description:
        "Hump-day evening vibes. Listener dedications, trending sounds, and feel-good moments.",
      genre: "Pop / Hits",
    },
    {
      time: "19:00 — 21:00",
      title: "Homegrown",
      host: "Shakhlo Turdieva",
      description:
        "Spotlight on Uzbek musicians and Central Asian artists. Live sessions, premieres, and exclusive interviews.",
      genre: "Local / Indie",
    },
    {
      time: "21:00 — 23:00",
      title: "Velvet Hour",
      host: "DJ Nilufar",
      description:
        "Midweek unwind. Deep grooves, jazzy textures, and soulful selections to reset your evening.",
      genre: "Jazz / Soul",
    },
    {
      time: "23:00 — 01:00",
      title: "Night Drive",
      host: "Auto Mix",
      description:
        "Late-night atmospheric sets. Perfect for studying, creating, or just drifting through the dark.",
      genre: "Lo-fi / Chill",
    },
    {
      time: "01:00 — 06:00",
      title: "Deep Sleep Radio",
      host: "Auto Mix",
      description:
        "Continuous ambient flow through the quietest hours. The station breathes while Tashkent sleeps.",
      genre: "Ambient",
    },
  ],
  thu: [
    {
      time: "06:00 — 07:00",
      title: "First Light",
      host: "Auto Mix",
      description:
        "Pre-dawn ambient tones. A gentle awakening for early risers and night-shift survivors.",
      genre: "Ambient",
    },
    {
      time: "07:00 — 10:00",
      title: "Morning Pulse",
      host: "Kamila & Rustam",
      description:
        "Almost-Friday energy. Weekend previews, event guides, and tracks that build anticipation.",
      genre: "Morning Show",
    },
    {
      time: "10:00 — 12:00",
      title: "Midday Mix",
      host: "DJ Zara",
      description:
        "Thursday&apos;s mix leans heavier. New drops, exclusives, and tracks you&apos;ll be hearing all weekend.",
      genre: "Pop / R&B",
    },
    {
      time: "12:00 — 13:00",
      title: "News Break",
      host: "Alisher Karimov",
      description:
        "Thursday headlines. Weekend event previews plus the week&apos;s biggest stories in review.",
      genre: "News",
    },
    {
      time: "13:00 — 15:00",
      title: "Sound Lab",
      host: "DJ Amir",
      description:
        "Experimental sounds, unreleased tracks, and production deep-dives. Where Tashkent&apos;s next wave is born.",
      genre: "Experimental",
    },
    {
      time: "15:00 — 17:00",
      title: "Rush Hour",
      host: "Timur K",
      description:
        "Pre-weekend warmup. The tempo rises, the energy builds. Thursday edition hits different.",
      genre: "Hip-Hop / Electronic",
    },
    {
      time: "17:00 — 19:00",
      title: "Drive Time",
      host: "Bobur & Lola",
      description:
        "Weekend countdown begins. What&apos;s happening in Tashkent, where to go, and what to listen to.",
      genre: "Pop / Hits",
    },
    {
      time: "19:00 — 21:00",
      title: "Podcast Hour",
      host: "Various Hosts",
      description:
        "Curated podcast episodes from TempFM&apos;s original series. Storytelling, interviews, and deep dives.",
      genre: "Podcast",
    },
    {
      time: "21:00 — 23:00",
      title: "Pre-Game",
      host: "DJ Sanjar",
      description:
        "Thursday night warmup. Club-ready beats, future bass, and party starters for early weekend warriors.",
      genre: "Dance / Electronic",
    },
    {
      time: "23:00 — 01:00",
      title: "Night Drive",
      host: "Auto Mix",
      description:
        "Winding down Thursday with atmospheric selections and nocturnal soundscapes.",
      genre: "Lo-fi / Chill",
    },
    {
      time: "01:00 — 06:00",
      title: "Deep Sleep Radio",
      host: "Auto Mix",
      description:
        "Continuous ambient programming. Low-key frequencies for the deepest hours.",
      genre: "Ambient",
    },
  ],
  fri: [
    {
      time: "06:00 — 07:00",
      title: "First Light",
      host: "Auto Mix",
      description:
        "Friday dawn. Uplifting ambient and soft electronic textures to welcome the weekend.",
      genre: "Ambient",
    },
    {
      time: "07:00 — 10:00",
      title: "Morning Pulse: Friday Edition",
      host: "Kamila & Rustam",
      description:
        "It&apos;s Friday! Weekend event guides, feel-good tracks, and the energy of a city ready to celebrate.",
      genre: "Morning Show",
    },
    {
      time: "10:00 — 12:00",
      title: "Midday Mix",
      host: "DJ Zara",
      description:
        "Friday&apos;s selection goes all out. Party anthems, new releases, and the hottest tracks trending now.",
      genre: "Pop / Dance",
    },
    {
      time: "12:00 — 13:00",
      title: "News Break",
      host: "Alisher Karimov",
      description:
        "Week in review. The stories that defined the week plus what to watch over the weekend.",
      genre: "News",
    },
    {
      time: "13:00 — 15:00",
      title: "Culture Dose: Weekend Edition",
      host: "Nodira Azimova",
      description:
        "Extended culture coverage. Gallery openings, film premieres, book launches, and everything cultural this weekend.",
      genre: "Culture / Talk",
    },
    {
      time: "15:00 — 17:00",
      title: "Friday Frequency",
      host: "DJ Sanjar & Timur K",
      description:
        "Back-to-back DJ sets to kick off the weekend. High-energy electronic and hip-hop fusion.",
      genre: "Electronic / Hip-Hop",
    },
    {
      time: "17:00 — 19:00",
      title: "Golden Hour",
      host: "Malika Rakhimova",
      description:
        "Sunset-ready selections. Deep house, nu-disco, and warm electronic grooves for Friday evening.",
      genre: "Deep House / Nu-Disco",
    },
    {
      time: "19:00 — 22:00",
      title: "Friday Night Live",
      host: "DJ Amir",
      description:
        "Three hours of live mixing. Guest DJs, exclusive drops, and the hottest party in Tashkent that doesn&apos;t need a door.",
      genre: "Dance / Club",
    },
    {
      time: "22:00 — 01:00",
      title: "The Underground",
      host: "DJ Amir & Guests",
      description:
        "Deep cuts, local beats, and underground sounds from across Central Asia and beyond. The real ones know.",
      genre: "Underground / Bass",
    },
    {
      time: "01:00 — 06:00",
      title: "After Hours",
      host: "Auto Mix",
      description:
        "Post-party decompression. Downtempo, dub, and deep ambient for Friday night survivors.",
      genre: "Downtempo",
    },
  ],
  sat: [
    {
      time: "06:00 — 08:00",
      title: "Slow Morning",
      host: "Auto Mix",
      description:
        "No alarms needed. Acoustic, lo-fi, and gentle tunes for a lazy Saturday wakeup.",
      genre: "Acoustic / Lo-fi",
    },
    {
      time: "08:00 — 11:00",
      title: "Weekend Breakfast",
      host: "Lola Saidova",
      description:
        "Saturday brunch vibes. Light conversations, weekend plans, and the coziest playlist in Tashkent.",
      genre: "Lifestyle",
    },
    {
      time: "11:00 — 13:00",
      title: "Bazaar Beats",
      host: "Sarvar Ibragimov",
      description:
        "Inspired by the sounds of Chorsu and beyond. World music, folk fusion, and the rhythms of the bazaar.",
      genre: "World / Folk Fusion",
    },
    {
      time: "13:00 — 14:00",
      title: "Weekend Roundup",
      host: "Alisher Karimov",
      description:
        "Compact weekend news. What you missed, what&apos;s happening, and what&apos;s coming up in Tashkent.",
      genre: "News",
    },
    {
      time: "14:00 — 16:00",
      title: "Homegrown: Live Session",
      host: "Shakhlo Turdieva",
      description:
        "Extended live session featuring Uzbek and Central Asian musicians performing in the TempFM studio.",
      genre: "Live Music",
    },
    {
      time: "16:00 — 18:00",
      title: "Rewind",
      host: "Otabek Narzullayev",
      description:
        "The best of the &apos;90s, 2000s, and 2010s. Nostalgia-fueled sets that hit different on a Saturday.",
      genre: "Throwback",
    },
    {
      time: "18:00 — 20:00",
      title: "Golden Hour: Saturday",
      host: "DJ Nilufar",
      description:
        "Saturday sunset session. Deep, warm, and hypnotic. House music for the soul.",
      genre: "Deep House",
    },
    {
      time: "20:00 — 23:00",
      title: "Saturday Night Fever",
      host: "DJ Sanjar",
      description:
        "The main event. Three hours of non-stop party fuel. Tashkent&apos;s biggest Saturday night broadcast.",
      genre: "Dance / Club",
    },
    {
      time: "23:00 — 02:00",
      title: "The Underground",
      host: "DJ Amir & Guests",
      description:
        "Saturday&apos;s deepest session. Underground electronic, experimental bass, and sounds from the edge.",
      genre: "Underground / Bass",
    },
    {
      time: "02:00 — 06:00",
      title: "After Hours",
      host: "Auto Mix",
      description:
        "The city sleeps, the signal hums. Ambient dub and minimal textures until dawn.",
      genre: "Downtempo",
    },
  ],
  sun: [
    {
      time: "06:00 — 09:00",
      title: "Sunday Sunrise",
      host: "Auto Mix",
      description:
        "The gentlest start to any day of the week. Acoustic, classical crossover, and peaceful ambient.",
      genre: "Acoustic / Classical",
    },
    {
      time: "09:00 — 12:00",
      title: "Weekend Breakfast: Sunday",
      host: "Lola Saidova",
      description:
        "Extended Sunday edition. Slower pace, deeper conversations, and music to savor with your morning tea.",
      genre: "Lifestyle",
    },
    {
      time: "12:00 — 13:00",
      title: "Weekend Roundup",
      host: "Alisher Karimov",
      description:
        "Sunday news briefing. The week ahead, cultural calendar, and stories that will shape the next seven days.",
      genre: "News",
    },
    {
      time: "13:00 — 15:00",
      title: "Vinyl Vault: Sunday Special",
      host: "Otabek Narzullayev",
      description:
        "Extended album listening sessions. One classic album played front-to-back with commentary and context.",
      genre: "Classic / Retro",
    },
    {
      time: "15:00 — 17:00",
      title: "The Reading Room",
      host: "Nodira Azimova",
      description:
        "Books, poetry, and storytelling. Author interviews, literary discussions, and spoken word performances.",
      genre: "Literature / Talk",
    },
    {
      time: "17:00 — 19:00",
      title: "Sunday Sessions",
      host: "Various Hosts",
      description:
        "Rotating guest hosts and surprise sets. Each Sunday brings something new to the TempFM airwaves.",
      genre: "Mixed",
    },
    {
      time: "19:00 — 21:00",
      title: "Chill Republic",
      host: "DJ Nilufar",
      description:
        "Sunday evening decompression. Chillout, trip-hop, and downtempo selections to ease into the new week.",
      genre: "Chillout / Trip-Hop",
    },
    {
      time: "21:00 — 23:00",
      title: "Night Drive: Sunday",
      host: "Auto Mix",
      description:
        "Reflective and calm. The Sunday edition pairs lo-fi beats with field recordings from around Tashkent.",
      genre: "Lo-fi / Chill",
    },
    {
      time: "23:00 — 01:00",
      title: "Week Ahead",
      host: "Kamila",
      description:
        "Preview of next week&apos;s shows, upcoming guests, and what&apos;s new on TempFM. Plus a curated wind-down playlist.",
      genre: "Talk / Preview",
    },
    {
      time: "01:00 — 06:00",
      title: "Deep Sleep Radio",
      host: "Auto Mix",
      description:
        "Into the new week. Ambient drones, soft pads, and barely-there melodies until Monday&apos;s first light.",
      genre: "Ambient",
    },
  ],
};

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState<DayKey>("mon");

  const activeShows = schedule[activeDay];
  const activeDayLabel =
    days.find((d) => d.key === activeDay)?.label ?? "Monday";

  return (
    <>
      {/* Header */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
              What&apos;s On
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter text-white mb-4">
              Weekly
              <br />
              <span className="text-[var(--color-accent)]">Schedule</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-lg leading-relaxed">
              24 hours a day, 7 days a week. Every show, every host, every
              vibe — planned just for you.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Day Selector */}
      <section className="sticky top-16 z-30 bg-[var(--color-bg)]/80 backdrop-blur-xl border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 sm:gap-2 py-4 overflow-x-auto scrollbar-hide">
            {days.map((day) => (
              <button
                key={day.key}
                onClick={() => setActiveDay(day.key)}
                className={`relative flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-[12px] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeDay === day.key
                    ? "bg-[var(--color-accent)] text-white"
                    : "bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card-hover)] hover:text-white border border-[var(--color-border)]"
                }`}
              >
                <span className="hidden sm:inline">{day.label}</span>
                <span className="sm:hidden">{day.short}</span>
                {activeDay === day.key && (
                  <motion.div
                    layoutId="activeDayIndicator"
                    className="absolute inset-0 bg-[var(--color-accent)] rounded-[12px] -z-10"
                    transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule List */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                {activeDayLabel}
              </h2>
              <span className="text-[var(--color-text-muted)] text-xs sm:text-sm uppercase tracking-wider">
                {activeShows.length} Shows
              </span>
            </div>
          </AnimateIn>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-3 md:gap-4"
            >
              {activeShows.map((show, index) => (
                <motion.div
                  key={`${activeDay}-${show.time}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <div
                    className={`group relative bg-[var(--color-bg-card)] border rounded-[12px] p-5 md:p-7 transition-all duration-200 hover:bg-[var(--color-bg-card-hover)] ${
                      show.isNowPlaying
                        ? "border-[var(--color-accent)] shadow-[0_0_30px_rgba(255,61,0,0.1)]"
                        : "border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
                    }`}
                  >
                    {/* Now Playing Badge */}
                    {show.isNowPlaying && (
                      <div className="absolute -top-3 left-5 md:left-7">
                        <span className="inline-flex items-center gap-1.5 bg-[var(--color-accent)] text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                          </span>
                          Now Playing
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                      {/* Time */}
                      <div className="flex-shrink-0 md:w-40 lg:w-48">
                        <span
                          className={`font-[family-name:var(--font-display)] text-lg md:text-xl font-black tracking-tight ${
                            show.isNowPlaying
                              ? "text-[var(--color-accent)]"
                              : "text-[var(--color-text-secondary)]"
                          }`}
                        >
                          {show.time}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                          <h3
                            className={`font-[family-name:var(--font-display)] text-2xl md:text-3xl font-black uppercase tracking-tight transition-colors ${
                              show.isNowPlaying
                                ? "text-[var(--color-accent)]"
                                : "text-white group-hover:text-[var(--color-accent)]"
                            }`}
                          >
                            {show.title}
                          </h3>
                          <span className="flex-shrink-0 inline-flex self-start bg-[var(--color-bg)]/60 border border-[var(--color-border)] text-[var(--color-text-muted)] text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                            {show.genre}
                          </span>
                        </div>

                        <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed mb-3">
                          {show.description}
                        </p>

                        <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                          Hosted by{" "}
                          <span className="text-[var(--color-text-secondary)]">
                            {show.host}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimateIn>
            <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
              Don&apos;t Miss a Show
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6">
              Tune In Now
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-md mx-auto mb-10">
              TempFM 88.4 is live right now. Find us on the dial or stream
              online — wherever you are in Tashkent and beyond.
            </p>
            <a
              href="/#listen"
              className="inline-flex items-center gap-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-10 py-5 rounded-[12px] text-base md:text-lg font-bold uppercase tracking-wider transition-colors"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
              </span>
              Listen Live — 88.4 FM
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
