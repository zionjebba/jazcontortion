"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Start Here", href: "/start" },
  { label: "Programs", href: "/programs" },
  { label: "Free Training", href: "/free-training" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Legal", href: "/legal" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-md border-b border-foreground/5 transition-all duration-300">
      <nav className="mx-auto flex h-16 lg:h-20 max-w-[95%] items-center justify-between px-4 lg:max-w-[90%] lg:px-8">
        
        {/* Left — Logo */}
        <div className="flex shrink-0 items-center">
          <Link href="/" className="flex flex-col group">
           <Image src="/logo.png" alt="Logo" width={100} height={100} />
           
          </Link>
        </div>

        {/* Center — Navigation */}
        <div className="hidden flex-1 items-center justify-center gap-1 xl:flex px-4">
          {navLinks.map((link) => {
            const isActive = link.href === "/" 
              ? pathname === "/" 
              : pathname.startsWith(link.href);
              
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative whitespace-nowrap text-xs font-bold uppercase tracking-widest transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground px-4 py-2 rounded-full"
                    : "text-foreground/50 hover:text-foreground px-4 py-2"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right — Auth + CTA */}
        <div className="flex shrink-0 items-center justify-end gap-4">
          {status === "authenticated" ? (
            <>
              {session?.user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="hidden items-center justify-center rounded-full bg-red-500/10 px-5 py-2.5 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-red-500 transition-colors hover:bg-red-500/20 sm:flex"
                >
                  ADMIN
                </Link>
              )}
              <Link
                href="/account"
                className="hidden items-center justify-center rounded-full bg-primary/10 px-5 py-2.5 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary/20 sm:flex"
              >
                MY ACCOUNT
              </Link>
              <button
                onClick={() => signOut()}
                className="hidden items-center justify-center rounded-full bg-primary px-5 py-2.5 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105 sm:flex"
              >
                LOG OUT
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="hidden items-center justify-center rounded-full bg-primary px-5 py-2.5 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105 sm:flex"
            >
              LOGIN
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="flex items-center justify-center rounded-full border border-foreground/10 bg-background/50 p-2.5 text-foreground backdrop-blur transition-colors hover:bg-foreground/5 xl:hidden"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute inset-x-0 top-[100%] z-40 border-b border-foreground/10 bg-background/95 p-4 backdrop-blur-md xl:hidden flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-bold uppercase tracking-widest text-foreground/80 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          {status === "authenticated" ? (
            <>
              {session?.user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-2 mx-auto w-full max-w-[200px] rounded-full bg-red-500/10 px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-red-500"
                >
                  ADMIN PANEL
                </Link>
              )}
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mx-auto w-full max-w-[200px] rounded-full bg-primary/10 px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-primary"
              >
                MY ACCOUNT
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  signOut();
                }}
                className="mx-auto w-full max-w-[200px] rounded-full bg-primary px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-primary-foreground"
              >
                LOG OUT
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 mx-auto w-full max-w-[200px] rounded-full bg-primary px-5 py-3 text-center text-xs font-bold uppercase tracking-widest text-primary-foreground"
            >
              LOGIN
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
