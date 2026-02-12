"use client";

import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";
import PageHeader from "@/components/PageHeader";

interface NewsArticle {
  id: number;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  featured?: boolean;
}

const featuredArticle: NewsArticle = {
  id: 0,
  category: "E'lon",
  date: "10-Fevral, 2026",
  title: "TempFM 88.4 2026-yilni Yangi Studiya va Kengaytirilgan Dastur bilan Boshlamoqda",
  excerpt:
    "Bir necha oylik ta'mirlash ishlaridan so'ng, TempFM Toshkent markazida o'zining zamonaviy studiyasini taqdim etdi. Yangi makonda jonli ijro zali, ochiq osmon ostidagi tom qismi va ovoz sifatini butunlay yangi darajaga olib chiquvchi uskunalar mavjud. Shuningdek, bahorda 12 ta yangi shou ishga tushiriladi — o'zbek indi musiqasidan tortib texnologiya va tungi she'riyatgacha. Bu TempFM tarixidagi eng katta yangilanish.",
  featured: true,
};

const articles: NewsArticle[] = [
  {
    id: 1,
    category: "Yangi Shou",
    date: "8-Fevral, 2026",
    title: "\"Ipak Yo'li Sadolari\" — Markaziy Osiyo Musiqasi Haqida Yangi Haftalik Shou",
    excerpt:
      "Har payshanba soat 20:00 da boshlovchi Aziza Karimova sizni Toshkent, Olmaota, Bishkek va boshqa shaharlar musiqa sahnasi bo'ylab sayohatga taklif qiladi. Jonli DJ setlar, san'atkorlar bilan suhbatlar va mintaqadagi eng yangi taronalar premyerasi.",
  },
  {
    id: 2,
    category: "Intervyu",
    date: "5-Fevral, 2026",
    title: "Sevara Nazarxon Yangi Albomi va O'zbek Pop Musiqasi Kelajagi Haqida",
    excerpt:
      "TempFM 'Morning Pulse' dasturidagi eksklyuziv suhbatda Sevara milliy kuylarni zamonaviy aranjorovka bilan uyg'unlashtirish, bo'lajak konsert safari va nega aynan Toshkent yoshlari Markaziy Osiyo musiqasining kelajagi ekanligi haqida so'zlab berdi.",
  },
  {
    id: 3,
    category: "Mahalliy Tadbir",
    date: "30-Yanvar, 2026",
    title: "TempFM va Tashkent City Mall Jonli Musiqa Haftaliklarini Yo'lga Qo'ymoqda",
    excerpt:
      "Fevral oyidan boshlab har shanba Tashkent City Mall markaziy atriumida mahalliy san'atkorlarning jonli chiqishlari bo'lib o'tadi. TempFM DJ'lari tadbirga mezbonlik qiladi. Kirish bepul.",
  },
  {
    id: 4,
    category: "Ilova Yangilanishi",
    date: "25-Yanvar, 2026",
    title: "Ilova 3.0: TempFM Endi Tarmog'siz Ham Siz Bilan",
    excerpt:
      "TempFM ilovasining eng so'nggi versiyasi chiqdi. 3.0 versiyasida podkastlarni yuklab olish, yangilangan pleyer interfeysi, shaxsiy tavsiyalar va jonli efir vaqtida chat imkoniyati mavjud. iOS va Android uchun yuklab oling.",
  },
  {
    id: 5,
    category: "Reyting",
    date: "20-Yanvar, 2026",
    title: "TempFM Top 20: Yanvar Oyining Eng Ko'p Tinglangan Taronalari",
    excerpt:
      "Mahalliy xitlardan tortib jahon yulduzlarigacha — Toshkent bu oy nimalarni tingladi? Spoiler: tarixda ilk bor uchta o'zbek ijrochisi kuchli beshlikdan joy oldi.",
  },
  {
    id: 6,
    category: "Hamjamiyat",
    date: "15-Yanvar, 2026",
    title: "Ochiq Mikrofon Kechalari Qaytmoqda — Ro'yxatdan O'ting",
    excerpt:
      "Bizning oylik ochiq mikrofon loyihamiz 2026-yilda yana qaytmoqda. Rep, vokal, she'riyat yoki cholg'u ijrosi — TempFM sahnasi siz uchun ochiq. Keyingi sessiya: 22-fevral. Joylar cheklangan.",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageHeader
        label="Kuzatib Boring"
        title="YANGILIKLAR &"
        titleAccent="O'ZGARISHLAR"
        description="TempFM 88.4 da sodir bo'layotgan barcha voqealar — yangi shoular, tadbirlar, san'atkorlar va stansiya yangiliklari to'g'ridan-to'g'ri Toshkentdan."
      />

      {/* Featured Article */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn delay={0.1}>
            <motion.article
              whileHover={{ scale: 1.005 }}
              className="group relative bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] p-8 md:p-12 transition-colors cursor-pointer overflow-hidden"
            >
              {/* Accent gradient overlay */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--color-accent)]/5 to-transparent pointer-events-none" />

              <div className="relative">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="bg-[var(--color-accent)] text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-[12px]">
                    Tanlangan
                  </span>
                  <span className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest">
                    {featuredArticle.category}
                  </span>
                  <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                    {featuredArticle.date}
                  </span>
                </div>

                <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-white leading-[0.95] mb-6 group-hover:text-[var(--color-accent)] transition-colors max-w-4xl">
                  {featuredArticle.title}
                </h2>

                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
                  {featuredArticle.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-wider group-hover:text-[var(--color-accent)] transition-colors">
                  To'liq O'qish
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </motion.article>
          </AnimateIn>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <div className="flex items-end justify-between mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                So'nggi Yangiliklar
              </h2>
              <span className="hidden md:inline-flex text-[var(--color-text-muted)] text-sm uppercase tracking-wider">
                {articles.length} Maqola
              </span>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((article, i) => (
              <AnimateIn key={article.id} delay={i * 0.08}>
                <motion.article
                  whileHover={{ scale: 1.01 }}
                  className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] p-6 md:p-8 transition-colors cursor-pointer h-full flex flex-col"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest">
                      {article.category}
                    </span>
                    <span className="text-[var(--color-text-muted)] text-xs uppercase tracking-wider">
                      {article.date}
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-black uppercase tracking-tight text-white leading-[0.95] mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-6 flex-1">
                    {article.excerpt}
                  </p>

                  <span className="inline-flex items-center gap-2 text-[var(--color-text-muted)] font-bold text-xs uppercase tracking-wider group-hover:text-[var(--color-accent)] transition-colors">
                    Batafsil
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
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </motion.article>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Load More */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimateIn>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-card-hover)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] text-white px-10 py-4 rounded-[12px] text-sm font-bold uppercase tracking-wider transition-colors"
            >
              Ko'proq Yuklash
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </motion.button>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
