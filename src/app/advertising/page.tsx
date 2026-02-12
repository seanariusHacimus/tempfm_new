"use client";

import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";

const benefits = [
  {
    value: "200K+",
    label: "Monthly Listeners",
    description:
      "Reach over 200,000 active listeners across Tashkent and beyond every month through FM broadcast and digital streams.",
  },
  {
    value: "18–30",
    label: "Core Demographic",
    description:
      "Our audience is Tashkent's most active consumer group — university students, young professionals, and creatives.",
  },
  {
    value: "4.2M",
    label: "Monthly Impressions",
    description:
      "Combined on-air and digital impressions across FM broadcast, website, social media, and streaming platforms.",
  },
  {
    value: "12+",
    label: "Ad Formats",
    description:
      "From classic radio spots to branded podcast segments, social media takeovers, and live event integrations.",
  },
];

const adFormats = [
  {
    title: "Spot Ads",
    duration: "15 / 30 / 60 sec",
    description:
      "Classic radio advertising at its finest. Your message delivered during peak listening hours with professional voice-over production included. Run during Morning Pulse, Night Drive, or across our full broadcast schedule.",
    features: [
      "Professional production included",
      "Peak & off-peak scheduling",
      "Frequency discounts available",
      "A/B creative testing",
    ],
  },
  {
    title: "Show Sponsorship",
    duration: "Weekly / Monthly",
    description:
      "Become the presenting sponsor of TempFM's most popular shows. Your brand woven into the fabric of programs that Tashkent's youth tune into daily — from Morning Pulse to The Underground.",
    features: [
      "Branded show intros & outros",
      "Host-read endorsements",
      "Exclusive category ownership",
      "Social media cross-promotion",
    ],
  },
  {
    title: "Digital Campaigns",
    duration: "Flexible",
    description:
      "Extend your reach beyond FM. Targeted campaigns across our website, mobile app, social channels, and streaming platform — with detailed analytics and audience insights.",
    features: [
      "Website banner & pre-roll ads",
      "Social media integration",
      "Newsletter sponsorship",
      "Real-time performance dashboards",
    ],
  },
  {
    title: "Event Partnerships",
    duration: "Per Event",
    description:
      "TempFM hosts and sponsors Tashkent's biggest youth events — concerts, festivals, and cultural gatherings. Put your brand in front of thousands of engaged young consumers face-to-face.",
    features: [
      "On-site brand activation",
      "Stage naming rights",
      "VIP experience branding",
      "Live broadcast mentions",
    ],
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "2 500 000",
    period: "/ month",
    description:
      "Perfect for local businesses looking to reach Tashkent's youth audience with consistent on-air presence.",
    features: [
      "10 spot ads per week (15 sec)",
      "Off-peak scheduling",
      "Basic production included",
      "Monthly performance report",
      "1 social media mention",
    ],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "7 500 000",
    period: "/ month",
    description:
      "For brands ready to own a bigger share of voice across TempFM's on-air and digital platforms.",
    features: [
      "25 spot ads per week (30 sec)",
      "Peak & off-peak scheduling",
      "Premium production with music",
      "Show sponsorship (1 show)",
      "Weekly social media posts",
      "Website banner placement",
      "Bi-weekly performance reports",
    ],
    highlighted: true,
  },
  {
    name: "Premium",
    price: "15 000 000",
    period: "/ month",
    description:
      "Full-scale partnership for brands that want to become synonymous with Tashkent's youth culture.",
    features: [
      "Unlimited spot ads (60 sec)",
      "Priority peak scheduling",
      "Full creative production suite",
      "Show sponsorship (up to 3 shows)",
      "Daily social media presence",
      "Dedicated digital campaign",
      "Event partnership access",
      "Dedicated account manager",
      "Real-time analytics dashboard",
    ],
    highlighted: false,
  },
];

export default function AdvertisingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[var(--color-accent)]/8 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[var(--color-accent)]/5 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
          <AnimateIn delay={0.1}>
            <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-4">
              Advertise with TempFM
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-white mb-6">
              Your Brand.
              <br />
              <span className="text-[var(--color-accent)]">Their Frequency.</span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.35}>
            <p className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-xl leading-relaxed mb-10">
              TempFM 88.4 is where Tashkent&apos;s youth lives. Over 200,000 monthly listeners, aged 18 to 30, tuned in and engaged. Put your brand at the center of the conversation.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-8 py-4 rounded-[12px] text-base font-bold uppercase tracking-wider transition-colors"
              >
                View Packages
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] border border-[var(--color-border)] text-white px-8 py-4 rounded-[12px] text-base font-bold uppercase tracking-wider transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Why Advertise */}
      <section className="py-24 md:py-32 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <div className="mb-14">
              <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                Why TempFM
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
                Numbers That Move
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, i) => (
              <AnimateIn key={benefit.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] p-6 md:p-8 transition-colors h-full"
                >
                  <div className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-black text-[var(--color-accent)] tracking-tight mb-2">
                    {benefit.value}
                  </div>
                  <div className="text-white text-sm font-bold uppercase tracking-wider mb-3">
                    {benefit.label}
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Advertising Formats */}
      <section className="py-24 md:py-32 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <div className="mb-14">
              <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                Ad Formats
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
                Every Channel. One Audience.
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl leading-relaxed">
                Whether it&apos;s a 15-second spot or a full event partnership, we&apos;ll craft the right format to connect your brand with Tashkent&apos;s most engaged demographic.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adFormats.map((format, i) => (
              <AnimateIn key={format.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] p-6 md:p-8 transition-colors h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest">
                      {format.duration}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                    {format.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-6">
                    {format.description}
                  </p>
                  <ul className="mt-auto space-y-2">
                    {format.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-[var(--color-text-secondary)] text-sm"
                      >
                        <span className="w-1 h-1 rounded-full bg-[var(--color-accent)] shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-24 md:py-32 border-t border-[var(--color-border)]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <div className="text-center mb-14">
              <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                Pricing
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
                Packages That Scale
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                Transparent pricing built for every stage of growth. All packages include production support and dedicated account coordination.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {pricingTiers.map((tier, i) => (
              <AnimateIn key={tier.name} delay={i * 0.15}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`relative bg-[var(--color-bg-card)] border rounded-[12px] p-6 md:p-8 transition-colors h-full flex flex-col ${
                    tier.highlighted
                      ? "border-[var(--color-accent)]"
                      : "border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-6 bg-[var(--color-accent)] text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-4">
                      {tier.name}
                    </h3>
                    <div className="flex items-baseline gap-1">
                      <span className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-black text-white tracking-tight">
                        {tier.price}
                      </span>
                      <span className="text-[var(--color-text-muted)] text-sm uppercase tracking-wider">
                        UZS {tier.period}
                      </span>
                    </div>
                    <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mt-3">
                      {tier.description}
                    </p>
                  </div>

                  <div className="border-t border-[var(--color-border)] pt-6 mt-auto">
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-[var(--color-text-secondary)] text-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-1.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="#contact"
                      className={`block w-full text-center px-6 py-3.5 rounded-[12px] text-sm font-bold uppercase tracking-wider transition-colors ${
                        tier.highlighted
                          ? "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white"
                          : "bg-[var(--color-bg-card-hover)] hover:bg-[var(--color-accent)] border border-[var(--color-border)] hover:border-transparent text-white"
                      }`}
                    >
                      Get Started
                    </a>
                  </div>
                </motion.div>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn delay={0.3}>
            <p className="text-center text-[var(--color-text-muted)] text-sm mt-8">
              All prices in Uzbekistani Sum (UZS). Custom packages available. Contact us for enterprise and long-term partnership rates.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section
        id="contact"
        className="py-24 md:py-32 border-t border-[var(--color-border)]"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimateIn>
            <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
              Let&apos;s Talk
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white mb-6">
              Ready to Reach
              <br />
              <span className="text-[var(--color-accent)]">Tashkent&apos;s Youth?</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-lg mx-auto mb-10">
              Get in touch with our advertising team. We&apos;ll build a custom campaign that puts your brand where it matters — on the frequency Tashkent&apos;s next generation is already tuned into.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:ads@tempfm.uz"
                className="inline-flex items-center gap-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-10 py-5 rounded-[12px] text-lg font-bold uppercase tracking-wider transition-colors"
              >
                ads@tempfm.uz
              </a>
              <a
                href="tel:+998712000088"
                className="inline-flex items-center gap-3 bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] border border-[var(--color-border)] text-white px-10 py-5 rounded-[12px] text-lg font-bold uppercase tracking-wider transition-colors"
              >
                +998 71 200 00 88
              </a>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
