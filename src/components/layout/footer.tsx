import Link from "next/link";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/jazcontortion" },
  { label: "TikTok", href: "https://tiktok.com/@jazcontortion" },
  { label: "YouTube", href: "https://www.youtube.com/@jazcontortion" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export function Footer() {
  return (
    <footer className="relative z-50 bg-foreground text-background">
      <div className="mx-auto max-w-[95%] lg:max-w-[90%] px-6 py-16 lg:px-8 lg:py-20">
        {/* Main footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold tracking-[-0.05em]">
              JazContortion
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-background/60">
              Flexibility, movement and control. Learn to move differently.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold">CONTACT</p>

            <a
              href="mailto:hello@jazcontortion.com"
              className="mt-4 block text-sm text-background/60 transition-colors hover:text-background"
            >
              hello@jazcontortion.com
            </a>
          </div>

          {/* Social */}
          <div>
            <p className="text-sm font-semibold">FOLLOW</p>

            <div className="mt-4 flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-background/60 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col gap-4 border-t border-background/10 pt-6 text-sm text-background/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} JazContortion</p>

          <div className="flex flex-wrap gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-background"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
