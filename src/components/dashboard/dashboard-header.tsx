"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function DashboardHeader() {
  const { data: session } = useSession();

  const name = session?.user?.name || "Account";

  const initials =
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-foreground/10 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 w-full max-w-[95%] items-center justify-between px-4 lg:max-w-[90%] lg:px-8">

        {/* BRAND */}
        <Link href="/account" className="group flex flex-col">
          <span className="text-xl font-black uppercase leading-none tracking-tighter transition-colors group-hover:text-primary">
            JAZ
          </span>

          <span className="mt-1 text-[9px] font-bold uppercase leading-none tracking-[0.25em] text-primary">
            CONTORTION
          </span>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-3">

          <Link
            href="/"
            className="hidden rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest text-foreground/50 transition-colors hover:text-foreground sm:block"
          >
            Main Site
          </Link>

          <Link
            href="/account"
            className="hidden rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:text-foreground sm:block"
          >
            Dashboard
          </Link>

          <Link
            href="/profile"
            className="group flex items-center gap-3 rounded-full border border-foreground/10 bg-foreground/5 py-1.5 pl-1.5 pr-4 transition-colors hover:border-primary/30"
          >
            <div className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-primary text-[10px] font-black text-primary-foreground">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={name}
                  className="size-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <span className="hidden text-xs font-bold uppercase tracking-wider sm:block">
              {name}
            </span>
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="hidden rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-0.5 sm:block"
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}