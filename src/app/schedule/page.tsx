"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";
import PageHeader from "@/components/PageHeader";
import { useTranslation } from "@/i18n";

interface Show {
  time: string;
  title: string;
  host: string;
  description: string;
  genre: string;
  isNowPlaying?: boolean;
}

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export default function SchedulePage() {
  const { t, dict } = useTranslation();
  const [activeDay, setActiveDay] = useState<DayKey>("mon");

  const dayKeys: DayKey[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const daysObj = dict.schedule.days as Record<DayKey, { label: string; short: string }>;
  const days = dayKeys.map((key) => ({ key, ...daysObj[key] }));
  const schedule = dict.schedule.shows as unknown as Record<DayKey, Show[]>;

  const activeShows = schedule[activeDay];
  const activeDayLabel = daysObj[activeDay]?.label ?? "Dushanba";

  return (
    <>
      <PageHeader
        label={t("schedule.header.label")}
        title={t("schedule.header.title")}
        titleAccent={t("schedule.header.titleAccent")}
        description={t("schedule.header.description")}
      />

      {/* Day Selector */}
      <section className="sticky top-16 z-30 bg-[var(--color-bg)]/80 backdrop-blur-xl border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 sm:gap-2 py-4 overflow-x-auto scrollbar-hide">
            {days.map((day) => (
              <button
                key={day.key}
                onClick={() => setActiveDay(day.key)}
                className={`relative flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-[12px] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${activeDay === day.key
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
              <h2 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                {activeDayLabel}
              </h2>
              <span className="text-[var(--color-text-muted)] text-xs sm:text-sm uppercase tracking-wider">
                {t("schedule.showsCount", { count: activeShows.length })}
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
                    className={`group relative active:scale-[0.99] bg-[var(--color-bg-card)] border rounded-[12px] p-5 md:p-7 transition-all duration-200 hover:bg-[var(--color-bg-card-hover)] ${show.isNowPlaying
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
                          {t("schedule.nowPlaying")}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                      {/* Time */}
                      <div className="flex-shrink-0 md:w-40 lg:w-48">
                        <span
                          className={`font-display text-lg md:text-xl font-black tracking-tight ${show.isNowPlaying
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
                            className={`font-display text-2xl md:text-3xl font-black uppercase tracking-tight transition-colors ${show.isNowPlaying
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
                          {t("schedule.hostLabel")}{" "}
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
              {t("schedule.cta.label")}
            </p>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6">
              {t("schedule.cta.title")}
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-md mx-auto mb-10">
              {t("schedule.cta.description")}
            </p>
            <a
              href="/#listen"
              className="inline-flex items-center gap-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-10 py-5 rounded-[12px] text-base md:text-lg font-bold uppercase tracking-wider transition-colors"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
              </span>
              {t("schedule.cta.button")}
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
