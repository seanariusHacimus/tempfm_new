import type { Metadata } from "next";

// Internal preview: not linked from the site and kept out of search engines.
export const metadata: Metadata = {
    title: "Equalizer preview — TempFM 88.4",
    robots: { index: false, follow: false },
};

export default function EqualizerLabLayout({ children }: { children: React.ReactNode }) {
    return children;
}
