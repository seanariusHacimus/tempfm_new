"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const languages = [
    {
        code: "uz",
        label: "O'zbekcha",
        flag: (
            <svg viewBox="0 0 640 480" className="w-5 h-4 rounded-sm shrink-0">
                <path fill="#1eb53a" d="M0 320h640v160H0z" />
                <path fill="#0099b5" d="M0 0h640v160H0z" />
                <path fill="#ce1126" d="M0 153.6h640v6.4H0zM0 320h640v6.4H0z" />
                <path fill="#fff" d="M0 160h640v160H0z" />
                <circle cx="134" cy="80" r="40" fill="#fff" />
                <circle cx="148" cy="80" r="33" fill="#0099b5" />
                {[...Array(12)].map((_, i) => (
                    <circle
                        key={i}
                        cx={220 + (i % 3) * 22}
                        cy={40 + Math.floor(i / 3) * 28}
                        r="6"
                        fill="#fff"
                    />
                ))}
            </svg>
        ),
    },
    {
        code: "ru",
        label: "Русский",
        flag: (
            <svg viewBox="0 0 640 480" className="w-5 h-4 rounded-sm shrink-0">
                <path fill="#fff" d="M0 0h640v160H0z" />
                <path fill="#0039a6" d="M0 160h640v160H0z" />
                <path fill="#d52b1e" d="M0 320h640v160H0z" />
            </svg>
        ),
    },
];

interface LanguageSwitcherProps {
    className?: string;
    position?: "fixed" | "static";
    direction?: "up" | "down";
}

export default function LanguageSwitcher({
    className = "",
    position = "fixed",
    direction = "up"
}: LanguageSwitcherProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(languages[0]);
    const [mounted, setMounted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 800);
        return () => clearTimeout(timer);
    }, []);

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const fixedClasses = "fixed bottom-24 right-6 z-50";
    const staticClasses = "relative z-50";
    const containerClasses = position === "fixed" ? fixedClasses : staticClasses;

    return (
        <motion.div
            ref={ref}
            initial={position === "fixed" ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            animate={position === "fixed" ? (mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }) : { opacity: 1, y: 0 }}
            transition={{
                duration: 0.7,
                ease: [0.25, 0.1, 0.25, 1],
                delay: position === "fixed" ? 0.3 : 0,
            }}
            className={`${containerClasses} ${className}`}
        >
            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: direction === "up" ? 8 : -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: direction === "up" ? 8 : -8, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`absolute ${direction === "up" ? "bottom-full mb-2" : "top-full mt-2"
                            } right-0 lang-switcher-dropdown overflow-hidden min-w-[160px]`}
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => {
                                    setSelected(lang);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${selected.code === lang.code
                                    ? "text-white bg-white/10"
                                    : "text-gray-300 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {lang.flag}
                                <span className="tracking-wide">{lang.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lang-switcher-btn flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-white/10 active:scale-95"
                title={selected.label}
            >
                {selected.flag}
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
                    className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                >
                    <polyline points="18 15 12 9 6 15" />
                </svg>
            </button>
        </motion.div>
    );
}
