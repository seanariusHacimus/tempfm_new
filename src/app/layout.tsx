import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AudioProvider from "@/components/AudioProvider";
import HomeBackground from "@/components/HomeBackground";
import RadioPlayer from "@/components/RadioPlayer";
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-roboto",
  display: "swap",
});

const petrovSans = localFont({
  src: [
    { path: "./fonts/petrov_sans/PetrovSans-Thin.ttf", weight: "100", style: "normal" },
    { path: "./fonts/petrov_sans/PetrovSans-ThinItalic.ttf", weight: "100", style: "italic" },
    { path: "./fonts/petrov_sans/PetrovSans-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "./fonts/petrov_sans/PetrovSans-ExtraLightItalic.ttf", weight: "200", style: "italic" },
    { path: "./fonts/petrov_sans/PetrovSans-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/petrov_sans/PetrovSans-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "./fonts/petrov_sans/PetrovSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/petrov_sans/PetrovSans-RegularItalic.ttf", weight: "400", style: "italic" },
    { path: "./fonts/petrov_sans/PetrovSans-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/petrov_sans/PetrovSans-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "./fonts/petrov_sans/PetrovSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/petrov_sans/PetrovSans-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "./fonts/petrov_sans/PetrovSans-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "./fonts/petrov_sans/PetrovSans-ExtraBoldItalic.ttf", weight: "800", style: "italic" },
    { path: "./fonts/petrov_sans/PetrovSans-Black.ttf", weight: "900", style: "normal" },
    { path: "./fonts/petrov_sans/PetrovSans-BlackItalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-petrov",
  display: "swap",
});

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
    <html lang="en" className={`${petrovSans.variable} ${roboto.variable}`}>
      <body className="min-h-screen flex flex-col">
        <AudioProvider>
          <HomeBackground />
          <Navigation />
          <main className="flex-1 relative z-10">{children}</main>
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
