import type { Dictionary } from "../context";

const uz: Dictionary = {
    /* ─── SEO ─── */
    seo: {
        home: {
            title: "TempFM 88.4 — Toshkentning Ovozi",
            description:
                "TempFM 88.4 podkastlar, shoular va musiqani Toshkent ritmida uzatadi. O'zbekiston yoshlarining to'lqiniga qo'shiling.",
            keywords:
                "TempFM, 88.4, Toshkent, radio, podkastlar, O'zbekiston, musiqa, jonli efir, FM radio",
        },
        about: {
            title: "Biz Haqimizda — TempFM 88.4",
            description:
                "TempFM 88.4 — Toshkentning yurak urishi. Shahar madaniyatining ovozi, yangi musiqalar maskani va ijodkor yoshlar uyi.",
            keywords:
                "TempFM jamoa, radio boshlovchilar, Toshkent radio, O'zbekiston media",
        },
        advertising: {
            title: "Reklama — TempFM 88.4",
            description:
                "O'zbekistonning eng faol va zamonaviy auditoriyasiga o'z brendingizni taniting. TempFM 88.4 bilan hamkorlik.",
            keywords:
                "radio reklama, TempFM reklama, Toshkent reklama, FM reklama narxlari",
        },
        news: {
            title: "Yangiliklar — TempFM 88.4",
            description:
                "TempFM 88.4 da sodir bo'layotgan barcha voqealar — yangi shoular, tadbirlar, san'atkorlar va stansiya yangiliklari.",
            keywords:
                "TempFM yangiliklar, radio yangiliklar, Toshkent voqealar, O'zbekiston yangiliklari",
        },
        schedule: {
            title: "Dasturlar Jadvali — TempFM 88.4",
            description:
                "TempFM 88.4 haftalik dasturlar jadvali. 24 soat, haftada 7 kun — har bir shou, har bir boshlovchi.",
            keywords:
                "TempFM jadval, radio dasturlar, haftalik jadval, efir jadvali",
        },
    },

    /* ─── Navigation ─── */
    nav: {
        home: "Bosh sahifa",
        schedule: "Dasturlar",
        news: "Yangiliklar",
        advertising: "Reklama",
        about: "Biz haqimizda",
        cta: "Efirga qo'ng'iroq",
        menuToggle: "Menyuni ochish va yopish",
    },

    /* ─── Footer ─── */
    footer: {
        tagline:
            "Toshkentning ovozi. Shahar ritmiga mos podkastlar, shoular va musiqa.",
        copyright: "Barcha huquqlar himoyalangan.",
        address: "Sariksuv Street, BHH Tower, Tashkent, Uzbekistan",
        groups: {
            station: "Stansiya",
            contact: "Bog'lanish",
            legal: "Qoidalar",
        },
        links: {
            schedule: "Dasturlar",
            news: "Yangiliklar",
            about: "Biz haqimizda",
            advertising: "Reklama",
            privacy: "Maxfiylik siyosati",
            terms: "Foydalanish shartlari",
            cookies: "Cookie siyosati",
        },
    },

    /* ─── Radio Player ─── */
    player: {
        onAir: "Efirda",
        reconnecting: "Qayta ulanmoqda...",
        streamError: "Oqim uzildi. Qayta tinglash uchun Play tugmasini bosing.",
        startError: "Oqimni boshlashda xatolik yuz berdi.",
        albumArt: "Albom muqovasi",
        nextTrack: "Keyingi tarona",
        next: "Keyingi",
        loading: "Yuklanmoqda...",
        fallbackTitle: "TempFM 88.4",
        fallbackArtist: "Jonli efir",
        unmute: "Ovozni yoqish",
        mute: "Ovozni o'chirish",
    },

    /* ─── Home Page ─── */
    home: {
        hero: {
            badge: "Jonli Efirda",
            titleLine1: "TOSHKENT",
            titleLine2: "OVOZI.",
            description:
                "Temp FM 88.4 — jonli musiqa ruhini targ'ib qiluvchi birinchi audiovizual radioto'lqin. Jonli videotasvirlar orqali radio, video va muloqotni birgina platformada uyg'unlashtiramiz.",
            ctaLive: "Jonli Efir",
            ctaSchedule: "Dasturlar",
        },
        stats: {
            frequency: "FM Chastota",
            listeners: "Oylik Tinglovchilar",
            liveAir: "Jonli Efir",
            weeklyShows: "Haftalik Dasturlar",
        },
        shows: {
            sectionLabel: "Efirda",
            sectionTitle: "Mashhur Dasturlar",
            fullSchedule: "To'liq Jadval →",
            hostLabel: "Boshlovchi:",
            items: [
                {
                    title: "Wake up",
                    time: "08:10 — 10:00",
                    host: "Otabek Tadjibayev",
                    description:
                        "Tonggi shou. Muallif va boshlovchi — Otabek Tadjibayev. Shou ruknlari: «Zumrasha», «Onam Tojam», bolalar ruknlari, ona va ota haqidagi ruknlar.",
                    tag: "Dushanba — juma",
                },
                {
                    title: "Vsem privety!",
                    time: "10:00 — 12:00",
                    host: "Viktor Nefyodov",
                    description:
                        "Axborot ruknlari bilan ko'ngilochar tong: Toshkent yo'llari, qiziqarli va musiqiy faktlar, kun bayrami, jonli efirda salom va tabriklar.",
                    tag: "Dushanba",
                },
                {
                    title: "Mixail Subeyev tonggi shousi",
                    time: "10:00 — 12:00",
                    host: "Mixail Subeyev",
                    description:
                        "Tarix, fan, madaniyat va noodatiy faktlar haqida axborot-ko'ngilochar shou. «Pravda ili feyk?» ruknida tinglovchilar qaysi fikr haqiqat ekanini topishadi.",
                    tag: "Seshanba, payshanba",
                },
                {
                    title: "Utro v tempe",
                    time: "10:00 — 12:00",
                    host: "Violetta Tadjibayeva",
                    description:
                        "Madaniyat, tarix va kundalik narsalarning ma'nosi haqida qiziqarli faktlar. Dasturda goroskop va «V peredacha».",
                    tag: "Chorshanba",
                },
                {
                    title: "TONY LORENZO tonggi shousi",
                    time: "10:00 — 12:00",
                    host: "TONY LORENZO",
                    description:
                        "Tonggi ko'ngilochar shou: kunning tarixiy voqealari va mashhur qo'shiqlarning yaratilish tarixi.",
                    tag: "Juma",
                },
                {
                    title: "Smart kommentarii s TONY",
                    time: "Seshanba",
                    host: "TONY LORENZO",
                    description:
                        "Texnologiyalar, fan va innovatsiyalar olamidan uchta yangilik — oddiy tilda va hazil bilan: nima sodir bo'ldi va bu hayotga qanday ta'sir qiladi.",
                    tag: "Seshanba · shanba kuni takror",
                },
                {
                    title: "FM Pazl",
                    time: "12:00 — 13:00",
                    host: "Jasmin Isroilova",
                    description:
                        "Tinglovchilar «pazl ko'rinishidagi» maqollarni to'g'ri topishlari kerak, g'olib muxlislar «Temp bilag'oni» maqomiga ega bo'ladilar.",
                    tag: "Dushanba — juma",
                },
                {
                    title: "Chempion",
                    time: "13:00 — 14:00",
                    host: "Jasmin Isroilova",
                    description:
                        "Sportga oid yangiliklar yangraydi va viktorina o'tkaziladi. Sport olamidagi qahramonlar, jamoalar haqida ma'lumotga ega bo'lsangiz imkoniyatni qo'ldan boy bermang, Temp arenasida o'zingizni ko'rsating va Chempion maqomiga erishing.",
                    tag: "Dushanba — juma",
                },
                {
                    title: "Oqshom tempida",
                    time: "18:00 — 20:00",
                    host: "Roksana Abidova",
                    description:
                        "Kun yakunida kerakli ma'lumot va foydali maslahatlar bilan kechki loyiha.",
                    tag: "Dushanba — juma",
                },
                {
                    title: "Korotkiye vstrechi",
                    time: "Chor 14:00 — 15:00 · Shan 11:00",
                    host: "Danata Davronova",
                    description:
                        "Mutaxassislar bilan mualliflik intervyu dasturi. Chorshanba kuni — har ikki haftada. Shanba kuni — mutaxassislar bilan intervyu.",
                    tag: "Chorshanba · shanba",
                },
                {
                    title: "Prosto o vajnom",
                    time: "15:00 — 16:00",
                    host: "Kamilla",
                    description:
                        "Hayotga ijobiy ta'sir etuvchi samimiy suhbatlar: mablag', kasb, oila va shaxsiy rivojlanish.",
                    tag: "Seshanba · shanba kuni takror",
                },
                {
                    title: "Roksana Abidova bilan podkast",
                    time: "Dush 14:00 — 15:00 · Shan 16:00 — 17:00",
                    host: "Roksana Abidova",
                    description: "Homiylik podkasti.",
                    tag: "Dushanba · shanba",
                },
            ],
        },
        about: {
            label: "Biz Haqimizda",
            titleLine1: "Jonli Musiqa",
            titleAccent: "Ruhi",
            description:
                "Jonli videotasvirlarni tadbiq etish orqali biz endi faqatgina ovoz bilan cheklanib qolmaymiz! Bu esa tomoshabin va tinglovchida ishtirok hissini kuchaytiradi, auditoriya qamrovini sezilarli darajada oshirib, radio, video va jonli muloqotni birgina platformada uyg'unlashtiradi.",
            learnMore: "Ko'proq Bilish →",
            fmLabel: "FM Toshkent",
        },
        cta: {
            label: "Hoziroq Tinglang",
            titleLine1: "Shunchaki varaqlamang.",
            titleAccent: "Tinglang.",
            description:
                "TempFM 88.4 jonli efirda. Yangiliklar, shoular, musiqa — Sizning kuningiz uchun hamroh.",
            button: "Jonli Efir — 88.4 FM",
        },
    },

    /* ─── About Page ─── */
    about: {
        header: {
            label: "Biz Haqimizda",
            title: "BIZ SHUNCHAKI RADIO",
            titleAccent: "EMASMIZ.",
            description:
                "TempFM 88.4 — Toshkentning yurak urishi. Biz shahar madaniyatining ovozi, yangi musiqalar maskani va ijodkor yoshlar uyimiz.",
        },
        history: {
            label: "Bizning Tariximiz",
            titleLine1: "Oddiy G'oyadan",
            titleLine2: "Boshlangan Yo'l",
            paragraphs: [
                "2021-yilda Toshkentdagi bir guruh yosh media mutaxassislari radio to'lqinlariga qarab, ularning dunyosini aks ettiruvchi hech narsa ko'rmadilar. Musiqa eskirgan, suhbatlar zerikarli, energiya yetishmas edi. Shuning uchun ular noldan yangi narsa yaratishga qaror qilishdi.",
                "TempFM 88.4 Chilonzordagi xonadonlardan birida tashkil etilgan kichik studiyada ish boshladi. Uchta boshlovchi, bitta pult va bitta ishonch: o'zbek yoshlari o'z tilida gapiradigan — nafaqat o'zbek yoki rus tilida, balki ularning avlodi tilida so'zlaydigan radioga loyiq ekanligi.",
                "Bugungi kunda biz Toshkent markazidagi zamonaviy studiyadan 24/7 rejimida efirga uzatamiz va har oy 200,000 dan ortiq tinglovchilarni qamrab olamiz. Jamoamiz 3 kishidan 30 dan ortiq kishiga yetdi — ammo maqsadimiz o'zgarmadi. Biz hali ham Toshkent yoshlariga baland, samimiy va haqiqiy ovoz berish uchun shu yerdamiz.",
            ],
            timeline: [
                {
                    year: "2021",
                    event:
                        "TempFM Chilonzordagi kichik studiyadan ilk bor efirga chiqdi",
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
            ],
        },
        values: {
            label: "Bizning Maqsadimiz",
            title: "Missiya va Qadriyatlar",
            description:
                "Bizning har bir qadamimiz to'rtta tamoyilga asoslanadi. Ular bizning dasturlarimizni, madaniyatimizni va tinglovchilarimizga bo'lgan munosabatimizni belgilaydi.",
            items: [
                {
                    title: "Haqiqiy Ovoz",
                    description:
                        "Biz qoliplarga ergashmaymiz. Har bir ko'rsatuv, har bir pleylist, har bir suhbat Toshkentliklarning haqiqiy hayotiy hikoyalariga asoslangan.",
                    icon: "\u{1F3A4}",
                },
                {
                    title: "Yoshlar Uchun",
                    description:
                        "Yoshlar tomonidan, yoshlar uchun yaratilgan. Biz O'zbekistonning kelajak avlodi g'oyalari, energiyasi va ijodini qo'llab-quvvatlaymiz.",
                    icon: "\u26A1",
                },
                {
                    title: "Mahalliy Madaniyat",
                    description:
                        "Navoiydan hip-hopgacha, palovdan ko'cha san'atigacha — biz Toshkentni dunyoda yagona qiladigan madaniyatni tarannum etamiz.",
                    icon: "\u{1F30D}",
                },
                {
                    title: "Innovatsiya",
                    description:
                        "Radio qayta kashf etildi. Biz yangi formatlar va raqamli yondashuvlar bilan chegaralarni kengaytiramiz.",
                    icon: "\u{1F680}",
                },
            ],
        },
        stats: {
            yearsOnAir: "Yil Efirda",
            weeklyShows: "Haftalik Dasturlar",
            monthlyListeners: "Oylik Tinglovchilar",
            teamMembers: "Jamoa A'zolari",
        },
        team: {
            label: "Jamoa",
            title: "Jamoa Bilan Tanishish",
            description:
                "TempFM 88.4 ortidagi ovozlar, g'oyalar va insonlar. Toshkent madaniyati bilan yashaydigan ijodkorlar jamoasi.",
            members: [
                {
                    name: "Saidolimxon Turdiboyev",
                    role: "Radio direktori",
                    bio: "Radiostansiyani boshqaradi.",
                },
                {
                    name: "Otabek Tadjibayev",
                    role: "«Wake up» tonggi shousining muallifi va boshlovchisi",
                    bio: "O'zbek tilidagi «Wake up» tonggi shousining muallifi va boshlovchisi. Shou ruknlari: «Zumrasha», «Onam Tojam», bolalar ruknlari, ona va ota haqidagi ruknlar.",
                },
                {
                    name: "Roksana Abidova",
                    role: "«Oqshom tempida» kechki shousi va podkast boshlovchisi",
                    bio: "O'zbek tilidagi «Oqshom tempida» kechki shousi boshlovchisi va podkast boshlovchisi.",
                },
                {
                    name: "Jasmin Isroilova",
                    role: "Efir muharriri, «FM Pazl» va «Chempion» boshlovchisi",
                    bio: "Efir muharriri. «FM Pazl» va «Chempion» dasturlarini olib boradi. Efir tili: o'zbek va rus.",
                },
                {
                    name: "Viktor Nefyodov",
                    role: "«Vsem privety!» tonggi shousi boshlovchisi",
                    bio: "Rus tilida «Vsem privety!» tonggi shousi boshlovchisi. Dushanba kuni soat 10:00 dan 12:00 gacha.",
                },
                {
                    name: "Mixail Subeyev",
                    role: "Mualliflik tonggi shousi boshlovchisi",
                    bio: "Rus tilida mualliflik tonggi shousi boshlovchisi. Seshanba va payshanba kunlari soat 10:00 dan 12:00 gacha — tarix, fan, madaniyat va noodatiy faktlar haqida. «Pravda ili feyk?» rukni: tinglovchilar qaysi fikr haqiqat ekanini topishadi.",
                },
                {
                    name: "Violetta Tadjibayeva",
                    role: "«Utro v tempe» va «Vecher s Violettoy» boshlovchisi",
                    bio: "Chorshanba kuni soat 10:00 dan 12:00 gacha «Utro v tempe», juma kuni soat 20:00 dan 21:00 gacha «Vecher s Violettoy» dasturlarini olib boradi. Efir tili: ruscha.",
                },
                {
                    name: "TONY LORENZO",
                    role: "Tonggi shou va «Smart kommentarii s TONY» boshlovchisi, didjey",
                    bio: "Juma tonggi shousi (10:00–12:00) va «Smart kommentarii s TONY» dasturi boshlovchisi, didjey. Efir tili: ruscha. «Smart kommentarii s TONY» seshanba kunlari chiqadi, takror esa shanba kuni: texnologiyalar, fan va innovatsiyalardan uchta yangilik — oddiy tilda va hazil bilan.",
                },
                {
                    name: "Kamilla Muminova",
                    role: "«Prosto o vajnom» dasturi boshlovchisi",
                    bio: "'Prosto o vajnom' loyihasi boshlovchisi. Shaxsiy rivojlanish, mablag' va texnologiyalar haqida hayotiy tavsiyalar beradi.",
                },
                {
                    name: "Danata Davronova",
                    role: "«Korotkiye vstrechi» muallifi va boshlovchisi",
                    bio: "«Korotkiye vstrechi» dasturining muallifi va boshlovchisi. Efir tili: ruscha. Mutaxassislar bilan mualliflik intervyu. Chorshanba kuni soat 14:00–15:00 da har ikki haftada va shanba kuni soat 11:00 da.",
                },
                {
                    name: "Go'zal Karimova",
                    role: "Yangiliklar boshlovchisi",
                    bio: "O'zbek tilida yangiliklar.",
                },
                {
                    name: "Anna Axperjan'yans",
                    role: "Yangiliklar boshlovchisi",
                    bio: "Rus tilida yangiliklar.",
                },
                {
                    name: "Shuhrat",
                    role: "Musiqa muharriri",
                    bio: "Musiqa muharriri.",
                },
                {
                    name: "Ziyodulla Pulatovich",
                    role: "Ovoz rejissyori",
                    bio: "Anonslarni tayyorlaydi, yangiliklar ovozini qayta ishlaydi va ularni efirga chiqaradi.",
                },
                {
                    name: "Umid",
                    role: "SMM mutaxassisi",
                    bio: "SMM mutaxassisi sifatida ishlaydi.",
                },
                {
                    name: "Alisher Dadaxodjayev",
                    role: "Efir texnik mutaxassisi",
                    bio: "Efirning texnik tomonini ta'minlaydi.",
                },
            ],
        },
        contact: {
            label: "Aloqa",
            title: "Bog'lanish",
            description:
                "G'oyangiz bormi? Hamkorlik qilmoqchimisiz? Efir vaqti kerakmi? Biz har doim madaniyatni rivojlantiruvchi suhbatlarga ochiqmiz.",
            addressLabel: "Manzil",
            address: "Sariksuv Street, BHH Tower, Tashkent, Uzbekistan",
            emailLabel: "Email",
            phoneLabel: "Reklama bo'yicha",
            followUs: "Bizni Kuzating",
            followDescription:
                "TempFM bilan barcha platformalarda aloqada bo'ling. Efir ortidagi jarayonlar, jonli yangiliklar, pleylistlar va boshqalar.",
            liveAir: "Jonli Efir",
        },
    },

    /* ─── Advertising Page ─── */
    advertising: {
        header: {
            label: "Kengayishingiz Uchun",
            title: "TEMP FM BILAN",
            titleAccent: "HAMKORLIK.",
            description:
                "O'zbekistonning eng faol va zamonaviy auditoriyasiga o'z brendingizni taniting. Biz shunchaki efir vaqti sotmaymiz — biz madaniyat yaratamiz.",
            ctaPackages: "Paketlarni Ko'rish",
            ctaContact: "Biz Bilan Bog'lanish",
        },
        benefits: {
            label: "Nega Aynan TempFM",
            title: "O'sish Raqamlarda",
            items: [
                {
                    value: "200K+",
                    label: "Oylik Tinglovchilar",
                    description:
                        "Toshkentda va butun dunyo bo'ylab har oy 200,000 dan ortiq faol tinglovchilarga FM va raqamli oqimlar orqali yetib boring.",
                },
                {
                    value: "18-54",
                    label: "Asosiy Auditoriya",
                    description:
                        "Bizning auditoriyamiz Toshkentning eng faol qatlami — talabalar, yosh mutaxassislar va ijodkorlardir.",
                },
                {
                    value: "4.2M",
                    label: "Oylik Ko'rishlar",
                    description:
                        "FM eshittirish, veb-sayt, ijtimoiy tarmoqlar va striming platformalaridagi umumiy qamrov.",
                },
                {
                    value: "12+",
                    label: "Reklama Formatlari",
                    description:
                        "Klassik radio roliklaridan tortib brendlashtirilgan podkastlar, ijtimoiy tarmoqlar va jonli tadbirlargacha.",
                },
            ],
        },
        formats: {
            label: "Reklama Formatlari",
            title: "Har Bir Kanalda. Bitta Auditoriya.",
            description:
                "15 soniyalik rolik bo'ladimi yoki to'liq hamkorlikmi, biz brendingizni Toshkentning eng faol auditoriyasi bilan bog'lash uchun to'g'ri formatni yaratamiz.",
            items: [
                {
                    title: "Reklama Roliklari",
                    duration: "15 / 30 / 60 soniya",
                    description:
                        "Klassik radio reklama. Sizning xabaringiz eng ko'p tinglanadigan vaqtlarda professional ovoz bilan yetkaziladi. 'Tonggi Puls', 'Tungi Driv' yoki to'liq jadval bo'yicha.",
                    features: [
                        "Professional ishlab chiqarish",
                        "Prime-time va oddiy vaqt",
                        "Tez-tez joylashtirish uchun chegirmalar",
                        "A/B test sinovlari",
                    ],
                },
                {
                    title: "Dastur Homiyligi",
                    duration: "Haftalik / Oylik",
                    description:
                        "TempFM ning eng mashhur shoulariga homiylik qiling. Brendingizni Toshkent yoshlari har kuni tinglaydigan dasturlarga integratsiya qiling.",
                    features: [
                        "Brendlashtirilgan intro va outro",
                        "Boshlovchi tomonidan aytiladigan matn",
                        "Eksklyuziv toifa homiyligi",
                        "Ijtimoiy tarmoqlarda reklama",
                    ],
                },
                {
                    title: "Raqamli Kampaniyalar",
                    duration: "Moslashuvchan",
                    description:
                        "FM dan tashqariga chiqing. Veb-sayt, mobil ilova va ijtimoiy tarmoqlarda maqsadli reklama kampaniyalari — batafsil statistika bilan.",
                    features: [
                        "Veb-sayt bannerlari va pre-roll",
                        "Ijtimoiy tarmoq integratsiyasi",
                        "Axborotnoma homiyligi",
                        "Real vaqt rejimidagi statistika",
                    ],
                },
                {
                    title: "Tadbirlar Hamkorligi",
                    duration: "Tadbir davomida",
                    description:
                        "TempFM yoshlarning eng yirik tadbirlariga mezbonlik qiladi. Minglab yoshlar bilan yuzma-yuz muloqotda brendingizni namoyish eting.",
                    features: [
                        "Tadbir joyida brending",
                        "Sahnani nomlash huquqi",
                        "VIP zona brendingi",
                        "Jonli efirda eslatmalar",
                    ],
                },
            ],
        },
        pricing: {
            label: "Narxlar",
            title: "Moslashuvchan Paketlar",
            description:
                "Biznes o'sishining har bir bosqichi uchun shaffof narxlar. Barcha paketlar prodakshn xizmati va shaxsiy menejer yordamini o'z ichiga oladi.",
            negotiable: "Narxlar kelishilgan holda",
            contactButton: "Biz Bilan Bog'lanish",
            mostPopular: "Eng Mashhur",
            getStarted: "Boshlash",
            priceNote:
                "Barcha narxlar so'mda (UZS) ko'rsatilgan. Korporativ va uzoq muddatli hamkorlik uchun biz bilan bog'laning.",
            tiers: [
                {
                    name: "Boshlang'ich",
                    price: "2 500 000",
                    period: "/ oy",
                    description:
                        "Toshkent yoshlari auditoriyasiga chiqishni istagan mahalliy bizneslar uchun mukammal boshlanish.",
                    features: [
                        "Haftasiga 10 ta rolik (15 soniya)",
                        "Oddiy vaqtda joylashtirish",
                        "Bazaviy ishlab chiqarish",
                        "Oylik hisobot",
                        "1 ta ijtimoiy tarmoq posti",
                    ],
                },
                {
                    name: "Professional",
                    price: "7 000 000",
                    period: "/ oy",
                    description:
                        "Tez o'sayotgan brendlar uchun. Har tomonlama qamrov va yuqori chastotali eshittirishlar.",
                    features: [
                        "Haftasiga 30 ta rolik (30 soniya)",
                        "Prime-time vaqtlar",
                        "Professional audio rolik",
                        "Haftalik hisobotlar",
                        "Ijtimoiy tarmoq + Sayt",
                        "Shou homiyligi (1 ta)",
                    ],
                },
                {
                    name: "Korporativ",
                    price: "Shartnoma asosida",
                    period: "",
                    description:
                        "Yirik kompaniyalar uchun to'liq paket. Radio, dijital va tadbirlarni qamrab oluvchi 360 darajali yechim.",
                    features: [
                        "Cheksiz roliklar",
                        "Barcha vaqtlar prioriteti",
                        "To'liq prodakshn xizmati",
                        "Eksklyuziv homiylik",
                        "Tadbirlar integratsiyasi",
                        "Shaxsiy menejer",
                    ],
                },
            ],
        },
        cta: {
            label: "Bog'lanish",
            titleLine1: "Auditoriyangizni",
            titleAccent: "Kengaytiring",
            description:
                "Bizning reklama bo'limimiz bilan bog'laning. Biz sizning brendingizni Toshkent yoshlari allaqachon tinglayotgan to'lqinga olib chiqamiz.",
        },
    },

    /* ─── News Page ─── */
    news: {
        header: {
            label: "Kuzatib Boring",
            title: "YANGILIKLAR &",
            titleAccent: "O'ZGARISHLAR",
            description:
                "TempFM 88.4 da sodir bo'layotgan barcha voqealar — yangi shoular, tadbirlar, san'atkorlar va stansiya yangiliklari to'g'ridan-to'g'ri Toshkentdan.",
        },
        featured: "Asosiy",
        readMore: "To'liq o'qish",
        latestNews: "So'nggi Yangiliklar",
        articlesCount: "Maqolalar",
        readDetails: "Batafsil",
        loadMore: "Ko'proq yuklash",
        featuredArticle: {
            category: "Yangiliklar",
            date: "Ish kunlari",
            title: "TempFM da O'zbekiston yangiliklari",
            excerpt:
                "Qisqa yangiliklar sonlari. O'zbek tilida ularni Go'zal Karimova olib boradi — soat 08:00, 12:00 va 18:00 da; soat 18:00 da, shuningdek, valyuta kursi va ob-havo ma'lumoti beriladi. Soat 09:00 da — xorijiy yangiliklar, valyuta kursi va ob-havo. Rus tilidagi sonlarni Anna Axperjan'yans olib boradi — soat 10:00 va 14:00 da.",
        },
        articles: [
            {
                category: "Efirda",
                date: "Dushanba, 10:00–12:00",
                title: "Viktor Nefyodov bilan «Vsem privety!»",
                excerpt:
                    "Axborot ruknlari bilan ko'ngilochar tong: Toshkent yo'llari, qiziqarli va musiqiy faktlar, kun bayrami, jonli efirda salom va tabriklar.",
            },
            {
                category: "Loyiha",
                date: "Shanba, 13:00–14:00",
                title: "Afisha",
                excerpt: "Tadbirlar anonslari.",
            },
            {
                category: "Intervyu",
                date: "Chorshanba, 14:00–15:00 · shanba, 11:00",
                title: "Danata Davronova bilan «Korotkiye vstrechi»",
                excerpt:
                    "Mutaxassislar bilan mualliflik intervyu dasturi. Chorshanba kuni — har ikki haftada. Shanba kuni soat 11:00 da — mutaxassislar bilan intervyu.",
            },
            {
                category: "Yangiliklar",
                date: "Shanba",
                title: "Hafta yangiliklari",
                excerpt:
                    "Hafta yakunlari. Soat 12:00–13:00 da o'zbek tilida — Go'zal Karimova. Soat 14:00 da rus tilida — Anna Axperjan'yans.",
            },
            {
                category: "Loyiha",
                date: "Seshanba, 15:00–16:00 · shanba kuni takror, 15:00–16:00",
                title: "Kamilla bilan «Prosto o vajnom»",
                excerpt:
                    "Mablag', kasb, oila, shaxsiy rivojlanish va texnologiyalar haqida hayotiy misollar va manfaatli tavsiyalar. Mutaxassislar bilan dolzarb savollarga javob topamiz.",
            },
            {
                category: "Efirda",
                date: "Dushanba — juma",
                title: "Jasmin Isroilova bilan «FM Pazl» va «Chempion»",
                excerpt:
                    "«FM Pazl» (12:00–13:00) — tinglovchilar «pazl ko'rinishidagi» maqollarni to'g'ri topishlari kerak, g'olib muxlislar «Temp bilag'oni» maqomiga ega bo'ladilar. «Chempion» (13:00–14:00) — sportga oid yangiliklar yangraydi va viktorina o'tkaziladi. Sport olamidagi qahramonlar, jamoalar haqida ma'lumotga ega bo'lsangiz imkoniyatni qo'ldan boy bermang, Temp arenasida o'zingizni ko'rsating va Chempion maqomiga erishing.",
            },
        ],
    },

    /* ─── Schedule Page ─── */
    schedule: {
        header: {
            label: "Efirdan Boxabar Bo'ling",
            title: "Haftalik",
            titleAccent: "Jadval",
            description:
                "24 soat, haftada 7 kun. Har bir shou, har bir boshlovchi va har bir musiqa — maxsus siz uchun tanlangan.",
        },
        days: {
            mon: { label: "Dushanba", short: "Dush" },
            tue: { label: "Seshanba", short: "Sesh" },
            wed: { label: "Chorshanba", short: "Chor" },
            thu: { label: "Payshanba", short: "Pay" },
            fri: { label: "Juma", short: "Jum" },
            sat: { label: "Shanba", short: "Shan" },
            sun: { label: "Yakshanba", short: "Yak" },
        },
        showsCount: "{count} ko'rsatuvlar",
        hostLabel: "Boshlovchi:",
        cta: {
            label: "Hech bir shouni o'tkazib yubormang",
            title: "Hoziroq Tinglang",
            description:
                "TempFM 88.4 jonli efirda. Toshkentda va butun dunyo bo'ylab bizni radioda yoki onlayn tinglang.",
            button: "Jonli Efir — 88.4 FM",
        },
        shows: {
            mon: [
                { time: "08:00", title: "O'zbekiston yangiliklari", host: "Go'zal Karimova", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · o'zbek" },
                { time: "08:10 — 10:00", title: "Wake up", host: "Otabek Tadjibayev", description: "Tonggi shou. Muallif va boshlovchi — Otabek Tadjibayev. Shou ruknlari: «Zumrasha», «Onam Tojam», bolalar ruknlari, ona va ota haqidagi ruknlar.", genre: "Tonggi shou · o'zbek" },
                { time: "09:00", title: "Xorijiy yangiliklar, valyuta kursi, ob-havo", host: "Go'zal Karimova", description: "Jahon yangiliklari va kun uchun foydali ma'lumot.", genre: "Yangiliklar · o'zbek" },
                { time: "10:00", title: "O'zbekiston yangiliklari", host: "Anna Axperjan'yans", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · rus" },
                { time: "10:00 — 12:00", title: "Vsem privety!", host: "Viktor Nefyodov", description: "Axborot ruknlari bilan ko'ngilochar tong: Toshkent yo'llari, qiziqarli va musiqiy faktlar, kun bayrami, jonli efirda salom va tabriklar.", genre: "Tonggi shou · rus" },
                { time: "12:00", title: "O'zbekiston yangiliklari", host: "Go'zal Karimova", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · o'zbek" },
                { time: "12:00 — 13:00", title: "FM Pazl", host: "Jasmin Isroilova", description: "Tinglovchilar «pazl ko'rinishidagi» maqollarni to'g'ri topishlari kerak, g'olib muxlislar «Temp bilag'oni» maqomiga ega bo'ladilar.", genre: "Ko'ngilochar" },
                { time: "13:00 — 14:00", title: "Chempion", host: "Jasmin Isroilova", description: "Sportga oid yangiliklar yangraydi va viktorina o'tkaziladi. Sport olamidagi qahramonlar, jamoalar haqida ma'lumotga ega bo'lsangiz imkoniyatni qo'ldan boy bermang, Temp arenasida o'zingizni ko'rsating va Chempion maqomiga erishing.", genre: "Ko'ngilochar" },
                { time: "14:00", title: "O'zbekiston yangiliklari", host: "Anna Axperjan'yans", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · rus" },
                { time: "14:00 — 15:00", title: "Roksana Abidova bilan podkast", host: "Roksana Abidova", description: "Homiylik podkasti.", genre: "Podkast" },
                { time: "16:00 — 17:00", title: "Temp Social", host: "", description: "Mutaxassis-mehmonlar ishtirokidagi dastur.", genre: "Loyiha" },
                { time: "18:00", title: "O'zbekiston yangiliklari", host: "Go'zal Karimova", description: "Qisqa yangiliklar sonlari. Soat 18:00 da, shuningdek, valyuta kursi va ob-havo ma'lumoti beriladi.", genre: "Yangiliklar · o'zbek" },
                { time: "18:00 — 20:00", title: "Oqshom tempida", host: "Roksana Abidova", description: "Kun yakunida kerakli ma'lumot va foydali maslahatlar bilan kechki loyiha.", genre: "Kechki shou · o'zbek" },
                { time: "18:15", title: "Avtoblog", host: "Roksana Abidova", description: "Avtodunyo yangiliklari: avtobus marshrutlari, yopilgan ko'chalar, yo'l harakati qoidalari.", genre: "Kechki shou · o'zbek" },
                { time: "18:20 — 18:30", title: "Meloman", host: "Roksana Abidova", description: "O'yin: mashhur qo'shiq matni orqali tinglovchilar qo'shiq nomi va ijrochini topishadi.", genre: "Kechki shou · o'zbek" },
                { time: "18:00 — 19:00", title: "Yo'lda nima gap?", host: "Roksana Abidova", description: "Yo'llardagi vaziyat: tirbandliklar, aylanma yo'llar, YTH.", genre: "Kechki shou · o'zbek" },
                { time: "19:00 — 20:00", title: "Yurakdan gapiramiz", host: "Roksana Abidova", description: "Jonli efirda salom va tabriklar.", genre: "Kechki shou · o'zbek" },
                { time: "19:00", title: "IQ atlet", host: "Roksana Abidova", description: "Taniqli sportchilar bilan suhbat va sport viktorinasi.", genre: "Kechki shou · o'zbek" },
                { time: "23:00 — 07:00", title: "Non-Stop", host: "—", description: "Boshlovchisiz musiqa.", genre: "Musiqa" },
            ],
            tue: [
                { time: "08:00", title: "O'zbekiston yangiliklari", host: "Go'zal Karimova", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · o'zbek" },
                { time: "08:10 — 10:00", title: "Wake up", host: "Otabek Tadjibayev", description: "Tonggi shou. Muallif va boshlovchi — Otabek Tadjibayev. Shou ruknlari: «Zumrasha», «Onam Tojam», bolalar ruknlari, ona va ota haqidagi ruknlar.", genre: "Tonggi shou · o'zbek" },
                { time: "09:00", title: "Xorijiy yangiliklar, valyuta kursi, ob-havo", host: "Go'zal Karimova", description: "Jahon yangiliklari va kun uchun foydali ma'lumot.", genre: "Yangiliklar · o'zbek" },
                { time: "10:00", title: "O'zbekiston yangiliklari", host: "Anna Axperjan'yans", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · rus" },
                { time: "10:00 — 12:00", title: "Mixail Subeyev tonggi shousi", host: "Mixail Subeyev", description: "Tarix, fan, madaniyat va noodatiy faktlar haqida axborot-ko'ngilochar shou. «Pravda ili feyk?» ruknida tinglovchilar qaysi fikr haqiqat ekanini topishadi.", genre: "Tonggi shou · rus" },
                { time: "12:00", title: "O'zbekiston yangiliklari", host: "Go'zal Karimova", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · o'zbek" },
                { time: "12:00 — 13:00", title: "FM Pazl", host: "Jasmin Isroilova", description: "Tinglovchilar «pazl ko'rinishidagi» maqollarni to'g'ri topishlari kerak, g'olib muxlislar «Temp bilag'oni» maqomiga ega bo'ladilar.", genre: "Ko'ngilochar" },
                { time: "13:00 — 14:00", title: "Chempion", host: "Jasmin Isroilova", description: "Sportga oid yangiliklar yangraydi va viktorina o'tkaziladi. Sport olamidagi qahramonlar, jamoalar haqida ma'lumotga ega bo'lsangiz imkoniyatni qo'ldan boy bermang, Temp arenasida o'zingizni ko'rsating va Chempion maqomiga erishing.", genre: "Ko'ngilochar" },
                { time: "14:00", title: "O'zbekiston yangiliklari", host: "Anna Axperjan'yans", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · rus" },
                { time: "15:00 — 16:00", title: "Prosto o vajnom", host: "Kamilla", description: "Hayotga ijobiy ta'sir etuvchi samimiy suhbatlar: mablag', kasb, oila va shaxsiy rivojlanish.", genre: "Loyiha" },
                { time: "16:00 — 17:00", title: "Temp Social", host: "", description: "Mutaxassis-mehmonlar ishtirokidagi dastur.", genre: "Loyiha" },
                { time: "18:00", title: "O'zbekiston yangiliklari", host: "Go'zal Karimova", description: "Qisqa yangiliklar sonlari. Soat 18:00 da, shuningdek, valyuta kursi va ob-havo ma'lumoti beriladi.", genre: "Yangiliklar · o'zbek" },
                { time: "18:00 — 20:00", title: "Oqshom tempida", host: "Roksana Abidova", description: "Kun yakunida kerakli ma'lumot va foydali maslahatlar bilan kechki loyiha.", genre: "Kechki shou · o'zbek" },
                { time: "18:15", title: "Avtoblog", host: "Roksana Abidova", description: "Avtodunyo yangiliklari: avtobus marshrutlari, yopilgan ko'chalar, yo'l harakati qoidalari.", genre: "Kechki shou · o'zbek" },
                { time: "18:20 — 18:30", title: "Meloman", host: "Roksana Abidova", description: "O'yin: mashhur qo'shiq matni orqali tinglovchilar qo'shiq nomi va ijrochini topishadi.", genre: "Kechki shou · o'zbek" },
                { time: "18:00 — 19:00", title: "Yo'lda nima gap?", host: "Roksana Abidova", description: "Yo'llardagi vaziyat: tirbandliklar, aylanma yo'llar, YTH.", genre: "Kechki shou · o'zbek" },
                { time: "19:00 — 20:00", title: "Yurakdan gapiramiz", host: "Roksana Abidova", description: "Jonli efirda salom va tabriklar.", genre: "Kechki shou · o'zbek" },
                { time: "23:00 — 07:00", title: "Non-Stop", host: "—", description: "Boshlovchisiz musiqa.", genre: "Musiqa" },
            ],
            wed: [
                { time: "08:00", title: "O'zbekiston yangiliklari", host: "Go'zal Karimova", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · o'zbek" },
                { time: "08:10 — 10:00", title: "Wake up", host: "Otabek Tadjibayev", description: "Tonggi shou. Muallif va boshlovchi — Otabek Tadjibayev. Shou ruknlari: «Zumrasha», «Onam Tojam», bolalar ruknlari, ona va ota haqidagi ruknlar.", genre: "Tonggi shou · o'zbek" },
                { time: "09:00", title: "Xorijiy yangiliklar, valyuta kursi, ob-havo", host: "Go'zal Karimova", description: "Jahon yangiliklari va kun uchun foydali ma'lumot.", genre: "Yangiliklar · o'zbek" },
                { time: "10:00", title: "O'zbekiston yangiliklari", host: "Anna Axperjan'yans", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · rus" },
                { time: "10:00 — 12:00", title: "Utro v tempe", host: "Violetta Tadjibayeva", description: "Madaniyat, tarix va kundalik narsalarning ma'nosi haqida qiziqarli faktlar. Dasturda goroskop va «V peredacha».", genre: "Tonggi shou · rus" },
                { time: "12:00", title: "O'zbekiston yangiliklari", host: "Go'zal Karimova", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · o'zbek" },
                { time: "12:00 — 13:00", title: "FM Pazl", host: "Jasmin Isroilova", description: "Tinglovchilar «pazl ko'rinishidagi» maqollarni to'g'ri topishlari kerak, g'olib muxlislar «Temp bilag'oni» maqomiga ega bo'ladilar.", genre: "Ko'ngilochar" },
                { time: "13:00 — 14:00", title: "Chempion", host: "Jasmin Isroilova", description: "Sportga oid yangiliklar yangraydi va viktorina o'tkaziladi. Sport olamidagi qahramonlar, jamoalar haqida ma'lumotga ega bo'lsangiz imkoniyatni qo'ldan boy bermang, Temp arenasida o'zingizni ko'rsating va Chempion maqomiga erishing.", genre: "Ko'ngilochar" },
                { time: "14:00", title: "O'zbekiston yangiliklari", host: "Anna Axperjan'yans", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · rus" },
                { time: "14:00 — 15:00", title: "Korotkiye vstrechi", host: "Danata Davronova", description: "Mutaxassislar bilan mualliflik intervyu dasturi. Har ikki haftada.", genre: "Intervyu · rus" },
                { time: "16:00 — 17:00", title: "Temp Social", host: "", description: "Mutaxassis-mehmonlar ishtirokidagi dastur.", genre: "Loyiha" },
                { time: "18:00", title: "O'zbekiston yangiliklari", host: "Go'zal Karimova", description: "Qisqa yangiliklar sonlari. Soat 18:00 da, shuningdek, valyuta kursi va ob-havo ma'lumoti beriladi.", genre: "Yangiliklar · o'zbek" },
                { time: "18:00 — 20:00", title: "Oqshom tempida", host: "Roksana Abidova", description: "Kun yakunida kerakli ma'lumot va foydali maslahatlar bilan kechki loyiha.", genre: "Kechki shou · o'zbek" },
                { time: "18:15", title: "Avtoblog", host: "Roksana Abidova", description: "Avtodunyo yangiliklari: avtobus marshrutlari, yopilgan ko'chalar, yo'l harakati qoidalari.", genre: "Kechki shou · o'zbek" },
                { time: "18:20 — 18:30", title: "Meloman", host: "Roksana Abidova", description: "O'yin: mashhur qo'shiq matni orqali tinglovchilar qo'shiq nomi va ijrochini topishadi.", genre: "Kechki shou · o'zbek" },
                { time: "18:00 — 19:00", title: "Yo'lda nima gap?", host: "Roksana Abidova", description: "Yo'llardagi vaziyat: tirbandliklar, aylanma yo'llar, YTH.", genre: "Kechki shou · o'zbek" },
                { time: "19:00 — 20:00", title: "Yurakdan gapiramiz", host: "Roksana Abidova", description: "Jonli efirda salom va tabriklar.", genre: "Kechki shou · o'zbek" },
                { time: "23:00 — 07:00", title: "Non-Stop", host: "—", description: "Boshlovchisiz musiqa.", genre: "Musiqa" },
            ],
            thu: [
                { time: "08:00", title: "O'zbekiston yangiliklari", host: "Go'zal Karimova", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · o'zbek" },
                { time: "08:10 — 10:00", title: "Wake up", host: "Otabek Tadjibayev", description: "Tonggi shou. Muallif va boshlovchi — Otabek Tadjibayev. Shou ruknlari: «Zumrasha», «Onam Tojam», bolalar ruknlari, ona va ota haqidagi ruknlar.", genre: "Tonggi shou · o'zbek" },
                { time: "09:00", title: "Xorijiy yangiliklar, valyuta kursi, ob-havo", host: "Go'zal Karimova", description: "Jahon yangiliklari va kun uchun foydali ma'lumot.", genre: "Yangiliklar · o'zbek" },
                { time: "10:00", title: "O'zbekiston yangiliklari", host: "Anna Axperjan'yans", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · rus" },
                { time: "10:00 — 12:00", title: "Mixail Subeyev tonggi shousi", host: "Mixail Subeyev", description: "Tarix, fan, madaniyat va noodatiy faktlar haqida axborot-ko'ngilochar shou. «Pravda ili feyk?» ruknida tinglovchilar qaysi fikr haqiqat ekanini topishadi.", genre: "Tonggi shou · rus" },
                { time: "12:00", title: "O'zbekiston yangiliklari", host: "Go'zal Karimova", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · o'zbek" },
                { time: "12:00 — 13:00", title: "FM Pazl", host: "Jasmin Isroilova", description: "Tinglovchilar «pazl ko'rinishidagi» maqollarni to'g'ri topishlari kerak, g'olib muxlislar «Temp bilag'oni» maqomiga ega bo'ladilar.", genre: "Ko'ngilochar" },
                { time: "13:00 — 14:00", title: "Chempion", host: "Jasmin Isroilova", description: "Sportga oid yangiliklar yangraydi va viktorina o'tkaziladi. Sport olamidagi qahramonlar, jamoalar haqida ma'lumotga ega bo'lsangiz imkoniyatni qo'ldan boy bermang, Temp arenasida o'zingizni ko'rsating va Chempion maqomiga erishing.", genre: "Ko'ngilochar" },
                { time: "14:00", title: "O'zbekiston yangiliklari", host: "Anna Axperjan'yans", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · rus" },
                { time: "16:00 — 17:00", title: "Temp Social", host: "", description: "Mutaxassis-mehmonlar ishtirokidagi dastur.", genre: "Loyiha" },
                { time: "18:00", title: "O'zbekiston yangiliklari", host: "Go'zal Karimova", description: "Qisqa yangiliklar sonlari. Soat 18:00 da, shuningdek, valyuta kursi va ob-havo ma'lumoti beriladi.", genre: "Yangiliklar · o'zbek" },
                { time: "18:00 — 20:00", title: "Oqshom tempida", host: "Roksana Abidova", description: "Kun yakunida kerakli ma'lumot va foydali maslahatlar bilan kechki loyiha.", genre: "Kechki shou · o'zbek" },
                { time: "18:15", title: "Avtoblog", host: "Roksana Abidova", description: "Avtodunyo yangiliklari: avtobus marshrutlari, yopilgan ko'chalar, yo'l harakati qoidalari.", genre: "Kechki shou · o'zbek" },
                { time: "18:20 — 18:30", title: "Meloman", host: "Roksana Abidova", description: "O'yin: mashhur qo'shiq matni orqali tinglovchilar qo'shiq nomi va ijrochini topishadi.", genre: "Kechki shou · o'zbek" },
                { time: "18:00 — 19:00", title: "Yo'lda nima gap?", host: "Roksana Abidova", description: "Yo'llardagi vaziyat: tirbandliklar, aylanma yo'llar, YTH.", genre: "Kechki shou · o'zbek" },
                { time: "19:00 — 20:00", title: "Yurakdan gapiramiz", host: "Roksana Abidova", description: "Jonli efirda salom va tabriklar.", genre: "Kechki shou · o'zbek" },
                { time: "23:00 — 07:00", title: "Non-Stop", host: "—", description: "Boshlovchisiz musiqa.", genre: "Musiqa" },
            ],
            fri: [
                { time: "08:00", title: "O'zbekiston yangiliklari", host: "Go'zal Karimova", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · o'zbek" },
                { time: "08:10 — 10:00", title: "Wake up", host: "Otabek Tadjibayev", description: "Tonggi shou. Muallif va boshlovchi — Otabek Tadjibayev. Shou ruknlari: «Zumrasha», «Onam Tojam», bolalar ruknlari, ona va ota haqidagi ruknlar.", genre: "Tonggi shou · o'zbek" },
                { time: "09:00", title: "Xorijiy yangiliklar, valyuta kursi, ob-havo", host: "Go'zal Karimova", description: "Jahon yangiliklari va kun uchun foydali ma'lumot.", genre: "Yangiliklar · o'zbek" },
                { time: "10:00", title: "O'zbekiston yangiliklari", host: "Anna Axperjan'yans", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · rus" },
                { time: "10:00 — 12:00", title: "TONY LORENZO tonggi shousi", host: "TONY LORENZO", description: "Tonggi ko'ngilochar shou: kunning tarixiy voqealari va mashhur qo'shiqlarning yaratilish tarixi.", genre: "Tonggi shou · rus" },
                { time: "12:00", title: "O'zbekiston yangiliklari", host: "Go'zal Karimova", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · o'zbek" },
                { time: "12:00 — 13:00", title: "FM Pazl", host: "Jasmin Isroilova", description: "Tinglovchilar «pazl ko'rinishidagi» maqollarni to'g'ri topishlari kerak, g'olib muxlislar «Temp bilag'oni» maqomiga ega bo'ladilar.", genre: "Ko'ngilochar" },
                { time: "13:00 — 14:00", title: "Chempion", host: "Jasmin Isroilova", description: "Sportga oid yangiliklar yangraydi va viktorina o'tkaziladi. Sport olamidagi qahramonlar, jamoalar haqida ma'lumotga ega bo'lsangiz imkoniyatni qo'ldan boy bermang, Temp arenasida o'zingizni ko'rsating va Chempion maqomiga erishing.", genre: "Ko'ngilochar" },
                { time: "14:00", title: "O'zbekiston yangiliklari", host: "Anna Axperjan'yans", description: "Qisqa yangiliklar sonlari.", genre: "Yangiliklar · rus" },
                { time: "16:00 — 17:00", title: "Temp Social", host: "", description: "Mutaxassis-mehmonlar ishtirokidagi dastur.", genre: "Loyiha" },
                { time: "18:00", title: "O'zbekiston yangiliklari", host: "Go'zal Karimova", description: "Qisqa yangiliklar sonlari. Soat 18:00 da, shuningdek, valyuta kursi va ob-havo ma'lumoti beriladi.", genre: "Yangiliklar · o'zbek" },
                { time: "18:00 — 20:00", title: "Oqshom tempida", host: "Roksana Abidova", description: "Kun yakunida kerakli ma'lumot va foydali maslahatlar bilan kechki loyiha.", genre: "Kechki shou · o'zbek" },
                { time: "18:15", title: "Avtoblog", host: "Roksana Abidova", description: "Avtodunyo yangiliklari: avtobus marshrutlari, yopilgan ko'chalar, yo'l harakati qoidalari.", genre: "Kechki shou · o'zbek" },
                { time: "18:20 — 18:30", title: "Meloman", host: "Roksana Abidova", description: "O'yin: mashhur qo'shiq matni orqali tinglovchilar qo'shiq nomi va ijrochini topishadi.", genre: "Kechki shou · o'zbek" },
                { time: "18:00 — 19:00", title: "Yo'lda nima gap?", host: "Roksana Abidova", description: "Yo'llardagi vaziyat: tirbandliklar, aylanma yo'llar, YTH.", genre: "Kechki shou · o'zbek" },
                { time: "19:00 — 20:00", title: "Yurakdan gapiramiz", host: "Roksana Abidova", description: "Jonli efirda salom va tabriklar.", genre: "Kechki shou · o'zbek" },
                { time: "20:00 — 21:00", title: "Vecher s Violettoy", host: "Violetta Tadjibayeva", description: "", genre: "Kechki shou · rus" },
                { time: "23:00 — 07:00", title: "Non-Stop", host: "—", description: "Boshlovchisiz musiqa.", genre: "Musiqa" },
            ],
            sat: [
                { time: "11:00", title: "Korotkiye vstrechi", host: "Danata Davronova", description: "Mutaxassislar bilan intervyu.", genre: "Intervyu · rus" },
                { time: "12:00 — 13:00", title: "Hafta yangiliklari", host: "Go'zal Karimova", description: "Hafta yakunlari.", genre: "Yangiliklar · o'zbek" },
                { time: "12:00 — 14:00", title: "Yo'l-yo'lakay", host: "Jasmin Isroilova, Otabek Tadjibayev", description: "Mashhur aktyorlar, musiqachilar, sportchilar va taniqli shaxslar bilan suhbatlar.", genre: "Intervyu" },
                { time: "13:00 — 14:00", title: "Afisha", host: "Boshlovchi", description: "Tadbirlar anonslari.", genre: "Afisha" },
                { time: "14:00", title: "Hafta yangiliklari", host: "Anna Axperjan'yans", description: "Hafta yakunlari.", genre: "Yangiliklar · rus" },
                { time: "15:00 — 16:00", title: "Prosto o vajnom", host: "Kamilla", description: "Takror. Hayotga ijobiy ta'sir etuvchi samimiy suhbatlar: mablag', kasb, oila va shaxsiy rivojlanish.", genre: "Loyiha" },
                { time: "16:00 — 17:00", title: "Roksana Abidova bilan podkast", host: "Roksana Abidova", description: "Homiylik podkasti.", genre: "Podkast" },
            ],
            sun: [
                { time: "Kunning katta qismi", title: "Non-Stop", host: "—", description: "Kun davomining katta qismida boshlovchisiz musiqa yangraydi.", genre: "Musiqa" },
            ],
        },
    },
    common: {
        logoAlt: "TempFM Logotipi",
    },

    /* ─── Contacts Modal ─── */
    contacts: {
        modalTitle: "Biz Bilan Bog'lanish",
        live: {
            label: "Jonli Efir",
            phone: "+998 55 515 88 40",
            desc: "Qo'ng'iroq qiling va efirga chiqing",
        },
        ad: {
            label: "Reklama Bo'limi",
            desc: "Hamkorlik va tijorat masalalari",
            phone1: "+998 70 505 88 40",
        },
    },
};

export default uz;
