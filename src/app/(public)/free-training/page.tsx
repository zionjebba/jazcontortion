import Link from "next/link";

import { PlaylistShowcase } from "@/components/free-training/PlaylistShowcase";
import { RevealOnScroll } from "@/components/ui/reveal";

export default function FreeTrainingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      {/* HERO */}
      <section className="relative px-6 pb-20 pt-40 lg:px-12 lg:pb-28">
        <RevealOnScroll className="mx-auto flex flex-col w-full lg:max-w-[90%] items-center text-center gap-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FF0000]">
              YOUTUBE TRAINING
            </p>

            <h1 className="mt-5 text-6xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
              TRAIN
              <br />
              <span className="text-primary">FOR FREE.</span>
            </h1>
          </div>

          <div className="max-w-2xl pb-2">
            <p className="text-lg font-medium leading-7">
              You don't need a program to start moving.
            </p>

            <p className="mt-4 text-base leading-7 text-foreground/60">
              Follow along with free training, flexibility sessions,
              challenges, and movement videos on YouTube.
            </p>

            <a
              href="https://www.youtube.com/@jazcontortion/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FF0000]/10 border border-[#FF0000]/20 px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#FF0000] transition-all hover:-translate-y-1 hover:bg-[#FF0000] hover:text-white hover:shadow-[0_20px_40px_-15px_rgba(255,0,0,0.4)]"
            >
              VISIT THE CHANNEL
            </a>
          </div>
        </RevealOnScroll>

        {/* Decorative orange circle */}
        <div className="pointer-events-none absolute -right-24 top-32 size-80 rounded-full bg-primary/15" />
      </section>


      {/* PLAYLIST SHOWCASE */}
      <RevealOnScroll>
        <PlaylistShowcase />
      </RevealOnScroll>

      {/* FREE → PAID */}
      <section className="bg-secondary px-6 py-24 lg:px-12 lg:py-24">
        <RevealOnScroll className="mx-auto flex flex-col w-full lg:max-w-[90%] items-center text-center gap-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              READY FOR MORE?
            </p>

            <h2 className="mt-4 max-w-3xl text-5xl font-black uppercase leading-[0.85] tracking-[-0.06em] sm:text-6xl">
              FREE IS A
              <br />
              <span className="text-primary">STARTING POINT.</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-foreground/60">
              When you're ready for a structured plan, explore the programs
              designed to take your training further.
            </p>
          </div>

          <Link
            href="/programs"
            className="shrink-0 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-1"
          >
            EXPLORE PROGRAMS →
          </Link>
        </RevealOnScroll>
      </section>
    </main>
  );
}