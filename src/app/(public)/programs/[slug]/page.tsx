import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProgramIncludes } from "@/components/programs/ProgramIncludes";

type ProgramPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = await prisma.program.findUnique({
    where: { slug },
  });

  if (!program) return { title: "Program Not Found" };

  return {
    title: program.title,
    description: program.description,
    openGraph: {
      title: program.title,
      description: program.description,
      images: [{ url: program.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: program.title,
      description: program.description,
      images: [program.image],
    },
  };
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;

  const program = await prisma.program.findUnique({
    where: {
      slug,
    },
  });

  if (!program) {
    notFound();
  }

  if (!program.isPublished) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-lg text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            COMING SOON
          </p>

          <h1 className="mt-4 text-4xl font-black uppercase">
            This program is not currently available.
          </h1>

          <p className="mt-5 text-sm leading-6 text-foreground/50">
            We are still putting the finishing touches on this training program.
            Check back later!
          </p>

          <Link
            href="/programs"
            className="mt-8 inline-flex rounded-full bg-primary px-7 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground"
          >
            BACK TO PROGRAMS
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* HERO */}
      <section className="mx-auto grid w-[90%] lg:max-w-[90%] items-center gap-12 px-6 pb-24 pt-40 lg:grid-cols-2 lg:px-8">
        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-secondary">
          <Image
            src={program.image}
            alt={program.title}
            width={900}
            height={900}
            priority
            className="h-auto w-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {program.level}
          </p>

          <h1 className="mt-5 text-5xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            {program.title}
          </h1>

          <p className="mt-5 text-xl font-medium">{program.tagline}</p>

          <p className="mt-6 max-w-xl text-base leading-7 text-foreground/65 sm:text-lg">
            {program.description}
          </p>

          <div className="mt-8 flex items-center gap-5">
            <span className="text-3xl font-bold">${program.price}</span>

            <span className="text-sm text-foreground/50">
              One-time purchase
            </span>
          </div>

          <Link
            href={`/checkout/${program.slug}`}
            className="mt-8 inline-flex rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-1"
          >
            GET ACCESS →
          </Link>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="bg-secondary px-6 py-20 lg:px-8 lg:py-20">
        <div className="mx-auto w-full lg:max-w-[90%]">
          <ProgramIncludes items={program.includes} />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto w-full px-6 py-24 lg:px-8 bg-secondary/30">
        <div className="mx-auto w-full lg:max-w-[90%]">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              HOW IT WORKS
            </p>

            <h2 className="mt-4 text-4xl font-black uppercase leading-tight tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              TRAIN. PRACTICE.
              <br />
              <span className="text-primary">PROGRESS.</span>
            </h2>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-3 relative">
            {/* Connecting Line (desktop only) */}
            <div className="hidden md:block absolute top-[4.5rem] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            {[
              {
                number: "01",
                title: "GET THE PROGRAM",
                text: "Unlock immediate access to the complete training curriculum and all resources designed for your goal.",
              },
              {
                number: "02",
                title: "FOLLOW THE PLAN",
                text: "Use the high-quality follow-along videos and supporting materials to build real consistency.",
              },
              {
                number: "03",
                title: "KEEP PROGRESSING",
                text: "Use your interactive calendar and progress tracker to stay consistent and witness your own evolution.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="group relative flex flex-col items-center text-center rounded-[2.5rem] border border-white/5 bg-background p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(255,0,0,0.1)] hover:border-primary/20"
              >
                <div className="relative flex size-20 items-center justify-center rounded-full bg-secondary mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary/10">
                  <span className="text-2xl font-black text-primary">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-2xl font-black uppercase tracking-[-0.02em]">
                  {step.title}
                </h3>

                <p className="mt-4 text-base leading-relaxed text-foreground/60">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACCESS CTA */}
      <section id="get-access" className="px-6 py-24 lg:px-8">
        <div className="mx-auto w-[90%] lg:max-w-[90%] relative overflow-hidden rounded-[3rem] bg-foreground px-8 py-24 text-background sm:px-12 lg:px-20 shadow-2xl text-center">
          {/* Decorative Glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />

          <div className="relative z-10 mx-auto max-w-2xl flex flex-col items-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              READY TO START?
            </p>

            <h2 className="mt-6 text-5xl font-black uppercase leading-[0.85] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              START YOUR
              <br />
              <span className="text-primary">TRAINING.</span>
            </h2>

            <p className="mt-6 text-base leading-relaxed text-background/60 sm:text-lg">
              Get the program now and start working toward your goal at your own
              pace, on your own schedule.
            </p>

            <div className="mt-12 flex flex-col items-center gap-4">
              <span className="text-5xl font-black">${program.price}</span>
              <span className="text-xs uppercase tracking-widest text-background/40 font-bold mb-2">
                One-time payment
              </span>

              <button
                type="button"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-primary px-12 py-5 text-sm font-bold tracking-widest uppercase text-primary-foreground transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(255,100,0,0.5)]"
              >
                GET INSTANT ACCESS
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
