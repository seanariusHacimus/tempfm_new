import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n";
import AudioProvider from "@/components/AudioProvider";
import Navigation from "@/components/Navigation";
import RadioPlayer from "@/components/RadioPlayer";
import HomeBackground from "@/components/HomeBackground";
import Footer from "@/components/Footer";

const petrovSans = localFont({
  src: [
    {
      path: "./fonts/petrov_sans/PetrovSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/petrov_sans/PetrovSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/petrov_sans/PetrovSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-petrov",
});

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "TempFM 88.4 — Toshkent radiosi",
  description: "TempFM 88.4 — Toshkentning eng yaxshi radiosi. Jonli efir, yangiliklar, va ko'proq.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className={`${petrovSans.variable} ${roboto.variable} antialiased`}>
        <I18nProvider>
          <AudioProvider>
            <HomeBackground />
            <Navigation />
            <main className="pt-16">
              {children}
            </main>
            <Footer />
            <RadioPlayer />
          </AudioProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
