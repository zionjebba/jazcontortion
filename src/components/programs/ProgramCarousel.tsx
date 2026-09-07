"use client";

import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Program } from "@prisma/client";

type ProgramCarouselProps = {
  programs: Program[];
};

export function ProgramCarousel({
  programs,
}: ProgramCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div>
      {/* Heading */}
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            FIND YOUR FOCUS
          </p>

          <h2 className="mt-3 text-4xl font-black uppercase leading-none tracking-[-0.05em] sm:text-5xl">
            More ways
            <br />
            to train.
          </h2>
        </div>

        {/* Controls */}
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous programs"
            className="flex size-11 items-center justify-center rounded-full border border-foreground/15 text-lg transition-colors hover:bg-foreground hover:text-background"
          >
            <ArrowLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next programs"
            className="flex size-11 items-center justify-center rounded-full bg-foreground text-lg text-background transition-transform hover:-translate-y-0.5"
            >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={emblaRef}
        className="mt-10 overflow-hidden"
      >
        <div className="-ml-5 flex">
          {programs.map((program, index) => (
            <div
              key={program.slug}
              className="min-w-0 flex-[0_0_88%] pl-5 sm:flex-[0_0_55%] lg:flex-[0_0_38%]"
            >
              <article
                className={`group relative overflow-hidden rounded-[2rem] ${
                  index % 2 === 0
                    ? "bg-secondary"
                    : "bg-foreground text-background"
                }`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute left-5 top-5 rounded-full bg-background px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground">
                    {program.level}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <h3 className="mt-3 text-3xl font-black uppercase leading-[0.9] tracking-[-0.05em]">
                    {program.title}
                  </h3>

                  <p
                    className={`mt-4 text-sm leading-6 ${
                      index % 2 === 0
                        ? "text-foreground/60"
                        : "text-background/60"
                    }`}
                  >
                    {program.tagline}
                  </p>

                  <Link
                    href={`/programs/${program.slug}`}
                    className="mt-7 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-all group-hover:gap-4"
                  >
                    Explore
                    <span className="text-primary"><ArrowRight className="size-4" /></span>
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile controls */}
      <div className="mt-6 flex gap-2 sm:hidden">
        <button
          type="button"
          onClick={scrollPrev}
          className="flex size-11 items-center justify-center rounded-full border border-foreground/15"
          aria-label="Previous programs"
        >
          <ArrowLeft className="size-5" />
        </button>

        <button
          type="button"
          onClick={scrollNext}
          className="flex size-11 items-center justify-center rounded-full bg-foreground text-background"
          aria-label="Next programs"
        >
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );
}