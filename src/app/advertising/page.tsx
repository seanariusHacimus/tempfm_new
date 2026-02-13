"use client";

import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";
import PageHeader from "@/components/PageHeader";
import { useTranslation } from "@/i18n";

export default function AdvertisingPage() {
  const { t, dict } = useTranslation();

  const benefits = dict.advertising.benefits.items;
  const adFormats = dict.advertising.formats.items;
  const pricingTiers = dict.advertising.pricing.tiers;

  return (
    <>
      <PageHeader
        label={t("advertising.header.label")}
        title={t("advertising.header.title")}
        titleAccent={t("advertising.header.titleAccent")}
        description={t("advertising.header.description")}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-8 py-4 rounded-[12px] text-base font-display font-bold uppercase tracking-wider transition-colors"
          >
            {t("advertising.header.ctaPackages")}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] border border-[var(--color-border)] text-white px-8 py-4 rounded-[12px] text-base font-display font-bold uppercase tracking-wider transition-colors"
          >
            {t("advertising.header.ctaContact")}
          </a>
        </div>
      </PageHeader>

      {/* Why Advertise */}
      <section className="py-24 md:py-32 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <div className="mb-14">
              <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                {t("advertising.benefits.label")}
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
                {t("advertising.benefits.title")}
              </h2>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit: { value: string; label: string; description: string }, i: number) => (
              <AnimateIn key={benefit.label} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] p-6 md:p-8 transition-colors h-full"
                >
                  <div className="font-display text-4xl md:text-5xl font-black text-[var(--color-accent)] tracking-tight mb-2">
                    {benefit.value}
                  </div>
                  <div className="text-white text-sm font-display font-bold uppercase tracking-wider mb-3">
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
                {t("advertising.formats.label")}
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
                {t("advertising.formats.title")}
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl leading-relaxed">
                {t("advertising.formats.description")}
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {adFormats.map((format: { title: string; duration: string; description: string; features: string[] }, i: number) => (
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
                  <h3 className="font-display text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-[var(--color-accent)] transition-colors">
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
                {t("advertising.pricing.label")}
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
                {t("advertising.pricing.title")}
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                {t("advertising.pricing.description")}
              </p>
            </div>
          </AnimateIn>

          <div className="flex flex-col items-center justify-center py-12">
            <AnimateIn delay={0.1}>
              <div className="bg-[var(--color-bg-card)] border border-[var(--color-accent)]/20 rounded-[20px] p-8 md:p-12 text-center max-w-3xl mx-auto shadow-[0_0_50px_-12px_rgba(255,61,0,0.1)]">
                <h3 className="font-display text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
                  {t("advertising.pricing.negotiable")}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-lg mb-8 max-w-xl mx-auto">
                  {t("advertising.pricing.description")}
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-8 py-4 rounded-[12px] text-base font-display font-bold uppercase tracking-wider transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,61,0,0.3)]"
                >
                  {t("advertising.pricing.contactButton")}
                </a>
              </div>
            </AnimateIn>
          </div>

          <AnimateIn delay={0.3}>
            <p className="text-center text-[var(--color-text-muted)] text-sm mt-8">
              {t("advertising.pricing.priceNote")}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* CTA */}
      <section
        id="contact"
        className="py-24 md:py-32 border-t border-[var(--color-border)] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimateIn>
            <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
              {t("advertising.cta.label")}
            </p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white mb-6">
              {t("advertising.cta.titleLine1")}
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-lg mx-auto mb-10">
              {t("advertising.cta.description")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="mailto:info@temp.fm"
                className="inline-flex items-center gap-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-10 py-5 rounded-[12px] text-lg font-display font-bold uppercase tracking-wider transition-colors"
              >
                info@temp.fm
              </a>
              <div className="flex flex-col gap-2">
                <a
                  href="tel:+998955602222"
                  className="inline-flex items-center gap-3 bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] border border-[var(--color-border)] text-white px-8 py-4 rounded-[12px] text-base font-display font-bold uppercase tracking-wider transition-colors"
                >
                  +998 95 560 22 22
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
