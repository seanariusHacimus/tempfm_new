"use client";

import AnimateIn from "@/components/AnimateIn";
import ThreeBackground from "@/components/ThreeBackground";

interface PageHeaderProps {
    /** Small uppercase label above the title (e.g. "Biz Haqimizda") */
    label: string;
    /** Main title text — rendered before the accent word */
    title: string;
    /** Accent-colored word(s) in the title */
    titleAccent: string;
    /** Whether the accent comes after a line break (default: true) */
    accentOnNewLine?: boolean;
    /** Description paragraph below the title */
    description: string;
    /** Optional extra content below the description (e.g. CTA buttons) */
    children?: React.ReactNode;
}

export default function PageHeader({
    label,
    title,
    titleAccent,
    accentOnNewLine = true,
    description,
    children,
}: PageHeaderProps) {
    return (
        <section className="relative overflow-hidden">
            {/* Three.js background — clipped to this section only */}
            <div className="absolute inset-0 z-0">
                <ThreeBackground />
                {/* Bottom fade so animation blends into page content */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg)]" />
                {/* Subtle overlay to keep text readable */}
                <div className="absolute inset-0 bg-[var(--color-bg)]/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 pt-28 pb-12 sm:pt-32 sm:pb-16 md:pt-40 md:pb-20">
                <div className="max-w-7xl mx-auto px-5 sm:px-6">
                    <AnimateIn delay={0.1}>
                        <p className="text-[var(--color-accent)] text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 sm:mb-4">
                            {label}
                        </p>
                    </AnimateIn>

                    <AnimateIn delay={0.2}>
                        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-[0.85] tracking-wide text-white mb-5 sm:mb-6">
                            {title}
                            {accentOnNewLine ? <br /> : " "}
                            <span className="text-[var(--color-accent)]">{titleAccent}</span>
                        </h1>
                    </AnimateIn>

                    <AnimateIn delay={0.3}>
                        <p className="text-[var(--color-text-secondary)] text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
                            {description}
                        </p>
                    </AnimateIn>

                    {children && (
                        <AnimateIn delay={0.4}>
                            <div className="mt-8 sm:mt-10">
                                {children}
                            </div>
                        </AnimateIn>
                    )}
                </div>
            </div>
        </section>
    );
}
