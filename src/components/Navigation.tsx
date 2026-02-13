"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

const linkHrefs = ["/", "/schedule", "/news", "/advertising", "/about"] as const;
const linkKeys = ["home", "schedule", "news", "advertising", "about"] as const;

/* ── Framer Motion variants for staggered link entrance ── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
};

const linkVariants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.2 } },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const, delay: 0.35 } },
  exit: { opacity: 0, y: 16, transition: { duration: 0.2 } },
};

export default function Navigation() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const links = linkHrefs.map((href, i) => ({
    href,
    label: t(`nav.${linkKeys[i]}`),
  }));

  /* ── Lock body scroll & listen for Escape key ── */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) closeMobile();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen, closeMobile]);

  /* ── Close menu on route change ── */
  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)] overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-[120px] h-10 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt={t("common.logoAlt")} className="w-full h-full object-contain" />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors rounded-[8px] ${pathname === link.href
                  ? "text-white"
                  : "text-[var(--color-text-secondary)] hover:text-white"
                  }`}
              >
                {pathname === link.href && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-[var(--color-bg-card)] rounded-[8px]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right side: Language Switcher + CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {/* CTA – Call to Air (desktop) */}
            <a
              href="tel:+998555158840"
              className="hidden md:flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-5 py-2.5 rounded-[10px] text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:shadow-[0_0_16px_rgba(255,61,0,0.4)] hover:scale-[1.03]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.958 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
              </svg>
              {t("nav.cta")}
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center"
              aria-label={t("nav.menuToggle")}
            >
              <div className="w-6 h-4 relative">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 w-full h-0.5 bg-white origin-center"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-[7px] left-0 w-full h-0.5 bg-white"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-white origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ━━━ Full-Page Mobile Menu Overlay ━━━ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 z-40 md:hidden bg-[var(--color-bg)]/[0.97] backdrop-blur-2xl flex flex-col"
          >
            {/* Spacer for the fixed navbar */}
            <div className="h-16 shrink-0" />

            {/* Subtle decorative accent line */}
            <div className="mx-8 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent" />

            {/* Nav Links */}
            <div className="flex-1 flex flex-col justify-center px-8 pb-40 gap-0">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.href} variants={linkVariants}>
                    <Link
                      href={link.href}
                      onClick={closeMobile}
                      className={`group flex items-center py-5 border-b transition-all duration-300 ${isActive
                        ? "border-[var(--color-accent)]/60"
                        : "border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
                        }`}
                    >
                      {/* Accent indicator for active link */}
                      <div
                        className={`w-1 h-8 rounded-full mr-5 transition-all duration-300 ${isActive
                          ? "bg-[var(--color-accent)] shadow-[0_0_12px_rgba(255,61,0,0.5)]"
                          : "bg-transparent group-hover:bg-[var(--color-border-hover)]"
                          }`}
                      />

                      <span
                        className={`font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider transition-all duration-300 ${isActive
                          ? "text-white"
                          : "text-[var(--color-text-secondary)] group-hover:text-white group-hover:translate-x-2"
                          }`}
                        style={{ display: "inline-block" }}
                      >
                        {link.label}
                      </span>

                      {/* Arrow for active item */}
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="ml-auto text-[var(--color-accent)] text-lg"
                        >
                          ●
                        </motion.span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* CTA Button */}
              <motion.div variants={ctaVariants} className="mt-8">
                <a
                  href="tel:+998555158840"
                  className="flex items-center justify-center gap-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-6 py-4 rounded-2xl text-base font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,61,0,0.4)] hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.958 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                  </svg>
                  {t("nav.cta")}
                </a>
              </motion.div>
            </div>

            {/* Bottom branding */}
            <div className="absolute bottom-28 left-0 right-0 flex justify-center opacity-20">
              <span className="font-display text-xs uppercase tracking-[0.3em] text-[var(--color-text-muted)]">
                TempFM 88.4
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
