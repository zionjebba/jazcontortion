"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, CreditCard, PlaySquare, Settings, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Programs", href: "/admin/programs", icon: PlaySquare },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Sales", href: "/admin/sales", icon: CreditCard },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Topbar */}
      <div className="flex h-16 items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-xl px-4 lg:hidden sticky top-0 z-40">
        <Link href="/admin" className="flex shrink-0 items-center">
          <Image src="/logo.png" alt="Logo" width={80} height={80} className="object-contain" />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full bg-secondary p-2 text-foreground transition-colors hover:bg-white/10"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Sidebar overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/5 bg-background/95 backdrop-blur-2xl transition-transform duration-500 ease-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="hidden h-24 items-center border-b border-white/5 px-8 lg:flex">
          <Link href="/admin" className="flex shrink-0 items-center transition-transform hover:scale-105">
            <Image src="/logo.png" alt="Logo" width={100} height={100} className="object-contain" />
          </Link>
        </div>

        <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? "bg-primary/10 text-primary shadow-[inset_0_0_20px_rgba(255,100,0,0.1)]"
                    : "text-foreground/60 hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <item.icon className={`size-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/5 p-4 space-y-2">
          <Link 
            href="/"
            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold uppercase tracking-widest text-foreground/50 transition-colors hover:bg-white/5 hover:text-foreground"
          >
            ← Main Site
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold uppercase tracking-widest text-red-500/70 transition-all duration-300 hover:bg-red-500/10 hover:text-red-500"
          >
            <LogOut className="size-4 transition-transform group-hover:-translate-x-1" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
