"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/i18n";
import { XMarkIcon, PhoneIcon } from "@heroicons/react/24/outline";

interface ContactsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: "spring", duration: 0.5, bounce: 0.3 } as any
    },
    exit: { opacity: 0, scale: 0.95, y: 20 },
};

export default function ContactsModal({ isOpen, onClose }: ContactsModalProps) {
    const { t } = useTranslation();

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full max-w-md bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-[var(--color-text-muted)] hover:text-white transition-colors"
                        >
                            <XMarkIcon className="w-6 h-6" />
                        </button>

                        <h2 className="font-display text-2xl font-black uppercase tracking-tight text-white mb-6">
                            {t("contacts.modalTitle")}
                        </h2>

                        <div className="space-y-6">
                            {/* Live Ether */}
                            <div className="bg-[var(--color-bg)] rounded-xl p-4 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors shrink-0">
                                        <PhoneIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold text-lg mb-1">{t("contacts.live.label")}</h3>
                                        <p className="text-[var(--color-text-secondary)] text-xs mb-3">{t("contacts.live.desc")}</p>
                                        <a
                                            href={`tel:${t("contacts.live.phone").replace(/\s/g, "")}`}
                                            className="text-[var(--color-accent)] font-display font-black text-xl hover:text-white transition-colors"
                                        >
                                            {t("contacts.live.phone")}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Advertising */}
                            <div className="bg-[var(--color-bg)] rounded-xl p-4 border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[var(--color-text-muted)]/10 flex items-center justify-center text-[var(--color-text-muted)] shrink-0">
                                        <span className="font-bold text-lg">Ad</span>
                                    </div>
                                    <div className="w-full">
                                        <h3 className="text-white font-bold text-lg mb-1">{t("contacts.ad.label")}</h3>
                                        <p className="text-[var(--color-text-secondary)] text-xs mb-3">{t("contacts.ad.desc")}</p>

                                        <a
                                            href={`tel:${t("contacts.ad.phone1").replace(/\s/g, "")}`}
                                            className="text-white font-medium hover:text-[var(--color-accent)] transition-colors flex items-center justify-between group/link"
                                        >
                                            {t("contacts.ad.phone1")}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest">
                                TempFM 88.4
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
