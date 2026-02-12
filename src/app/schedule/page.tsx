"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";
import PageHeader from "@/components/PageHeader";

interface Show {
  time: string;
  title: string;
  host: string;
  description: string;
  genre: string;
  isNowPlaying?: boolean;
}

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

const days: { key: DayKey; label: string; short: string }[] = [
  { key: "mon", label: "Dushanba", short: "Dush" },
  { key: "tue", label: "Seshanba", short: "Sesh" },
  { key: "wed", label: "Chorshanba", short: "Chor" },
  { key: "thu", label: "Payshanba", short: "Pay" },
  { key: "fri", label: "Juma", short: "Jum" },
  { key: "sat", label: "Shanba", short: "Shan" },
  { key: "sun", label: "Yakshanba", short: "Yak" },
];

const schedule: Record<DayKey, Show[]> = {
  mon: [
    {
      time: "08:00 — 09:00",
      title: "Wake up shou",
      host: "Otabek Tojiboyev",
      description: "Tonggi interaktiv shou. 'Tonggi trafik' va 'Kim ekan' sahifalarida ishtirok eting. O'zbekiston yangiliklari va ob-havo ma'lumotlari bilan tanishing.",
      genre: "Tonggi Shou",
      isNowPlaying: true,
    },
    {
      time: "09:00 — 10:00",
      title: "Wake up shou",
      host: "Otabek Tojiboyev",
      description: "'Davlatim otam' va 'Tojim onam' sahifalari — eng muqaddas zotlar haqidagi ta'sirli hikoyalar va iliq xotiralar.",
      genre: "Tonggi Shou",
    },
    {
      time: "10:00 — 12:00",
      title: "Violetta bilan",
      host: "Violetta Tadjibayeva",
      description: "Madaniyat va tarix haqida qiziqarli faktlar. 'V uzatma' avtomobillar olami va 'Ta'm tarixi' gastronomik sayohat.",
      genre: "Madaniy",
    },
    {
      time: "12:00 — 14:00",
      title: "Kunduzgi ritm",
      host: "Jasmin Isroilova",
      description: "'Allo Temp' tabriklari va 'FM Pazl' o'yini. Sport yangiliklari va 'Chempion' viktorinasi bilan kunni qiziqarli o'tkazing.",
      genre: "Ko'ngilochar",
    },
    {
      time: "14:00 — 18:00",
      title: "Musiqiy Non-stop",
      host: "Auto Mix",
      description: "Eng sar sara taronalar ketma-ketligi va rus tilidagi yangiliklar bloklari.",
      genre: "Musiqa",
    },
    {
      time: "18:00 — 19:00",
      title: "Oqshom tempida",
      host: "Roksana Abidova",
      description: "'Yo'lda nima gap?' — Toshkent ko'chalaridagi tirbandliklar, yopilgan yo'llar va YHQ yangiliklari.",
      genre: "Kechki Shou",
    },
    {
      time: "19:00 — 20:00",
      title: "Oqshom tempida",
      host: "Roksana Abidova",
      description: "'Yurakdan gapiramiz' — tabriklar, salomlar va musiqa buyurtmalari. Dushanba kuni 'IQ athlet' sport interaktivi.",
      genre: "Kechki Shou",
    },
    {
      time: "20:00 — 21:00",
      title: "Oqshom jo'shqin ritmda",
      host: "Toni Lorenso",
      description: "Kundalik tashvishlarni unutib, yoqimli va samimiy muhitga sho'ng'ing. Salom va tabriklar vaqti.",
      genre: "Lounge",
    },
    {
      time: "21:00 — 08:00",
      title: "Tungi Temp",
      host: "Auto Mix",
      description: "Sokin musiqalar va kechki yangiliklar sadosi ostida hordiq chiqaring.",
      genre: "Ambient",
    },
  ],
  tue: [
    {
      time: "08:00 — 10:00",
      title: "Wake up shou",
      host: "Otabek Tojiboyev",
      description: "Uyg'onishga va tongni yuqori kayfiyatda boshlashga yordam beruvchi interaktiv loyiha.",
      genre: "Tonggi Shou",
    },
    {
      time: "10:00 — 12:00",
      title: "Mixail bilan",
      host: "Mixail Subeyev",
      description: "'Feyk yoki haqiqat' loyihasi va kutilmagan faktlar. Musiqiy xit-parad va qiziqarli topishmoqlar.",
      genre: "Interaktiv",
    },
    {
      time: "12:00 — 14:00",
      title: "Kunduzgi ritm",
      host: "Jasmin Isroilova",
      description: "Dastur tinglovchilarni kunning qoq yarmidan, kechga qadar yoqimli tempda qolishini ta'minlaydi.",
      genre: "Ko'ngilochar",
    },
    {
      time: "18:00 — 20:00",
      title: "Oqshom tempida",
      host: "Roksana Abidova",
      description: "Roksana kechki tirbandliklardagi vaqtni yuqori kayfiyatda o'tishiga yordam beradi.",
      genre: "Kechki Shou",
    },
    {
      time: "20:00 — 21:00",
      title: "Oqshom jo'shqin ritmda",
      host: "Toni Lorenso",
      description: "Yoqimli, samimiy va hayotga muhabbat uyg'otuvchi iliq muhit.",
      genre: "Lounge",
    },
  ],
  wed: [
    {
      time: "08:00 — 10:00",
      title: "Wake up shou",
      host: "Otabek Tojiboyev",
      description: "Tonggi interaktiv muloqot va yo'ldagi vaziyatlar tahlili.",
      genre: "Tonggi Shou",
    },
    {
      time: "10:00 — 12:00",
      title: "Violetta bilan",
      host: "Violetta Tadjibayeva",
      description: "Yangi bilimlar va zavq ila foydani birlashtiruvchi madaniy dasturlar.",
      genre: "Madaniy",
    },
    {
      time: "12:00 — 14:00",
      title: "Kunduzgi ritm",
      host: "Jasmin Isroilova",
      description: "Eski qadrdonlardek suhbat va dilga yaqin taronalar yangraydi.",
      genre: "Ko'ngilochar",
    },
    {
      time: "17:00 — 18:00",
      title: "Siz yolg'iz emassiz",
      host: "Go'zal Karimova",
      description: "Ijtimoiy ahamiyatga ega loyiha. Gender tenglik va ayollar huquqlari haqida keng ko'lamli ma'lumotlar.",
      genre: "Ijtimoiy",
    },
    {
      time: "18:00 — 20:00",
      title: "Oqshom tempida",
      host: "Roksana Abidova",
      description: "Kechki tirbandliklar va yo'l harakati qoidalaridagi yangiliklar yoritiladi.",
      genre: "Kechki Shou",
    },
    {
      time: "20:00 — 21:00",
      title: "Oqshom jo'shqin ritmda",
      host: "Toni Lorenso",
      description: "Toni Lorenso bilan kundalik tashvishlarni unuting.",
      genre: "Lounge",
    },
  ],
  thu: [
    {
      time: "08:00 — 10:00",
      title: "Wake up shou",
      host: "Otabek Tojiboyev",
      description: "Yangi kunga yuzda kulgu va labda tabassum bilan birga qadam qo'yamiz!",
      genre: "Tonggi Shou",
    },
    {
      time: "10:00 — 12:00",
      title: "Mixail bilan",
      host: "Mixail Subeyev",
      description: "Sezgi sinovdan o'tkaziladi, topishmoqlar yechiladi va yaxshi kayfiyat yaratiladi.",
      genre: "Interaktiv",
    },
    {
      time: "12:00 — 14:00",
      title: "Kunduzgi ritm",
      host: "Jasmin Isroilova",
      description: "Ishdagi murakkab topshiriqlar oson yechim topadi, yo'ldagi vaqt esa maroqli o'tadi.",
      genre: "Ko'ngilochar",
    },
    {
      time: "18:00 — 20:00",
      title: "Oqshom tempida",
      host: "Roksana Abidova",
      description: "Oqshom pallasida ikki soatlik efir tinglovchilarga hordiq onlarini bag'ishlaydi.",
      genre: "Kechki Shou",
    },
    {
      time: "20:00 — 21:00",
      title: "Oqshom jo'shqin ritmda",
      host: "Toni Lorenso",
      description: "Yoqimli va samimiy musiqa orqali hayotga bo'lgan muhabbatni his qiling.",
      genre: "Lounge",
    },
  ],
  fri: [
    {
      time: "08:00 — 10:00",
      title: "Wake up shou",
      host: "Otabek Tojiboyev",
      description: "Hafta yakunini yuqori kayfiyatda qarshi oling.",
      genre: "Tonggi Shou",
    },
    {
      time: "10:00 — 12:00",
      title: "Violetta bilan",
      host: "Violetta Tadjibayeva",
      description: "Ish jarayoni uchun yoqimli muhit va yangi bilimlar olish imkoniyati.",
      genre: "Madaniy",
    },
    {
      time: "12:00 — 14:00",
      title: "Kunduzgi ritm",
      host: "Jasmin Isroilova",
      description: "Hafta davomidagi eng so'nggi voqeliklardan xabardor bo'ling.",
      genre: "Ko'ngilochar",
    },
    {
      time: "18:00 — 20:00",
      title: "Oqshom tempida",
      host: "Roksana Abidova",
      description: "Dam olish kunlari oldidan yo'ldagi vaziyatlar va dil tortar qo'shiqlar.",
      genre: "Kechki Shou",
    },
    {
      time: "20:00 — 21:00",
      title: "Oqshom jo'shqin ritmda",
      host: "Toni Lorenso",
      description: "Hafta yakunini samimiy suhbat va musiqa bilan yakunlang.",
      genre: "Lounge",
    },
  ],
  sat: [
    {
      time: "06:00 — 12:00",
      title: "Muzika Non-stop",
      host: "Auto Mix",
      description: "Dam olish kunlari uchun maxsus tayyorlangan musiqiy to'plamlar.",
      genre: "Musiqa",
    },
    {
      time: "12:00 — 13:00",
      title: "Hafta yangiliklari",
      host: "Go'zal Karimova",
      description: "Tahliliy mushoxada va haftaning eng muhim yangiliklari sharhi.",
      genre: "Yangiliklar",
    },
    {
      time: "13:00 — 14:00",
      title: "Yo'l-yo'lakay",
      host: "Mehmonlar bilan",
      description: "Mashhur aktyorlar, musiqachilar, sportchilar va taniqli shaxslar bilan suhbatlar.",
      genre: "Intervyu",
    },
    {
      time: "14:00 — 15:00",
      title: "Yakanuniy yangiliklar",
      host: "Anna Axperjan'yans",
      description: "Rus tilida haftaning eng muhim yangiliklari va voqealar yakuni.",
      genre: "Yangiliklar",
    },
    {
      time: "15:00 — 16:30",
      title: "Muzika Non-stop",
      host: "Auto Mix",
      description: "Dam olish kuningizni maroqli o'tkazish uchun sara taronalar.",
      genre: "Musiqa",
    },
    {
      time: "16:30 — 17:30",
      title: "Afisha",
      host: "Boshlovchi",
      description: "Madaniy xordiq chiqarish uchun ko'ngilochar dasturlar haqida barchasini bilib oling!",
      genre: "Ko'ngilochar",
    },
    {
      time: "17:30 — 06:00",
      title: "Shanba Oqshomi",
      host: "DJ Mix",
      description: "Tungi Toshkent ritmini biz bilan his qiling.",
      genre: "Dance / Pop",
    },
  ],
  sun: [
    {
      time: "Kun Bo'yi",
      title: "Dam Olish Kuni",
      host: "Auto Mix",
      description: "Yakshanba hordig'i uchun eng saralangan va sokin musiqiy to'plam.",
      genre: "Lounge / Ambient",
    },
  ],
};

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState<DayKey>("mon");

  const activeShows = schedule[activeDay];
  const activeDayLabel =
    days.find((d) => d.key === activeDay)?.label ?? "Dushanba";

  return (
    <>
      <PageHeader
        label="Efirdan Boxabar Bo'ling"
        title="Haftalik"
        titleAccent="Jadval"
        description="24 soat, haftada 7 kun. Har bir shou, har bir boshlovchi va har bir musiqa — maxsus siz uchun tanlangan."
      />

      {/* Day Selector */}
      <section className="sticky top-16 z-30 bg-[var(--color-bg)]/80 backdrop-blur-xl border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 sm:gap-2 py-4 overflow-x-auto scrollbar-hide">
            {days.map((day) => (
              <button
                key={day.key}
                onClick={() => setActiveDay(day.key)}
                className={`relative flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-[12px] text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${activeDay === day.key
                  ? "bg-[var(--color-accent)] text-white"
                  : "bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-card-hover)] hover:text-white border border-[var(--color-border)]"
                  }`}
              >
                <span className="hidden sm:inline">{day.label}</span>
                <span className="sm:hidden">{day.short}</span>
                {activeDay === day.key && (
                  <motion.div
                    layoutId="activeDayIndicator"
                    className="absolute inset-0 bg-[var(--color-accent)] rounded-[12px] -z-10"
                    transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule List */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <div className="flex items-center justify-between mb-8 md:mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                {activeDayLabel}
              </h2>
              <span className="text-[var(--color-text-muted)] text-xs sm:text-sm uppercase tracking-wider">
                {activeShows.length} ko&apos;rsatuvlar
              </span>
            </div>
          </AnimateIn>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-3 md:gap-4"
            >
              {activeShows.map((show, index) => (
                <motion.div
                  key={`${activeDay}-${show.time}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <div
                    className={`group relative active:scale-[0.99] bg-[var(--color-bg-card)] border rounded-[12px] p-5 md:p-7 transition-all duration-200 hover:bg-[var(--color-bg-card-hover)] ${show.isNowPlaying
                      ? "border-[var(--color-accent)] shadow-[0_0_30px_rgba(255,61,0,0.1)]"
                      : "border-[var(--color-border)] hover:border-[var(--color-border-hover)]"
                      }`}
                  >
                    {/* Now Playing Badge */}
                    {show.isNowPlaying && (
                      <div className="absolute -top-3 left-5 md:left-7">
                        <span className="inline-flex items-center gap-1.5 bg-[var(--color-accent)] text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
                          </span>
                          Hozir Efirda
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                      {/* Time */}
                      <div className="flex-shrink-0 md:w-40 lg:w-48">
                        <span
                          className={`font-[family-name:var(--font-display)] text-lg md:text-xl font-black tracking-tight ${show.isNowPlaying
                            ? "text-[var(--color-accent)]"
                            : "text-[var(--color-text-secondary)]"
                            }`}
                        >
                          {show.time}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-2">
                          <h3
                            className={`font-[family-name:var(--font-display)] text-2xl md:text-3xl font-black uppercase tracking-tight transition-colors ${show.isNowPlaying
                              ? "text-[var(--color-accent)]"
                              : "text-white group-hover:text-[var(--color-accent)]"
                              }`}
                          >
                            {show.title}
                          </h3>
                          <span className="flex-shrink-0 inline-flex self-start bg-[var(--color-bg)]/60 border border-[var(--color-border)] text-[var(--color-text-muted)] text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                            {show.genre}
                          </span>
                        </div>

                        <p className="text-[var(--color-text-secondary)] text-sm md:text-base leading-relaxed mb-3">
                          {show.description}
                        </p>

                        <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                          Boshlovchi:{" "}
                          <span className="text-[var(--color-text-secondary)]">
                            {show.host}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimateIn>
            <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
              Hech bir shouni o&apos;tkazib yubormang
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white mb-6">
              Hoziroq Tinglang
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-md mx-auto mb-10">
              TempFM 88.4 jonli efirda. Toshkentda va butun dunyo bo&apos;ylab bizni radioda yoki onlayn tinglang.
            </p>
            <a
              href="/#listen"
              className="inline-flex items-center gap-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-10 py-5 rounded-[12px] text-base md:text-lg font-bold uppercase tracking-wider transition-colors"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
              </span>
              Jonli Efir — 88.4 FM
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
