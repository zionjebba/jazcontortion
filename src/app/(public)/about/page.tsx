"use client";

import Image from "next/image";
import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/reveal";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      
      <div className="mx-auto max-w-[95%] lg:max-w-7xl px-6 py-32 lg:px-12 lg:py-48 flex flex-col lg:flex-row gap-16 lg:gap-32">
        
        {/* STICKY LEFT COLUMN: IMAGE */}
        <div className="w-full lg:w-1/2 relative">
          <div className="lg:sticky lg:top-32 h-[50vh] lg:h-[70vh] w-full overflow-hidden rounded-3xl border border-foreground/5 bg-foreground/5 group shadow-xl">
            <Image
              src="/hero-image-2.png"
              alt="Jaz Contortion"
              fill
              className="object-cover object-top transition-transform duration-[2s] ease-out group-hover:scale-105"
              priority
            />
            {/* Interactive Glow Overlay */}
            <div className="absolute inset-0 bg-primary/0 transition-colors duration-1000 group-hover:bg-primary/10 mix-blend-overlay" />
          </div>
        </div>

        {/* SCROLLING RIGHT COLUMN: STORY */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <RevealOnScroll>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6">
              The Journey
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.04em] leading-[0.9] mb-12">
              Building a body <br/>
              <span className="text-foreground/40">that can move.</span>
            </h1>
          </RevealOnScroll>

          <div className="flex flex-col gap-12 text-lg lg:text-xl leading-relaxed text-foreground/80 font-medium">
            <RevealOnScroll delayClass="delay-100">
              <p>
                My name is Jaz, and I didn't start with natural extreme flexibility. 
                Like many, I had to learn how my body works, how it adapts, and how to push it past what felt like its absolute limits.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delayClass="delay-200">
              <div className="group relative border-l-2 border-primary/20 pl-6 py-2 transition-all hover:border-primary">
                <p className="relative z-10 transition-colors group-hover:text-foreground">
                  I discovered that <strong className="text-foreground">flexibility is a skill</strong>, not just a genetic gift. It requires patience, strength, and a deep understanding of your nervous system.
                </p>
                {/* Subtle hover background highlight */}
                <div className="absolute inset-0 -left-[2px] bg-primary/5 w-0 transition-all duration-500 ease-out group-hover:w-full z-0 rounded-r-lg" />
              </div>
            </RevealOnScroll>

            <RevealOnScroll delayClass="delay-300">
              <p>
                Over the years, I've trained to achieve extreme contortion skills, mastering body control in ways I never thought possible. Now, my goal is to help you do the same.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delayClass="delay-400">
              <div className="group relative border-l-2 border-primary/20 pl-6 py-2 transition-all hover:border-primary">
                <p className="relative z-10 transition-colors group-hover:text-foreground">
                  Whether you want to touch your toes for the first time, or learn how to fold yourself in half, <strong className="text-foreground">the process is the same.</strong> Consistency. Control. Intent.
                </p>
                <div className="absolute inset-0 -left-[2px] bg-primary/5 w-0 transition-all duration-500 ease-out group-hover:w-full z-0 rounded-r-lg" />
              </div>
            </RevealOnScroll>

            <RevealOnScroll delayClass="delay-500" className="pt-12">
              <Link
                href="/start"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-foreground px-10 py-5 text-sm font-bold uppercase tracking-widest text-background transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_10px_40px_-10px_rgba(255,138,0,0.5)]"
              >
                Start Your Journey
              </Link>
            </RevealOnScroll>
          </div>
        </div>

      </div>
    </main>
  );
}