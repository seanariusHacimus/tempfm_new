import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AudioProvider from "@/components/AudioProvider";
import ThreeBackground from "@/components/ThreeBackground";
import RadioPlayer from "@/components/RadioPlayer";
import "./globals.css";

export const metadata: Metadata = {
  title: "TempFM 88.4 — The Sound of Tashkent",
  description:
    "TempFM 88.4 streams podcasts, shows, and music in the rhythm of Tashkent City. Tune in to the sound of Uzbekistan's youth.",
  keywords: [
    "TempFM",
    "88.4",
    "Tashkent",
    "radio",
    "podcasts",
    "Uzbekistan",
    "music",
    "live radio",
  ],
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AudioProvider>
          <ThreeBackground />
          <Navigation />
          <main className="flex-1 pt-16 relative z-10">{children}</main>
          <Footer />
          <RadioPlayer />
        </AudioProvider>

        {/* SVG Distortion Filter for Liquid Glass effect */}
        <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style={{ position: "absolute", overflow: "hidden" }}>
          <defs>
            <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves={2} seed={92} result="noise" />
              <feGaussianBlur in="noise" stdDeviation={2} result="blurred" />
              <feDisplacementMap in="SourceGraphic" in2="blurred" scale={77} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      </body>
    </html>
  );
}
