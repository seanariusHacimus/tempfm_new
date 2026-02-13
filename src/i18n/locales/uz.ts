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
                    title: "Wake up shou",
                    time: "08:00 — 10:00",
                    host: "Otabek Tojiboyev",
                    description:
                        "Uyg'onishga va tongni yuqori kayfiyatda boshlashga yordam beradi: foydali ma'lumotlar, samimiy suhbat va sevimli musiqalar.",
                    tag: "Dushanba - Juma",
                },
                {
                    title: "Kunduzgi ritm",
                    time: "12:00 — 14:00",
                    host: "Jasmin Isroilova",
                    description:
                        "Kun davomida yuqori kayfiyat! Tabriklar, o'yinlar, hikoyalar va dilga yaqin taronalar yangraydi.",
                    tag: "Dushanba - Juma",
                },
                {
                    title: "Oqshom tempida",
                    time: "18:00 — 20:00",
                    host: "Roksana Abidova",
                    description:
                        "Ish kunining yakunida hordiq. Yo'ldagi vaziyatlar, foydali ma'lumotlar va dil tortar qo'shiqlar.",
                    tag: "Dushanba - Juma",
                },
                {
                    title: "Oqshom jo'shqin ritmda",
                    time: "20:00 — 21:00",
                    host: "Toni Lorenso",
                    description:
                        "Kundalik tashvishlarni unutib, yoqimli, samimiy va hayotga muhabbat uyg'otuvchi iliq muhit.",
                    tag: "Dushanba - Juma",
                },
                {
                    title: "Korotkiye vstrechi",
                    time: "Hafta davomida",
                    host: "Danata Davronova",
                    description:
                        "Turli soha vakillari bilan samimiy suhbatlar: shifokorlar, olimlar, artistlar va jamoat arboblari.",
                    tag: "Maxsus Loyiha",
                },
                {
                    title: "Prosto o vajnom",
                    time: "Hafta davomida",
                    host: "Kamilla Mo'minova",
                    description:
                        "Hayotga ijobiy ta'sir etuvchi samimiy suhbatlar: mablag', kasb, oila va shaxsiy rivojlanish.",
                    tag: "Marketing / Hayot",
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
                    name: "Go'zal Karimova",
                    role: "Yangiliklar Boshlovchisi",
                    bio: "O'zbek tilidagi yangiliklar dasturi boshlovchisi. Siyosat, iqtisodiyot va madaniyat sohasidagi eng so'nggi xabarlarni yetkazadi.",
                },
                {
                    name: "Anna Axperjan'yans",
                    role: "Yangiliklar Boshlovchisi",
                    bio: "Rus tilidagi yangiliklar va tahliliy dasturlar boshlovchisi. Kunning asosiy voqealarini xolis va tezkor yoritadi.",
                },
                {
                    name: "Otabek Tojiboyev",
                    role: "Radio Boshlovchi",
                    bio: "Tonggi 'Wake up shou' boshlovchisi. Har tongni yuqori kayfiyat va foydali ma'lumotlar bilan boshlashingizga yordam beradi.",
                },
                {
                    name: "Jasmin Isroilova",
                    role: "Radio Boshlovchi",
                    bio: "'Kunduzgi ritm' shousi boshlovchisi. Tinglovchilar bilan samimiy muloqot va yoqimli musiqa orqali kunni mazmunli o'tkazadi.",
                },
                {
                    name: "Roksana Abidova",
                    role: "Radio Boshlovchi",
                    bio: "'Oqshom tempida' kechki shousi boshlovchisi. Ish kunining yakunida hordiq onlarini va yo'l harakati haqidagi ma'lumotlarni ulashadi.",
                },
                {
                    name: "Toni Lorenso",
                    role: "Radio Boshlovchi",
                    bio: "'Oqshom jo'shqin ritmda' dasturi boshlovchisi. Kundalik tashvishlarni unutishga yordam beruvchi samimiy muhit yaratadi.",
                },
                {
                    name: "Mixail Subeyev",
                    role: "Radio Boshlovchi",
                    bio: "Interaktiv dasturlar va musiqiy xit-paradlar muallifi. Tinglovchilarni efir jarayoniga faol jalb qiluvchi kreativ boshlovchi.",
                },
                {
                    name: "Violetta Tadjibayeva",
                    role: "Radio Boshlovchi",
                    bio: "Madaniyat va tarixga oid dasturlar boshlovchisi. 'V uzatma' va 'Ta'm tarixi' loyihalari orqali yangi bilimlarni ulashadi.",
                },
                {
                    name: "Danata Davronova",
                    role: "Jurnalist / Boshlovchi",
                    bio: "'Korotkiye vstrechi' loyihasi muallifi. Turli soha vakillari bilan ijtimoiy va shaxsiy mavzularda chuqur suhbatlar o'tkazadi.",
                },
                {
                    name: "Kamilla Mo'minova",
                    role: "Marketolog / Boshlovchi",
                    bio: "'Prosto o vajnom' loyihasi boshlovchisi. Shaxsiy rivojlanish, mablag' va texnologiyalar haqida hayotiy tavsiyalar beradi.",
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
            phoneLabel: "Telefon",
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
                    value: "18–30",
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
            date: "Har kuni",
            title:
                "O'zbekistonda va butun dunyoda sodir bo'lgan eng so'nggi voqealar TempFM da!",
            excerpt:
                "Siyosat, iqtisodiyot, madaniyat, sport va boshqa jabhalardagi eng muhim xabarlarni bizning yangiliklar dasturimizda kuzatib boring. Har kuni 5 daqiqa ichida dunyo nigohingizda! Bizning boshlovchilarimiz Go'zal Karimova va Anna Axperjan'yans sizni eng so'nggi voqealar bilan tanishtirib borishadi.",
        },
        articles: [
            {
                category: "Maxsus format",
                date: "Oyda bir marotaba",
                title: "Live - konsertlar: Sevimli yulduzlaringiz bilan jonli muloqot",
                excerpt:
                    "Temp fm radiosining jonli efirida o'zbek estrada yulduzlari, xonanda va sozandalar ishtirokida mo'jaz sahnamizdagi eksklyuziv konsertdan bahramand bo'ling. Yangi qo'shiqlar taqdimoti va xit taronalar — hammasi jonli va shaffof!",
            },
            {
                category: "Loyiha",
                date: "Har shanba, 16:30",
                title: "Afisha – Madaniy xordiq chiqarish uchun eng yaxshi tanlov",
                excerpt:
                    "Ko'ngilochar dasturlar, ko'rgazmalar va shahrimizdagi eng qiziqarli tadbirlar haqida har shanba \"Afisha\" loyihasi orqali bilib olishingiz mumkin. Madaniy xordiq uchun tanlov o'zingizga havola!",
            },
            {
                category: "Intervyu",
                date: "Haftalik",
                title: "Danata Davronova bilan \"Korotkiye vstrechi\"",
                excerpt:
                    "Shifokorlar, olimlar, artistlar va jamoat arboblari bilan iliq va samimiy suhbatlar. Hayotiy voqealar, salomatlik, ta'lim va qadriyatlar haqida kutilmagan kashfiyotlar.",
            },
            {
                category: "Tahlil",
                date: "Shanba, 12:00",
                title: "Hafta yangiliklari: Muhim voqealar sharhi",
                excerpt:
                    "Hafta davomida sodir bo'lgan eng muhim voqealarning yakuniy soni va tahliliy mushoxada. Dunyoda va O'zbekistonda ro'y bergan yangiliklarning tahlili va sharhi.",
            },
            {
                category: "Loyiha",
                date: "Haftalik",
                title: "Kamilla Mo'minova bilan \"Prosto o vajnom\"",
                excerpt:
                    "Mablag', kasb, oila, shaxsiy rivojlanish va texnologiyalar haqida hayotiy misollar va manfaatli tavsiyalar. Mutaxassislar bilan dolzarb savollarga javob topamiz.",
            },
            {
                category: "Efir pallasida",
                date: "Dushanba - Juma",
                title: "Kunduzgi ritm – Kuningizni yuqori kayfiyatda o'tkazing",
                excerpt:
                    "Tabriklar, o'yinlar, hikoyalar va dilga yaqin taronalar. Jasmin Isroilova bilan ishdagi murakkab topshiriqlar oson yechim topadi, yo'ldagi vaqt esa maroqli o'tadi.",
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
                { time: "08:00 — 09:00", title: "Wake up shou", host: "Otabek Tojiboyev", description: "Tonggi interaktiv shou. 'Tonggi trafik' va 'Kim ekan' sahifalarida ishtirok eting. O'zbekiston yangiliklari va ob-havo ma'lumotlari bilan tanishing.", genre: "Tonggi Shou" },
                { time: "09:00 — 10:00", title: "Wake up shou", host: "Otabek Tojiboyev", description: "'Davlatim otam' va 'Tojim onam' sahifalari — eng muqaddas zotlar haqidagi ta'sirli hikoyalar va iliq xotiralar.", genre: "Tonggi Shou" },
                { time: "10:00 — 11:00", title: "Violetta bilan", host: "Violetta Tadjibayeva", description: "Madaniyat va tarix haqida qiziqarli faktlar. 'V uzatma' avtomobillar olami va 'Ta'm tarixi' gastronomik sayohat.", genre: "Madaniy" },
                { time: "11:00 — 12:00", title: "Yangiliklar (O'zb)", host: "Go'zal Karimova", description: "O'zbekistonda va dunyoda sodir bo'layotgan so'nggi voqealar. Siyosat, iqtisodiyot va madaniyat yangiliklari.", genre: "Yangiliklar" },
                { time: "12:00 — 14:00", title: "Kunduzgi ritm", host: "Jasmin Isroilova", description: "'Allo Temp' tabriklari va 'FM Pazl' o'yini. Sport yangiliklari va 'Chempion' viktorinasi bilan kunni qiziqarli o'tkazing.", genre: "Ko'ngilochar" },
                { time: "14:00 — 15:00", title: "Yangiliklar (Rus)", host: "Anna Axperjan'yans", description: "Kunning eng muhim voqealari rus tilida. Tezkor va xolis ma'lumotlar sharhi.", genre: "Yangiliklar" },
                { time: "15:00 — 18:00", title: "Musiqiy Non-stop", host: "Auto Mix", description: "Eng sar sara taronalar ketma-ketligi va rus tilidagi yangiliklar bloklari.", genre: "Musiqa" },
                { time: "18:00 — 19:00", title: "Oqshom tempida", host: "Roksana Abidova", description: "'Yo'lda nima gap?' — Toshkent ko'chalaridagi tirbandliklar, yopilgan yo'llar va YHQ yangiliklari.", genre: "Kechki Shou" },
                { time: "19:00 — 20:00", title: "Oqshom tempida", host: "Roksana Abidova", description: "'Yurakdan gapiramiz' — tabriklar, salomlar va musiqa buyurtmalari. Dushanba kuni 'IQ athlet' sport interaktivi.", genre: "Kechki Shou" },
                { time: "20:00 — 21:00", title: "Oqshom jo'shqin ritmda", host: "Toni Lorenso", description: "Kundalik tashvishlarni unutib, yoqimli va samimiy muhitga sho'ng'ing. Salom va tabriklar vaqti.", genre: "Lounge" },
                { time: "21:00 — 08:00", title: "Tungi Temp", host: "Auto Mix", description: "Sokin musiqalar va kechki yangiliklar sadosi ostida hordiq chiqaring.", genre: "Ambient" },
            ],
            tue: [
                { time: "08:00 — 10:00", title: "Wake up shou", host: "Otabek Tojiboyev", description: "Uyg'onishga va tongni yuqori kayfiyatda boshlashga yordam beruvchi interaktiv loyiha.", genre: "Tonggi Shou" },
                { time: "10:00 — 11:00", title: "Mixail bilan", host: "Mixail Subeyev", description: "'Feyk yoki haqiqat' loyihasi va kutilmagan faktlar. Musiqiy xit-parad va qiziqarli topishmoqlar.", genre: "Interaktiv" },
                { time: "11:00 — 12:00", title: "Yangiliklar (O'zb)", host: "Go'zal Karimova", description: "O'zbekistonda va dunyoda sodir bo'layotgan so'nggi voqealar.", genre: "Yangiliklar" },
                { time: "12:00 — 14:00", title: "Kunduzgi ritm", host: "Jasmin Isroilova", description: "Dastur tinglovchilarni kunning qoq yarmidan, kechga qadar yoqimli tempda qolishini ta'minlaydi.", genre: "Ko'ngilochar" },
                { time: "14:00 — 15:00", title: "Yangiliklar (Rus)", host: "Anna Axperjan'yans", description: "Kunning eng muhim voqealari rus tilida.", genre: "Yangiliklar" },
                { time: "15:00 — 18:00", title: "Musiqiy Non-stop", host: "Auto Mix", description: "Eng sar sara taronalar ketma-ketligi va rus tilidagi yangiliklar bloklari.", genre: "Musiqa" },
                { time: "18:00 — 20:00", title: "Oqshom tempida", host: "Roksana Abidova", description: "Roksana kechki tirbandliklardagi vaqtni yuqori kayfiyatda o'tishiga yordam beradi.", genre: "Kechki Shou" },
                { time: "20:00 — 21:00", title: "Oqshom jo'shqin ritmda", host: "Toni Lorenso", description: "Yoqimli, samimiy va hayotga muhabbat uyg'otuvchi iliq muhit.", genre: "Lounge" },
            ],
            wed: [
                { time: "08:00 — 10:00", title: "Wake up shou", host: "Otabek Tojiboyev", description: "Tonggi interaktiv muloqot va yo'ldagi vaziyatlar tahlili.", genre: "Tonggi Shou" },
                { time: "10:00 — 11:00", title: "Violetta bilan", host: "Violetta Tadjibayeva", description: "Yangi bilimlar va zavq ila foydani birlashtiruvchi madaniy dasturlar.", genre: "Madaniy" },
                { time: "11:00 — 12:00", title: "Yangiliklar (O'zb)", host: "Go'zal Karimova", description: "O'zbekistonda va dunyoda sodir bo'layotgan so'nggi voqealar.", genre: "Yangiliklar" },
                { time: "12:00 — 14:00", title: "Kunduzgi ritm", host: "Jasmin Isroilova", description: "Eski qadrdonlardek suhbat va dilga yaqin taronalar yangraydi.", genre: "Ko'ngilochar" },
                { time: "14:00 — 15:00", title: "Yangiliklar (Rus)", host: "Anna Axperjan'yans", description: "Kunning eng muhim voqealari rus tilida.", genre: "Yangiliklar" },
                { time: "15:00 — 17:00", title: "Musiqiy Non-stop", host: "Auto Mix", description: "Eng sar sara taronalar ketma-ketligi va rus tilidagi yangiliklar bloklari.", genre: "Musiqa" },
                { time: "17:00 — 18:00", title: "Siz yolg'iz emassiz", host: "Go'zal Karimova", description: "Ijtimoiy ahamiyatga ega loyiha. Gender tenglik va ayollar huquqlari haqida keng ko'lamli ma'lumotlar.", genre: "Ijtimoiy" },
                { time: "18:00 — 20:00", title: "Oqshom tempida", host: "Roksana Abidova", description: "Kechki tirbandliklar va yo'l harakati qoidalaridagi yangiliklar yoritiladi.", genre: "Kechki Shou" },
                { time: "20:00 — 21:00", title: "Oqshom jo'shqin ritmda", host: "Toni Lorenso", description: "Toni Lorenso bilan kundalik tashvishlarni unuting.", genre: "Lounge" },
            ],
            thu: [
                { time: "08:00 — 10:00", title: "Wake up shou", host: "Otabek Tojiboyev", description: "Yangi kunga yuzda kulgu va labda tabassum bilan birga qadam qo'yamiz!", genre: "Tonggi Shou" },
                { time: "10:00 — 11:00", title: "Mixail bilan", host: "Mixail Subeyev", description: "Sezgi sinovdan o'tkaziladi, topishmoqlar yechiladi va yaxshi kayfiyat yaratiladi.", genre: "Interaktiv" },
                { time: "11:00 — 12:00", title: "Yangiliklar (O'zb)", host: "Go'zal Karimova", description: "O'zbekistonda va dunyoda sodir bo'layotgan so'nggi voqealar.", genre: "Yangiliklar" },
                { time: "12:00 — 14:00", title: "Kunduzgi ritm", host: "Jasmin Isroilova", description: "Ishdagi murakkab topshiriqlar oson yechim topadi, yo'ldagi vaqt esa maroqli o'tadi.", genre: "Ko'ngilochar" },
                { time: "14:00 — 15:00", title: "Yangiliklar (Rus)", host: "Anna Axperjan'yans", description: "Kunning eng muhim voqealari rus tilida.", genre: "Yangiliklar" },
                { time: "15:00 — 18:00", title: "Musiqiy Non-stop", host: "Auto Mix", description: "Eng sar sara taronalar ketma-ketligi va rus tilidagi yangiliklar bloklari.", genre: "Musiqa" },
                { time: "18:00 — 20:00", title: "Oqshom tempida", host: "Roksana Abidova", description: "Oqshom pallasida ikki soatlik efir tinglovchilarga hordiq onlarini bag'ishlaydi.", genre: "Kechki Shou" },
                { time: "20:00 — 21:00", title: "Oqshom jo'shqin ritmda", host: "Toni Lorenso", description: "Yoqimli va samimiy musiqa orqali hayotga bo'lgan muhabbatni his qiling.", genre: "Lounge" },
            ],
            fri: [
                { time: "08:00 — 10:00", title: "Wake up shou", host: "Otabek Tojiboyev", description: "Hafta yakunini yuqori kayfiyatda qarshi oling.", genre: "Tonggi Shou" },
                { time: "10:00 — 11:00", title: "Violetta bilan", host: "Violetta Tadjibayeva", description: "Ish jarayoni uchun yoqimli muhit va yangi bilimlar olish imkoniyati.", genre: "Madaniy" },
                { time: "11:00 — 12:00", title: "Yangiliklar (O'zb)", host: "Go'zal Karimova", description: "O'zbekistonda va dunyoda sodir bo'layotgan so'nggi voqealar.", genre: "Yangiliklar" },
                { time: "12:00 — 14:00", title: "Kunduzgi ritm", host: "Jasmin Isroilova", description: "Hafta davomidagi eng so'nggi voqeliklardan xabardor bo'ling.", genre: "Ko'ngilochar" },
                { time: "14:00 — 15:00", title: "Yangiliklar (Rus)", host: "Anna Axperjan'yans", description: "Kunning eng muhim voqealari rus tilida.", genre: "Yangiliklar" },
                { time: "15:00 — 18:00", title: "Musiqiy Non-stop", host: "Auto Mix", description: "Eng sar sara taronalar ketma-ketligi va rus tilidagi yangiliklar bloklari.", genre: "Musiqa" },
                { time: "18:00 — 20:00", title: "Oqshom tempida", host: "Roksana Abidova", description: "Dam olish kunlari oldidan yo'ldagi vaziyatlar va dil tortar qo'shiqlar.", genre: "Kechki Shou" },
                { time: "20:00 — 21:00", title: "Oqshom jo'shqin ritmda", host: "Toni Lorenso", description: "Hafta yakunini samimiy suhbat va musiqa bilan yakunlang.", genre: "Lounge" },
            ],
            sat: [
                { time: "06:00 — 12:00", title: "Muzika Non-stop", host: "Auto Mix", description: "Dam olish kunlari uchun maxsus tayyorlangan musiqiy to'plamlar.", genre: "Musiqa" },
                { time: "12:00 — 13:00", title: "Hafta yangiliklari", host: "Go'zal Karimova", description: "Tahliliy mushoxada va haftaning eng muhim yangiliklari sharhi.", genre: "Yangiliklar" },
                { time: "13:00 — 14:00", title: "Yo'l-yo'lakay", host: "Mehmonlar bilan", description: "Mashhur aktyorlar, musiqachilar, sportchilar va taniqli shaxslar bilan suhbatlar.", genre: "Intervyu" },
                { time: "14:00 — 15:00", title: "Yakanuniy yangiliklar", host: "Anna Axperjan'yans", description: "Rus tilida haftaning eng muhim yangiliklari va voqealar yakuni.", genre: "Yangiliklar" },
                { time: "15:00 — 16:30", title: "Muzika Non-stop", host: "Auto Mix", description: "Dam olish kuningizni maroqli o'tkazish uchun sara taronalar.", genre: "Musiqa" },
                { time: "16:30 — 17:30", title: "Afisha", host: "Boshlovchi", description: "Madaniy xordiq chiqarish uchun ko'ngilochar dasturlar haqida barchasini bilib oling!", genre: "Ko'ngilochar" },
                { time: "17:30 — 06:00", title: "Shanba Oqshomi", host: "DJ Mix", description: "Tungi Toshkent ritmini biz bilan his qiling.", genre: "Dance / Pop" },
            ],
            sun: [
                { time: "Kun Bo'yi", title: "Dam Olish Kuni", host: "Auto Mix", description: "Yakshanba hordig'i uchun eng saralangan va sokin musiqiy to'plam.", genre: "Lounge / Ambient" },
            ],
        },
    },
    common: {
        logoAlt: "TempFM Logotipi",
    },
};

export default uz;
