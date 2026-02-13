"use client";

import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";
import PageHeader from "@/components/PageHeader";

import { useTranslation } from "@/i18n";

const socials = [
  { name: "Instagram", href: "https://instagram.com/radiotempfm" },
  { name: "Telegram", href: "https://t.me/radiotempfm" },
];

const avatarColors = [
  "bg-rose-600", "bg-amber-600", "bg-emerald-600", "bg-sky-600",
  "bg-violet-600", "bg-pink-600", "bg-teal-600", "bg-indigo-600",
  "bg-orange-600", "bg-cyan-600",
];

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function AboutPage() {
  const { t, dict } = useTranslation();

  const values = dict.about.values.items;
  const team = dict.about.team.members;
  const paragraphs = dict.about.history.paragraphs as string[];
  const timeline = dict.about.history.timeline as { year: string; event: string }[];

  const stats = [
    { value: "5+", label: t("about.stats.yearsOnAir") },
    { value: "50+", label: t("about.stats.weeklyShows") },
    { value: "200K+", label: t("about.stats.monthlyListeners") },
    { value: "30+", label: t("about.stats.teamMembers") },
  ];



  return (
    <>
      <PageHeader
        label={t("about.header.label")}
        title={t("about.header.title")}
        titleAccent={t("about.header.titleAccent")}
        description={t("about.header.description")}
      />


      {/* Story / History */}
      <section className="py-24 md:py-32 border-t border-[var(--color-border)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimateIn direction="left">
              <div>
                <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                  {t("about.history.label")}
                </p>
                <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6 whitespace-pre-line">
                  {t("about.history.titleLine1")}{"\n"}{t("about.history.titleLine2")}
                </h2>

              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={0.15}>
              <div className="space-y-6">
                {paragraphs.map((p, i) => (
                  <p key={i} className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
                    {p}
                  </p>
                ))}

              </div>
            </AnimateIn>
          </div>

          {/* Timeline Highlights */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {timeline.map((item, i) => (

              <AnimateIn key={item.year} delay={i * 0.1}>
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[12px] p-6">
                  <div className="font-display text-3xl font-black text-[var(--color-accent)] tracking-tight mb-2">
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
                {t("about.values.label")}
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
                {t("about.values.title")}
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                {t("about.values.description")}
              </p>

            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value: { title: string; description: string; icon: string }, i: number) => (

              <AnimateIn key={value.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] p-6 md:p-8 transition-colors h-full"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-display text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-[var(--color-accent)] transition-colors">
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
                  className={`py-10 md:py-14 text-center ${i < stats.length - 1
                    ? "border-r border-[var(--color-border)]"
                    : ""
                    }`}
                >
                  <div className="font-display text-3xl md:text-5xl font-black text-white tracking-tight">
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
                {t("about.team.label")}
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
                {t("about.team.title")}
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                {t("about.team.description")}
              </p>

            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((member: { name: string; role: string; bio: string }, i: number) => (

              <AnimateIn key={member.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] p-6 md:p-8 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className={`${avatarColors[i % avatarColors.length]} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg tracking-wide shrink-0`}
                    >
                      {getInitials(member.name)}
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-black uppercase tracking-tight text-white group-hover:text-[var(--color-accent)] transition-colors">
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
      <section className="py-24 md:py-32 border-t border-[var(--color-border)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimateIn direction="left">
              <div>
                <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                  {t("about.contact.label")}
                </p>
                <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
                  {t("about.contact.title")}
                </h2>
                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-md mb-10">
                  {t("about.contact.description")}
                </p>


                <div className="space-y-6">
                  <div>
                    <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest mb-1">
                      {t("about.contact.addressLabel")}
                    </p>
                    <p className="text-white text-base">
                      {t("about.contact.address")}
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest mb-1">
                      {t("about.contact.emailLabel")}
                    </p>
                    <a
                      href="mailto:info@temp.fm"
                      className="text-white text-base hover:text-[var(--color-accent)] transition-colors"
                    >
                      info@temp.fm
                    </a>
                  </div>
                  <div>
                    <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest mb-1">
                      {t("about.contact.phoneLabel")}
                    </p>

                    <a
                      href="tel:+998555158840"
                      className="text-white text-base hover:text-[var(--color-accent)] transition-colors"
                    >
                      +998 55 515 88 40
                    </a>
                  </div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={0.15}>
              <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[12px] p-8 md:p-10">
                <h3 className="font-display text-2xl font-black uppercase tracking-tight text-white mb-6">
                  {t("about.contact.followUs")}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-8">
                  {t("about.contact.followDescription")}
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
                    {t("about.contact.liveAir")}
                  </p>

                  <div className="font-display text-5xl font-black text-[var(--color-accent)] tracking-tighter">
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
