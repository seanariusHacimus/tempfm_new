"use client";

import { motion, AnimatePresence } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";
import Link from "next/link";
import { useAudio } from "@/components/AudioProvider";

import { useTranslation, Dictionary } from "@/i18n";

export default function HomePage() {
  const { isPlaying } = useAudio();
  const { t, dict } = useTranslation();

  const shows = dict.home.shows.items;

  const stats = [
    { value: "88.4", label: t("home.stats.frequency") },
    { value: "200K+", label: t("home.stats.listeners") },
    { value: "24/7", label: t("home.stats.liveAir") },
    { value: "50+", label: t("home.stats.weeklyShows") },
  ];


  return (
    <>
      {/* Hero — transparent to reveal Three.js background */}
      <section className="relative h-[calc(100vh-4rem)] flex items-center overflow-hidden">
        <AnimatePresence mode="wait">
          {isPlaying ? (
            /* ── Playing: centered swinging logo ── */
            <motion.div
              key="playing-logo"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <motion.div
                animate={{ y: [0, -15, 0, 15, 0] }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.svg"
                  alt="TempFM Logo"
                  className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_4px_30px_rgba(255,61,0,0.3)]"
                />
              </motion.div>
            </motion.div>
          ) : (
            /* ── Paused: normal hero content ── */
            <motion.div
              key="hero-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 w-full"
            >
              <AnimateIn delay={0.1}>
                <div className="inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]" />
                  </span>
                  <span className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-wider">
                    {t("home.hero.badge")}
                  </span>

                </div>
              </AnimateIn>

              <AnimateIn delay={0.2}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-wide mb-8 font-display">
                  {t("home.hero.titleLine1")} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent)] to-orange-400">
                    {t("home.hero.titleLine2")}
                  </span>

                </h1>
              </AnimateIn>

              <AnimateIn delay={0.3}>
                <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed mb-10">
                  {t("home.hero.description")}
                </p>

              </AnimateIn>

              <AnimateIn delay={0.4}>
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="#listen"
                    className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t("home.hero.ctaLive")}
                  </a>

                  <Link
                    href="/schedule"
                    className="flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
                  >
                    {t("home.hero.ctaSchedule")}
                  </Link>

                </div>
              </AnimateIn>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Stats */}
      <section className="border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => {
              // Mobile (2-col): left col = index 0,2; top row = index 0,1
              const isLeftCol = i % 2 === 0;
              const isTopRow = i < 2;
              const borderClasses = [
                // Right border: left-col items on mobile, all but last on desktop
                isLeftCol ? "border-r border-[var(--color-border)]" : "",
                !isLeftCol && i < stats.length - 1 ? "md:border-r md:border-[var(--color-border)]" : "",
                // Bottom border on mobile between rows
                isTopRow ? "border-b border-[var(--color-border)] md:border-b-0" : "",
              ].filter(Boolean).join(" ");

              return (
                <AnimateIn key={stat.label} delay={i * 0.1}>
                  <div
                    className={`py-10 md:py-14 text-center ${borderClasses}`}
                  >
                    <div className="font-display text-3xl md:text-5xl font-black text-white tracking-wide">
                      {stat.value}
                    </div>
                    <div className="text-[var(--color-text-secondary)] text-sm mt-2 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Shows */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                  {t("home.shows.sectionLabel")}
                </p>
                <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-wide text-white">
                  {t("home.shows.sectionTitle")}
                </h2>

              </div>
              <Link
                href="/schedule"
                className="hidden md:inline-flex text-[var(--color-text-secondary)] hover:text-white text-sm font-medium uppercase tracking-wider transition-colors"
              >
                {t("home.shows.fullSchedule")}
              </Link>

            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shows.map((show: { title: string; time: string; host: string; description: string; tag: string }, i: number) => (
              <AnimateIn key={show.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] p-6 md:p-8 transition-colors cursor-pointer h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest">
                      {show.tag}
                    </span>
                    <span className="text-[var(--color-text-muted)] text-sm">
                      {show.time}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-black uppercase tracking-wide text-white mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                    {show.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm mb-4 flex-1">
                    {show.description}
                  </p>
                  <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-wider mt-auto">
                    {t("home.shows.hostLabel")} {show.host}
                  </p>

                </motion.div>
              </AnimateIn>
            ))}
          </div>

          <div className="md:hidden mt-8 text-center">
            <Link
              href="/schedule"
              className="text-[var(--color-text-secondary)] hover:text-white text-sm font-medium uppercase tracking-wider transition-colors"
            >
              {t("home.shows.fullSchedule")}
            </Link>

          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 md:py-32 border-t border-[var(--color-border)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn direction="left">
              <div>
                <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                  {t("home.about.label")}
                </p>

                <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-wide text-white mb-6">
                  {t("home.about.titleLine1")}
                  <br />
                  <span className="text-[var(--color-accent)]">{t("home.about.titleAccent")}</span>
                </h2>
                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed mb-8 max-w-md">
                  {t("home.about.description")}
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider hover:text-[var(--color-accent)] transition-colors"
                >
                  {t("home.about.learnMore")}
                </Link>

              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={0.2}>
              <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[12px] aspect-square flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="font-display text-8xl md:text-9xl font-black text-[var(--color-accent)] tracking-wideer leading-none">
                    88.4
                  </div>
                  <div className="text-[var(--color-text-muted)] text-sm uppercase tracking-[0.3em] mt-4">
                    {t("home.about.fmLabel")}
                  </div>

                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="listen"
        className="py-24 md:py-32 border-t border-[var(--color-border)] overflow-hidden"
      >

        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimateIn>
            <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
              {t("home.cta.label")}
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wide text-white mb-6">
              {t("home.cta.titleLine1")}
              <br />
              <span className="text-[var(--color-accent)]">{t("home.cta.titleAccent")}</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-md mx-auto mb-10">
              {t("home.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#listen"
                className="inline-flex items-center gap-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-10 py-5 rounded-[12px] text-lg font-bold uppercase tracking-wider transition-colors"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                </span>
                {t("home.cta.button")}
              </a>

            </div>
          </AnimateIn>
        </div>
      </section>

    </>
  );
}
