import Image from "next/image";
import Link from "next/link";
import type { Program } from "@prisma/client";

type ProgramGridProps = {
  programs: Program[];
};

export function ProgramGrid({ programs }: ProgramGridProps) {
  if (programs.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-foreground/50">
        More programs coming soon.
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {programs.map((program) => {
        return (
          <Link
            key={program.slug}
            href={`/programs/${program.slug}`}
            className="group relative flex flex-col h-full overflow-hidden rounded-[2rem] border border-white/5 bg-background/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,100,0,0.15)] hover:border-primary/30"
          >
            {/* Image */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/40">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-foreground backdrop-blur-md">
                {program.level}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-8">
              <h3 className="text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                {program.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {program.tagline}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-border/50 pt-6">
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  View Details
                </span>
                <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:translate-x-2 group-hover:bg-primary group-hover:text-primary-foreground">
                  →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
