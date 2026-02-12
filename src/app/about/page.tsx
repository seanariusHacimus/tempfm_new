"use client";

import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";

const values = [
  {
    title: "Authentic Voice",
    description:
      "We don't follow templates. Every show, every playlist, every conversation is rooted in real stories from real people in Tashkent.",
    icon: "\u{1F3A4}",
  },
  {
    title: "Youth First",
    description:
      "Built by young people, for young people. We amplify the ideas, energy, and creativity of Uzbekistan's next generation.",
    icon: "\u26A1",
  },
  {
    title: "Local Culture",
    description:
      "From Navoiy to hip-hop, from plov to street art \u2014 we celebrate the culture that makes Tashkent unlike anywhere else on earth.",
    icon: "\u{1F30D}",
  },
  {
    title: "Innovation",
    description:
      "Radio reimagined. We push boundaries with new formats, digital-first thinking, and a refusal to do things the old way.",
    icon: "\u{1F680}",
  },
];

const team = [
  {
    name: "Jasur Karimov",
    role: "Station Director",
    bio: "Former journalist turned radio visionary. Jasur left a career in print media to build the station he wished existed when he was 20.",
    initials: "JK",
    color: "bg-[var(--color-accent)]",
  },
  {
    name: "Dilnoza Rashidova",
    role: "Program Director",
    bio: "Dilnoza shapes every hour of airtime. With a background in cultural programming, she ensures every show has purpose and punch.",
    initials: "DR",
    color: "bg-emerald-600",
  },
  {
    name: "Sherzod Alimov",
    role: "Head of Music",
    bio: "A walking encyclopedia of sound \u2014 from Uzbek folk to global electronica. Sherzod curates the sonic identity of TempFM.",
    initials: "SA",
    color: "bg-violet-600",
  },
  {
    name: "Kamila Usmanova",
    role: "Head DJ",
    bio: "Kamila has been spinning since she was 16. Her mixes have become the unofficial soundtrack of Tashkent's nightlife scene.",
    initials: "KU",
    color: "bg-amber-600",
  },
  {
    name: "Bobur Nazarov",
    role: "News Editor",
    bio: "Sharp, fast, and fair. Bobur leads our news desk with a commitment to stories that matter to young Uzbeks.",
    initials: "BN",
    color: "bg-sky-600",
  },
  {
    name: "Madina Yuldasheva",
    role: "Marketing Lead",
    bio: "Madina connects TempFM with the city. From campus events to viral campaigns, she keeps the brand alive everywhere.",
    initials: "MY",
    color: "bg-pink-600",
  },
];

const stats = [
  { value: "5+", label: "Years on Air" },
  { value: "50+", label: "Shows Per Week" },
  { value: "200K+", label: "Monthly Listeners" },
  { value: "30+", label: "Team Members" },
];

const socials = [
  { name: "Instagram", href: "#" },
  { name: "Telegram", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "X / Twitter", href: "#" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-[128px]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
          <AnimateIn delay={0.1}>
            <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-4">
              Who We Are
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-white mb-8">
              About
              <br />
              <span className="text-[var(--color-accent)]">TempFM</span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.35}>
            <p className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-2xl leading-relaxed">
              We&apos;re the frequency that Tashkent&apos;s youth didn&apos;t
              know it needed &mdash; and now can&apos;t live without. 88.4 FM is
              where music, culture, and conversation collide to create something
              that sounds like home.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Story / History */}
      <section className="py-24 md:py-32 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimateIn direction="left">
              <div>
                <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                  Our Story
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
                  Started with
                  <br />
                  a Simple Idea
                </h2>
              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={0.15}>
              <div className="space-y-6">
                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
                  In 2021, a small group of young media professionals in
                  Tashkent looked at the radio dial and saw nothing that
                  reflected their world. The music was outdated. The
                  conversations felt disconnected. The energy was missing. So
                  they decided to build something from scratch.
                </p>
                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
                  TempFM 88.4 launched from a converted apartment studio in the
                  Chilanzar district with three hosts, a borrowed mixing board,
                  and one belief: that young Uzbeks deserved a radio station
                  that actually spoke their language &mdash; not just Uzbek and
                  Russian, but the language of their generation.
                </p>
                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
                  Today, we broadcast 24/7 from a purpose-built studio in
                  central Tashkent, reaching over 200,000 monthly listeners
                  across Uzbekistan and beyond. Our team has grown from 3 to
                  over 30 &mdash; but the mission hasn&apos;t changed. We&apos;re still
                  here to give Tashkent&apos;s youth a voice that&apos;s loud,
                  honest, and unmistakably theirs.
                </p>
              </div>
            </AnimateIn>
          </div>

          {/* Timeline Highlights */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                year: "2021",
                event: "TempFM goes live from a Chilanzar apartment studio",
              },
              {
                year: "2022",
                event:
                  "Hit 50K monthly listeners; launched first podcast series",
              },
              {
                year: "2023",
                event:
                  "Moved to new studio; partnered with Tashkent music festivals",
              },
              {
                year: "2024",
                event: "200K+ listeners; expanded to 50+ weekly shows",
              },
            ].map((item, i) => (
              <AnimateIn key={item.year} delay={i * 0.1}>
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[12px] p-6">
                  <div className="font-[family-name:var(--font-display)] text-3xl font-black text-[var(--color-accent)] tracking-tight mb-2">
                    {item.year}
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {item.event}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 md:py-32 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <div className="text-center mb-16">
              <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                What Drives Us
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
                Mission & Values
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Everything we do is guided by four principles. They shape our
                programming, our culture, and the way we show up for our
                listeners every single day.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, i) => (
              <AnimateIn key={value.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] p-6 md:p-8 transition-colors h-full"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 0.1}>
                <div
                  className={`py-10 md:py-14 text-center ${
                    i < stats.length - 1
                      ? "border-r border-[var(--color-border)]"
                      : ""
                  }`}
                >
                  <div className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-black text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[var(--color-text-secondary)] text-sm mt-2 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <div className="text-center mb-16">
              <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                The People
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
                Meet the Team
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                The voices, minds, and hands behind TempFM 88.4. A crew of
                passionate creatives who live and breathe Tashkent culture.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((member, i) => (
              <AnimateIn key={member.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] p-6 md:p-8 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className={`${member.color} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg tracking-wide shrink-0`}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-black uppercase tracking-tight text-white group-hover:text-[var(--color-accent)] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 md:py-32 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimateIn direction="left">
              <div>
                <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                  Get in Touch
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
                  Let&apos;s Talk
                </h2>
                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-md mb-10">
                  Got a story idea? Want to collaborate? Looking for airtime?
                  We&apos;re always open to conversations that move the culture
                  forward.
                </p>

                <div className="space-y-6">
                  <div>
                    <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest mb-1">
                      Address
                    </p>
                    <p className="text-white text-base">
                      Tashkent City, Uzbekistan
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:hello@tempfm.uz"
                      className="text-white text-base hover:text-[var(--color-accent)] transition-colors"
                    >
                      hello@tempfm.uz
                    </a>
                  </div>
                  <div>
                    <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest mb-1">
                      Phone
                    </p>
                    <a
                      href="tel:+998712000884"
                      className="text-white text-base hover:text-[var(--color-accent)] transition-colors"
                    >
                      +998 71 200 08 84
                    </a>
                  </div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={0.15}>
              <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[12px] p-8 md:p-10">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-black uppercase tracking-tight text-white mb-6">
                  Follow Us
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-8">
                  Stay connected with TempFM across all platforms.
                  Behind-the-scenes content, live updates, playlists, and more.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {socials.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.03 }}
                      className="bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] px-5 py-4 text-center text-white text-sm font-bold uppercase tracking-wider transition-colors hover:text-[var(--color-accent)]"
                    >
                      {social.name}
                    </motion.a>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
                  <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest mb-3">
                    Listen Live
                  </p>
                  <div className="font-[family-name:var(--font-display)] text-5xl font-black text-[var(--color-accent)] tracking-tighter">
                    88.4 FM
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
