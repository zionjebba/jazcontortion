import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProgramCatalog } from "@/components/programs/ProgramCatalog";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

export default async function ProgramsPage() {
  const programs = await prisma.program.findMany({
    where: {
      isPublished: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <main className="relative min-h-screen bg-background">
      {/* FULL PAGE BACKGROUND */}
      <div className="fixed inset-0 z-0 h-screen w-full pointer-events-none">
        <Image
          src="/hero-image-3.png"
          alt=""
          fill
          priority
          className="object-cover object-top opacity-60 grayscale"
        />
        
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* HERO */}
      <section className="relative z-10 flex min-h-[60vh] flex-col justify-center items-center overflow-hidden px-6 py-32 text-center lg:min-h-[70vh] lg:px-12">
        <div className="relative mx-auto w-full lg:max-w-[90%]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            JAZCONTORTION PROGRAMS
          </p>

          <h1 className="mt-5 max-w-5xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-8xl">
            TRAIN
            <br />
            <span className="text-primary">DIFFERENT.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base leading-7 text-foreground/60 sm:text-lg">
            Structured training for flexibility, strength, control, and
            movement. Filter the catalog below to find exactly what you want
            to work on.
          </p>

          <div className="mt-8">
            <Link
              href="/programs"
              className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-8 py-3 text-sm font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_rgba(255,100,0,0.4)]"
            >
              Not sure where to start? →
            </Link>
          </div>
        </div>
      </section>

      {/* DYNAMIC CATALOG */}
      <section className="relative z-10">
        <Suspense fallback={<div className="h-96 w-full animate-pulse bg-background/50" />}>
          <ProgramCatalog programs={programs} />
        </Suspense>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 mx-auto mb-32 w-[92%] lg:max-w-[90%] overflow-hidden rounded-[3rem] border border-primary/20 bg-card p-1">
        {/* Animated glowing background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background opacity-50" />
        <div className="absolute -right-32 -top-32 size-64 rounded-full bg-primary/20 blur-[80px]" />

        <div className="relative flex flex-col items-center rounded-[2.5rem] border border-foreground/5 bg-background/50 px-8 py-16 text-center backdrop-blur-sm sm:px-16 sm:py-20">
          <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary shadow-[0_0_40px_-10px_rgba(255,100,0,0.4)]">
            <MapPin className="size-8" />
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
            STILL DECIDING?
          </p>

          <h2 className="mt-4 text-4xl font-black leading-[1] tracking-[-0.04em] sm:text-5xl">
            Let your goals choose.
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Take our quick interactive quiz to discover exactly which program
            is built for your body and your goals.
          </p>

          <Link
            href="/programs"
            className="mt-12 flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-xl transition-all hover:-translate-y-1 hover:shadow-primary/25"
          >
            TAKE THE QUIZ
          </Link>
        </div>
      </section>
    </main>
  );
}   