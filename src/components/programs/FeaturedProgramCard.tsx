import Image from "next/image";
import Link from "next/link";
import type { Program } from "@prisma/client";

type FeaturedProgramProps = {
  program: Program;
};

export function FeaturedProgram({ program }: FeaturedProgramProps) {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-secondary px-7 py-10 sm:px-10 sm:py-14 lg:min-h-[620px] lg:px-14 lg:py-14">
      {/* Organic orange shape */}
      <div className="absolute -bottom-40 -right-24 h-[430px] w-[65%] rotate-[-8deg] rounded-[50%] bg-primary lg:w-[55%]" />

      {/* Decorative line */}
      <div className="absolute right-[38%] top-10 hidden h-40 w-40 rounded-full border border-primary/30 lg:block" />

      <div className="relative z-10 grid h-full items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* CONTENT */}
        <div className="relative z-30">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            FEATURED PROGRAM
          </p>

          <h1 className="mt-5 max-w-xl text-5xl font-black uppercase leading-[0.84] tracking-[-0.065em] sm:text-6xl lg:text-7xl">
            THE FLEXIBILITY
            <br />
            <span className="text-primary">BLUEPRINT.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg font-medium leading-7">
            {program.tagline}
          </p>

          <p className="mt-4 max-w-md text-sm leading-6 text-foreground/65 sm:text-base">
            {program.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href={`/programs/${program.slug}`}
              className="rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-transform duration-300 hover:-translate-y-1"
            >
              EXPLORE PROGRAM →
            </Link>

            <span className="text-2xl font-black">
              ${program.price}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-wide text-foreground/50">
            <span>Exclusive videos</span>
            <span>PDF guide</span>
            <span>Training calendar</span>
          </div>
        </div>

        {/* VISUAL */}
        <div className="relative min-h-[390px] sm:min-h-[470px]">
          {/* Book */}
          <div className="absolute bottom-0 left-[2%] z-30 w-[35%] -rotate-6 drop-shadow-2xl sm:left-[4%] sm:w-[31%]">
            <Image
              src={program.image}
              alt={program.title}
              width={600}
              height={800}
              className="h-auto w-full"
            />
          </div>

          {/* Laptop */}
          <div className="absolute right-[8%] top-[12%] z-20 w-[67%]">
            <div className="overflow-hidden rounded-xl border-[6px] border-foreground bg-foreground shadow-2xl">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src="/jaz-featured-video.png"
                  alt="JazContortion training video"
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex size-14 items-center justify-center rounded-full bg-background/95 text-foreground shadow-xl">
                    ▶
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-auto h-3 w-[110%] rounded-b-xl bg-foreground" />
          </div>

          {/* Phone */}
          <div className="absolute bottom-[2%] right-[0%] z-40 w-[18%] rotate-3 sm:right-[2%]">
            <div className="overflow-hidden rounded-[1.4rem] border-4 border-foreground bg-foreground p-1 shadow-2xl">
              <div className="relative aspect-[9/19] overflow-hidden rounded-[1rem]">
                <Image
                  src="/jaz-youtube-feed.png"
                  alt="JazContortion YouTube videos"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}