import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Play } from "lucide-react";

import { RevealOnScroll } from "@/components/ui/reveal";

export function FeaturedProgram() {
  return (
    <section className="relative overflow-hidden bg-transparent py-16 lg:py-24">
      <div className="relative mx-auto grid w-full max-w-[95%] lg:max-w-[90%] items-center gap-10 lg:gap-32 xl:gap-40 overflow-hidden rounded-[3rem] bg-secondary p-8 sm:p-12 lg:grid-cols-2 lg:p-20 shadow-2xl">
        
        {/* PROGRAM INFO */}
        <RevealOnScroll className="relative z-10 flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
          <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-primary">
            Featured Program
          </p>

          <h2 className="w-full lg:max-w-md text-[3.5rem] sm:text-6xl lg:text-[6rem] font-black uppercase leading-[0.85] tracking-[-0.04em]">
            The Flexibility
            <br />
            Blueprint
          </h2>

          <p className="mt-8 w-full md:max-w-2xl lg:max-w-md text-base leading-relaxed text-foreground/80 sm:text-lg font-medium">
            A complete step-by-step program to build your flexibility foundation
            and see real progress.
          </p>

          <ul className="mt-8 flex flex-col gap-4 text-left">
            {[
              "12 weeks of structured training",
              "50+ exclusive video tutorials",
              "Downloadable progress trackers",
              "Lifetime access & updates",
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-4 text-sm font-bold text-foreground">
                <CheckCircle2 className="size-5 text-primary" />
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-row items-center gap-6">
            <span className="text-5xl font-black tracking-tighter">${"15"}</span>
            <Link
              href="/flexibility-blueprint"
              className="rounded-full bg-primary px-8 py-4 sm:px-10 sm:py-5 text-sm font-bold tracking-widest text-primary-foreground transition-all hover:scale-105 hover:shadow-[0_20px_40px_-15px_rgba(255,100,0,0.5)]"
            >
              VIEW PROGRAM
            </Link>
          </div>
        </RevealOnScroll>

        {/* PRODUCT SHOWCASE */}
        <RevealOnScroll delayClass="delay-200" className="relative mt-12 lg:mt-0 min-h-[350px] sm:min-h-[450px] lg:min-h-[550px] w-full flex items-center justify-center">
          <Link 
            href="/flexibility-blueprint"
            className="group relative block w-full max-w-[500px] aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl transition-transform duration-700 hover:-translate-y-4 hover:shadow-[0_30px_60px_-15px_rgba(255,100,0,0.3)]"
          >
            <Image
              src="/flexibility-blueprint.png"
              alt="The Flexibility Blueprint"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}
