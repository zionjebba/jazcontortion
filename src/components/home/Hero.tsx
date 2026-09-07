"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent pt-12 pb-8 lg:pt-32 lg:pb-0 min-h-[calc(100vh-4rem)] flex items-center">
      <div className="mx-auto w-full max-w-[95%] px-4 lg:max-w-[90%] lg:px-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24 xl:gap-32 items-center">
        
        {/* LEFT SIDE - TYPOGRAPHY */}
        <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left pb-4 lg:pb-24">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">
            Train your body. Express yourself.
          </p>
          <div className="flex flex-col">
            <h1 className="text-6xl sm:text-[6rem] lg:text-[5rem] xl:text-[7rem] font-black uppercase leading-[0.85] tracking-[-0.05em] text-foreground">
              Flexibility.
            </h1>
            <h1 className="text-6xl sm:text-[6rem] lg:text-[5rem] xl:text-[7rem] font-black uppercase leading-[0.85] tracking-[-0.05em] text-primary">
              Mobility.
            </h1>
            <h1 className="text-6xl sm:text-[6rem] lg:text-[5rem] xl:text-[7rem] font-black uppercase leading-[0.85] tracking-[-0.05em] text-foreground">
              Control.
            </h1>
          </div>

          <p className="mt-6 max-w-md text-base sm:text-lg font-medium leading-relaxed text-foreground/80 mx-auto lg:mx-0">
            Programs, guides and challenges to help you move better, feel better and
            unlock your full potential.
          </p>

          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
            <button className="flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold tracking-widest text-primary-foreground transition-transform hover:scale-105 hover:bg-primary/90">
              START HERE <ArrowRight className="size-4" />
            </button>
            <button className="rounded-full border-2 border-foreground/20 bg-transparent px-8 py-3.5 text-sm font-bold tracking-widest text-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground">
              EXPLORE PROGRAMS
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="relative flex justify-center lg:justify-end items-center h-full min-h-[300px] md:min-h-[550px] lg:min-h-[700px]">
          <Image
            src="/hero-image.png"
            alt="Contortionist"
            width={800}
            height={900}
            priority
            className="absolute inset-0 m-auto w-full h-full max-w-[500px] lg:max-w-none object-contain"
          />
        </div>
        
      </div>
    </section>
  );
}
