import Link from "next/link";

const footerLinks = {
  Stansiya: [
    { href: "/schedule", label: "Dasturlar" },
    { href: "/news", label: "Yangiliklar" },
    { href: "/about", label: "Biz haqimizda" },
    { href: "/advertising", label: "Reklama" },
  ],
  "Bog'lanish": [
    { href: "https://instagram.com/radiotempfm", label: "Instagram" },
    { href: "https://t.me/radiotempfm", label: "Telegram" },
  ],
  Qoidalar: [
    { href: "#", label: "Maxfiylik siyosati" },
    { href: "#", label: "Foydalanish shartlari" },
    { href: "#", label: "Cookie siyosati" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <div className="relative w-[120px] h-10 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.svg"
                  alt="TempFM Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-xs">
              Toshkentning ovozi. Shahar ritmiga mos podkastlar, shoular va musiqa.
            </p>
          </div>

          {/* Link Groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[var(--color-text-secondary)] hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-muted)] text-xs">
            &copy; {new Date().getFullYear()} TempFM 88.4. Barcha huquqlar himoyalangan.
          </p>
          <p className="text-[var(--color-text-muted)] text-xs">
            Sariksuv Street, BHH Tower, Tashkent, Uzbekistan
          </p>
        </div>
      </div>
    </footer>
  );
}
