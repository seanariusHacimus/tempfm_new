"use client";

import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";

interface NewsArticle {
  id: number;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  featured?: boolean;
}

const featuredArticle: NewsArticle = {
  id: 0,
  category: "Announcement",
  date: "February 10, 2026",
  title: "TempFM 88.4 Kicks Off 2026 With a Brand New Studio & Expanded Lineup",
  excerpt:
    "After months of renovation, TempFM has unveiled its state-of-the-art broadcasting studio in central Tashkent. The new space features a live session room, an open-air rooftop stage for intimate performances, and upgraded equipment that brings our sound quality to a whole new level. With the new studio comes an expanded lineup of 12 fresh shows launching this spring — covering everything from Uzbek indie music to tech culture and late-night poetry. This is the biggest upgrade in TempFM&apos;s history, and it&apos;s all for you.",
  featured: true,
};

const articles: NewsArticle[] = [
  {
    id: 1,
    category: "New Show",
    date: "February 8, 2026",
    title: "Introducing \"Silk Road Sounds\" — A New Weekly Show Exploring Central Asian Music",
    excerpt:
      "Every Thursday at 20:00, host Aziza Karimova takes you on a sonic journey through the music scenes of Tashkent, Almaty, Bishkek, and beyond. Expect live DJ sets, artist spotlights, and exclusive premieres from the region&apos;s freshest talent.",
  },
  {
    id: 2,
    category: "Interview",
    date: "February 5, 2026",
    title: "Sevara Nazarkhan Talks New Album & the Future of Uzbek Pop",
    excerpt:
      "In an exclusive sit-down with TempFM&apos;s Morning Pulse crew, Sevara opens up about blending traditional Uzbek melodies with modern production, her upcoming tour, and why Tashkent&apos;s youth are the future of Central Asian music.",
  },
  {
    id: 3,
    category: "Local Event",
    date: "January 30, 2026",
    title: "TempFM Partners With Tashkent City Mall for Live Music Weekends",
    excerpt:
      "Starting this February, catch live performances from local artists every Saturday at Tashkent City Mall&apos;s central atrium. TempFM DJs will host the stage, spinning tracks between sets. Free entry, all ages welcome.",
  },
  {
    id: 4,
    category: "Station Update",
    date: "January 25, 2026",
    title: "App Update 3.0: Stream TempFM Anywhere With Offline Podcast Downloads",
    excerpt:
      "The latest TempFM app update is here. Version 3.0 brings offline podcast downloads, a redesigned player interface, personalized show recommendations, and real-time chat during live broadcasts. Available now on iOS and Android.",
  },
  {
    id: 5,
    category: "Charts",
    date: "January 20, 2026",
    title: "TempFM Top 20: January&apos;s Most-Played Tracks on 88.4",
    excerpt:
      "From local breakout hits to international bangers — here&apos;s what Tashkent has been listening to this month. Spoiler: three Uzbek artists cracked the top five for the first time ever.",
  },
  {
    id: 6,
    category: "Community",
    date: "January 15, 2026",
    title: "Open Mic Nights Return to TempFM HQ — Sign Up Now",
    excerpt:
      "Our monthly open mic series is back for 2026. Whether you rap, sing, do spoken word, or play an instrument — the TempFM stage is yours. Next session: February 22nd. Limited spots, register through our app.",
  },
];

export default function NewsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
              Stay in the Loop
            </p>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl md:text-8xl font-black uppercase leading-[0.85] tracking-tighter text-white">
              News &<br />
              <span className="text-[var(--color-accent)]">Updates</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={0.2}>
            <p className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-lg leading-relaxed mt-6">
              Everything happening at TempFM 88.4 — new shows, events, artist features, and station announcements straight from Tashkent.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Featured Article */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn delay={0.1}>
            <motion.article
              whileHover={{ scale: 1.005 }}
              className="group relative bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] p-8 md:p-12 transition-colors cursor-pointer overflow-hidden"
            >
              {/* Accent gradient overlay */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-accent)]/5 to-transparent pointer-events-none" />

              <div className="relative">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="bg-[var(--color-accent)] text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-[12px]">
                    Featured
                  </span>
                  <span className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest">
                    {featuredArticle.category}
                  </span>
                  <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                    {featuredArticle.date}
                  </span>
                </div>

                <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[0.95] mb-6 group-hover:text-[var(--color-accent)] transition-colors max-w-4xl">
                  {featuredArticle.title}
                </h2>

                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
                  {featuredArticle.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider group-hover:text-[var(--color-accent)] transition-colors">
                  Read Full Story
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.article>
          </AnimateIn>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <div className="flex items-end justify-between mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                Latest Stories
              </h2>
              <span className="hidden md:inline-flex text-[var(--color-text-muted)] text-sm uppercase tracking-wider">
                {articles.length} Articles
              </span>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article, i) => (
              <AnimateIn key={article.id} delay={i * 0.08}>
                <motion.article
                  whileHover={{ scale: 1.01 }}
                  className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] p-6 md:p-8 transition-colors cursor-pointer h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest">
                      {article.category}
                    </span>
                    <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                      {article.date}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-black uppercase tracking-tight text-white leading-[0.95] mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-6 flex-1">
                    {article.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 text-[var(--color-text-muted)] font-bold text-xs uppercase tracking-wider group-hover:text-[var(--color-accent)] transition-colors">
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </motion.article>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimateIn>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] text-white px-10 py-4 rounded-[12px] text-sm font-bold uppercase tracking-wider transition-colors"
            >
              Load More Articles
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </motion.button>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
