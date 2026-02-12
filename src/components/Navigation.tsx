"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "Bosh sahifa" },
  { href: "/schedule", label: "Dasturlar" },
  { href: "/news", label: "Yangiliklar" },
  { href: "/advertising", label: "Reklama" },
  { href: "/about", label: "Biz haqimizda" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative w-[120px] h-10 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="TempFM Logo" className="w-full h-full object-contain" />
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

        {/* Live Button */}
        <a
          href="#listen"
          className="hidden md:flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-5 py-2.5 rounded-[10px] text-sm font-bold uppercase tracking-wider transition-colors"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
          Jonli Efir
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menyuni ochish va yopish"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-white"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-white"
          />
          <motion.span
            animate={
              mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
            }
            className="block w-6 h-0.5 bg-white"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-[var(--color-border)]"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-[10px] text-base font-medium tracking-wide uppercase transition-colors ${pathname === link.href
                    ? "text-white bg-[var(--color-bg-card)]"
                    : "text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-bg-card)]"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="#listen"
                className="mt-2 flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white px-5 py-3 rounded-[10px] text-sm font-bold uppercase tracking-wider"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
                </span>
                Jonli Efir
              </a>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
