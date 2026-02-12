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
  category: "Yangiliklar",
  date: "Har kuni",
  title: "O‘zbekistonda va butun dunyoda sodir bo‘lgan eng so‘nggi voqealar TempFM da!",
  excerpt:
    "Siyosat, iqtisodiyot, madaniyat, sport va boshqa jabhalardagi eng muhim xabarlarni bizning yangiliklar dasturimizda kuzatib boring. Har kuni 5 daqiqa ichida dunyo nigohingizda! Bizning boshlovchilarimiz Go‘zal Karimova va Anna Axperjan'yans sizni eng so'nggi voqealar bilan tanishtirib borishadi.",
  featured: true,
};

const articles: NewsArticle[] = [
  {
    id: 1,
    category: "Maxsus format",
    date: "Oyda bir marotaba",
    title: "Live - konsertlar: Sevimli yulduzlaringiz bilan jonli muloqot",
    excerpt:
      "Temp fm radiosining jonli efirida o‘zbek estrada yulduzlari, xonanda va sozandalar ishtirokida mo‘jaz sahnamizdagi eksklyuziv konsertdan bahramand bo‘ling. Yangi qo‘shiqlar taqdimoti va xit taronalar — hammasi jonli va shaffof!",
  },
  {
    id: 2,
    category: "Loyiha",
    date: "Har shanba, 16:30",
    title: "Afisha – Madaniy xordiq chiqarish uchun eng yaxshi tanlov",
    excerpt:
      "Ko'ngilochar dasturlar, ko'rgazmalar va shahrimizdagi eng qiziqarli tadbirlar haqida har shanba “Afisha” loyihasi orqali bilib olishingiz mumkin. Madaniy xordiq uchun tanlov o'zingizga havola!",
  },
  {
    id: 3,
    category: "Intervyu",
    date: "Haftalik",
    title: "Danata Davronova bilan “Korotkiye vstrechi”",
    excerpt:
      "Shifokorlar, olimlar, artistlar va jamoat arboblari bilan iliq va samimiy suhbatlar. Hayotiy voqealar, salomatlik, ta'lim va qadriyatlar haqida kutilmagan kashfiyotlar.",
  },
  {
    id: 4,
    category: "Tahlil",
    date: "Shanba, 12:00",
    title: "Hafta yangiliklari: Muhim voqealar sharhi",
    excerpt:
      "Hafta davomida sodir bo‘lgan eng muhim voqealarning yakuniy soni va tahliliy mushoxada. Dunyoda va O'zbekistonda ro'y bergan yangiliklarning tahlili va sharhi.",
  },
  {
    id: 5,
    category: "Loyiha",
    date: "Haftalik",
    title: "Kamilla Mo‘minova bilan “Prosto o vajnom”",
    excerpt:
      "Mablag‘, kasb, oila, shaxsiy rivojlanish va texnologiyalar haqida hayotiy misollar va manfaatli tavsiyalar. Mutaxassislar bilan dolzarb savollarga javob topamiz.",
  },
  {
    id: 6,
    category: "Efir pallasida",
    date: "Dushanba - Juma",
    title: "Kunduzgi ritm – Kuningizni yuqori kayfiyatda o'tkazing",
    excerpt:
      "Tabriklar, o‘yinlar, hikoyalar va dilga yaqin taronalar. Jasmin Isroilova bilan ishdagi murakkab topshiriqlar oson yechim topadi, yo‘ldagi vaqt esa maroqli o‘tadi.",
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
                    Asosiy
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
                  To'liq o'qish
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
                {articles.length} Maqolalar
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
              Ko'proq yuklash
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
