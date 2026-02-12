"use client";

import { motion } from "framer-motion";
import AnimateIn from "@/components/AnimateIn";

const values = [
  {
    title: "Haqiqiy Ovoz",
    description:
      "Biz qoliplarga ergashmaymiz. Har bir ko‘rsatuv, har bir pleylist, har bir suhbat Toshkentliklarning haqiqiy hayotiy hikoyalariga asoslangan.",
    icon: "\u{1F3A4}",
  },
  {
    title: "Yoshlar Uchun",
    description:
      "Yoshlar tomonidan, yoshlar uchun yaratilgan. Biz O‘zbekistonning kelajak avlodi g‘oyalari, energiyasi va ijodini qo‘llab-quvvatlaymiz.",
    icon: "\u26A1",
  },
  {
    title: "Mahalliy Madaniyat",
    description:
      "Navoiydan hip-hopgacha, palovdan ko‘cha san’atigacha — biz Toshkentni dunyoda yagona qiladigan madaniyatni tarannum etamiz.",
    icon: "\u{1F30D}",
  },
  {
    title: "Innovatsiya",
    description:
      "Radio qayta kashf etildi. Biz yangi formatlar va raqamli yondashuvlar bilan chegaralarni kengaytiramiz.",
    icon: "\u{1F680}",
  },
];

const team = [
  {
    name: "Jasur Karimov",
    role: "Stansiya Direktori",
    bio: "Sobiq jurnalist, radio visioneri. Jasur 20 yoshida orzu qilgan radiostansiyani yaratish uchun bosma nashriyotni tark etdi.",
    initials: "JK",
    color: "bg-[var(--color-accent)]",
  },
  {
    name: "Dilnoza Rashidova",
    role: "Dasturlar Direktori",
    bio: "Dilnoza har bir efir soatini shakllantiradi. Madaniy dasturlar bo'yicha tajribasi bilan har bir shou maqsadli bo'lishini ta'minlaydi.",
    initials: "DR",
    color: "bg-emerald-600",
  },
  {
    name: "Sherzod Alimov",
    role: "Musiqa Muharriri",
    bio: "Ovozlar qomusi — o'zbek xalq kuy-qo'shiqlariyu jahon elektronikasigacha. Sherzod TempFM ning musiqiy qiyofasini yaratadi.",
    initials: "SA",
    color: "bg-violet-600",
  },
  {
    name: "Kamila Usmanova",
    role: "Bosh DJ",
    bio: "Kamila 16 yoshidan beri DJlik qiladi. Uning mikslari Toshkent tungi hayotining norasmiy saundtrekiga aylangan.",
    initials: "KU",
    color: "bg-amber-600",
  },
  {
    name: "Bobur Nazarov",
    role: "Yangiliklar Muharriri",
    bio: "O'tkir, tezkor va xolis. Bobur yosh o'zbekistonliklar uchun muhim bo'lgan mavzularni yoritishga mas'ul.",
    initials: "BN",
    color: "bg-sky-600",
  },
  {
    name: "Madina Yuldasheva",
    role: "Marketing Rahbari",
    bio: "Madina TempFM ni shahar bilan bog'laydi. Talabalar tadbirlaridan virusli kampaniyalargacha brendni jonli saqlaydi.",
    initials: "MY",
    color: "bg-pink-600",
  },
];

const stats = [
  { value: "5+", label: "Yil Efirda" },
  { value: "50+", label: "Haftalik Dasturlar" },
  { value: "200K+", label: "Oylik Tinglovchilar" },
  { value: "30+", label: "Jamoa A'zolari" },
];

const socials = [
  { name: "Instagram", href: "#" },
  { name: "Telegram", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "X / Twitter", href: "#" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[var(--color-accent)]/10 rounded-full blur-[128px]" />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 w-full">
          <AnimateIn delay={0.1}>
            <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-4">
              Biz Haqimizda
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-white mb-8">
              BIZ SHUNCHAKI <br />
              RADIO <span className="text-[var(--color-accent)]">EMASMIZ.</span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.35}>
            <p className="text-[var(--color-text-secondary)] text-lg md:text-xl max-w-2xl leading-relaxed">
              TempFM 88.4 — Toshkentning yurak urishi. Biz shahar madaniyatining ovozi, yangi musiqalar maskani va ijodkor yoshlar uyimiz.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Story / History */}
      <section className="py-24 md:py-32 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <AnimateIn direction="left">
              <div>
                <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                  Our Story
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
                  Started with
                  <br />
                  a Simple Idea
                </h2>
              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={0.15}>
              <div className="space-y-6">
                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
                  2021-yilda Toshkentdagi bir guruh yosh media mutaxassislari radio to'lqinlariga qarab, ularning dunyosini aks ettiruvchi hech narsa ko'rmadilar. Musiqa eskirgan, suhbatlar zerikarli, energiya yetishmas edi. Shuning uchun ular noldan yangi narsa yaratishga qaror qilishdi.
                </p>
                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
                  TempFM 88.4 Chilonzordagi xonadonlardan birida tashkil etilgan kichik studiyada ish boshladi. Uchta boshlovchi, bitta pult va bitta ishonch: o'zbek yoshlari o'z tilida gapiradigan — nafaqat o'zbek yoki rus tilida, balki ularning avlodi tilida so'zlaydigan radioga loyiq ekanligi.
                </p>
                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed">
                  Bugungi kunda biz Toshkent markazidagi zamonaviy studiyadan 24/7 rejimida efirga uzatamiz va har oy 200,000 dan ortiq tinglovchilarni qamrab olamiz. Jamoamiz 3 kishidan 30 dan ortiq kishiga yetdi — ammo maqsadimiz o'zgarmadi. Biz hali ham Toshkent yoshlariga baland, samimiy va haqiqiy ovoz berish uchun shu yerdamiz.
                </p>
              </div>
            </AnimateIn>
          </div>

          {/* Timeline Highlights */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                year: "2021",
                event: "TempFM Chilonzordagi kichik studiyadan ilk bor efirga chiqdi",
              },
              {
                year: "2022",
                event:
                  "50 ming oylik tinglovchiga erishildi; birinchi podkastlar ishga tushirildi",
              },
              {
                year: "2023",
                event:
                  "Yangi studiyaga ko'chib o'tildi; Toshkent musiqa festivallari bilan hamkorlik",
              },
              {
                year: "2024",
                event: "200 mingdan ortiq tinglovchi; 50 dan ortiq haftalik shoular",
              },
            ].map((item, i) => (
              <AnimateIn key={item.year} delay={i * 0.1}>
                <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[12px] p-6">
                  <div className="font-[family-name:var(--font-display)] text-3xl font-black text-[var(--color-accent)] tracking-tight mb-2">
                    {item.year}
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {item.event}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-24 md:py-32 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <div className="text-center mb-16">
              <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                Bizning Maqsadimiz
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
                Missiya va Qadriyatlar
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Bizning har bir qadamimiz to'rtta tamoyilga asoslanadi. Ular bizning dasturlarimizni, madaniyatimizni va tinglovchilarimizga bo'lgan munosabatimizni belgilaydi.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((value, i) => (
              <AnimateIn key={value.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] p-6 md:p-8 transition-colors h-full"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="border-y border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <AnimateIn key={stat.label} delay={i * 0.1}>
                <div
                  className={`py-10 md:py-14 text-center ${i < stats.length - 1
                    ? "border-r border-[var(--color-border)]"
                    : ""
                    }`}
                >
                  <div className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-black text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[var(--color-text-secondary)] text-sm mt-2 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <AnimateIn>
            <div className="text-center mb-16">
              <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                Jamoa
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
                Jamoa Bilan Tanishish
              </h2>
              <p className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                TempFM 88.4 ortidagi ovozlar, g'oyalar va insonlar. Toshkent madaniyati bilan yashaydigan ijodkorlar jamoasi.
              </p>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map((member, i) => (
              <AnimateIn key={member.name} delay={i * 0.08}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="group bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] p-6 md:p-8 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className={`${member.color} w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg tracking-wide shrink-0`}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-black uppercase tracking-tight text-white group-hover:text-[var(--color-accent)] transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest">
                        {member.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </motion.div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24 md:py-32 border-t border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimateIn direction="left">
              <div>
                <p className="text-[var(--color-accent)] text-sm font-bold uppercase tracking-widest mb-3">
                  Aloqa
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-6">
                  Bog'lanish
                </h2>
                <p className="text-[var(--color-text-secondary)] text-base md:text-lg leading-relaxed max-w-md mb-10">
                  G'oyangiz bormi? Hamkorlik qilmoqchimisiz? Efir vaqti kerakmi?
                  Biz har doim madaniyatni rivojlantiruvchi suhbatlarga ochiqmiz.
                </p>

                <div className="space-y-6">
                  <div>
                    <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest mb-1">
                      Manzil
                    </p>
                    <p className="text-white text-base">
                      Toshkent City, O'zbekiston
                    </p>
                  </div>
                  <div>
                    <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:hello@tempfm.uz"
                      className="text-white text-base hover:text-[var(--color-accent)] transition-colors"
                    >
                      hello@tempfm.uz
                    </a>
                  </div>
                  <div>
                    <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest mb-1">
                      Telefon
                    </p>
                    <a
                      href="tel:+998712000884"
                      className="text-white text-base hover:text-[var(--color-accent)] transition-colors"
                    >
                      +998 71 200 08 84
                    </a>
                  </div>
                </div>
              </div>
            </AnimateIn>

            <AnimateIn direction="right" delay={0.15}>
              <div className="bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-[12px] p-8 md:p-10">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-black uppercase tracking-tight text-white mb-6">
                  Bizni Kuzating
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-8">
                  TempFM bilan barcha platformalarda aloqada bo'ling.
                  Efir ortidagi jarayonlar, jonli yangiliklar, pleylistlar va boshqalar.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {socials.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.03 }}
                      className="bg-[var(--color-bg)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] rounded-[12px] px-5 py-4 text-center text-white text-sm font-bold uppercase tracking-wider transition-colors hover:text-[var(--color-accent)]"
                    >
                      {social.name}
                    </motion.a>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
                  <p className="text-[var(--color-text-muted)] text-xs uppercase tracking-widest mb-3">
                    Jonli Efir
                  </p>
                  <div className="font-[family-name:var(--font-display)] text-5xl font-black text-[var(--color-accent)] tracking-tighter">
                    88.4 FM
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>
    </>
  );
}
