import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, PlayCircle, Download, ChevronDown, ChevronRight } from "lucide-react";

type TrainingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TrainingPage({
  params,
}: TrainingPageProps) {
  const { slug } = await params;

  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const entitlement = await prisma.entitlement.findFirst({
    where: {
      userId: session.user.id,
      program: {
        slug,
      },
    },
    include: {
      program: {
        include: {
          modules: {
            orderBy: {
              position: "asc",
            },
            include: {
              lessons: {
                orderBy: {
                  position: "asc",
                },
              },
            },
          },
        },
      },
    },
  });

  if (!entitlement) {
    notFound();
  }

  const program = entitlement.program;

  const allLessons = program.modules.flatMap(
    (module) => module.lessons,
  );

  const completedLessons = await prisma.lessonProgress.findMany({
    where: {
      userId: session.user.id,
      lessonId: {
        in: allLessons.map((lesson) => lesson.id),
      },
      completed: true,
    },
    select: {
      lessonId: true,
    },
  });

  const completedLessonIds = new Set(
    completedLessons.map((item) => item.lessonId),
  );

  const completedCount = completedLessonIds.size;

  const progress =
    allLessons.length > 0
      ? Math.round(
          (completedCount / allLessons.length) * 100,
        )
      : 0;

  return (
    <main className="min-h-screen bg-background pb-32">
      {/* HERO SECTION */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-black overflow-hidden pt-24">
        <Image
          src={program.image || "/hero-image-3.png"}
          alt={program.title}
          fill
          priority
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end px-6 lg:px-12 pb-16">
          <div className="mx-auto w-full lg:max-w-[90%]">
            <Link
              href="/account"
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground/50 transition-colors hover:text-primary mb-8"
            >
              <ArrowLeft className="size-4" /> My Programs
            </Link>
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              <div className="max-w-4xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
                  {program.type}
                </p>
                <h1 className="text-5xl font-black uppercase leading-[0.85] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                  {program.title}
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/80">
                  {program.description}
                </p>
              </div>

              {/* HERO PROGRESS CARD */}
              <div className="shrink-0 w-full sm:w-80 rounded-3xl border border-white/10 bg-background/50 backdrop-blur-xl p-6">
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      YOUR PROGRESS
                    </p>
                    <p className="mt-1 text-sm text-foreground/60 font-medium">
                      {completedCount} / {allLessons.length} lessons
                    </p>
                  </div>
                  <span className="text-3xl font-black">{progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="mx-auto w-full lg:max-w-[90%] px-6 lg:px-12 mt-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
        
        {/* MAIN: MODULES */}
        <section className="space-y-6">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-8">
            Curriculum
          </h2>
          
          {program.modules.map((module) => {
            const moduleCompleted = module.lessons.filter(
              (lesson) => completedLessonIds.has(lesson.id),
            ).length;

            return (
              <details
                key={module.id}
                className="group rounded-[2rem] border border-foreground/5 bg-secondary overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-all duration-300 hover:border-foreground/20 shadow-sm"
              >
                <summary className="flex items-center justify-between p-6 lg:p-8 cursor-pointer select-none">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      MODULE {String(module.position).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-2xl lg:text-3xl font-black uppercase tracking-tight group-open:text-primary transition-colors">
                      {module.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-foreground/40 hidden sm:block">
                      {moduleCompleted}/{module.lessons.length}
                    </span>
                    <div className="flex size-10 items-center justify-center rounded-full bg-background transition-transform duration-300 group-open:rotate-180">
                      <ChevronDown className="size-5" />
                    </div>
                  </div>
                </summary>
                
                <div className="px-6 pb-6 lg:px-8 lg:pb-8 pt-2 space-y-3">
                  {module.lessons.map((lesson) => {
                    const completed = completedLessonIds.has(lesson.id);

                    return (
                      <Link
                        key={lesson.id}
                        href={`/account/programs/${program.slug}/lessons/${lesson.id}`}
                        className="group/lesson flex items-center gap-5 rounded-2xl bg-background p-4 pl-5 transition-all hover:scale-[1.01] hover:shadow-lg hover:border-primary/50 border border-transparent"
                      >
                        <span
                          className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                            completed
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-foreground/50 group-hover/lesson:bg-primary/10 group-hover/lesson:text-primary"
                          }`}
                        >
                          {completed ? "✓" : <PlayCircle className="size-4" />}
                        </span>

                        <span className="font-semibold text-lg">
                          {lesson.title}
                        </span>

                        <span className="ml-auto text-foreground/30 transition-transform group-hover/lesson:translate-x-1 group-hover/lesson:text-primary">
                          <ChevronRight className="size-5" />
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </details>
            );
          })}
        </section>

        {/* SIDEBAR: RESOURCES */}
        <aside>
          <div className="sticky top-32">
            <h2 className="text-xl font-black uppercase tracking-tight mb-8">
              Resources
            </h2>
            <div className="space-y-4">
              {[
                { key: "blueprint", title: "Blueprint PDF", desc: "Training protocol" },
                { key: "calendar", title: "Calendar", desc: "Printable schedule" },
                { key: "tracker", title: "Tracker", desc: "Progress sheet" },
              ].map((resource) => (
                <a
                  key={resource.key}
                  href={`/api/download?resource=${resource.key}`}
                  className="group flex items-center gap-4 rounded-2xl border border-foreground/5 bg-secondary p-5 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-background text-primary transition-transform group-hover:scale-110">
                    <Download className="size-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{resource.title}</p>
                    <p className="mt-1 text-xs text-foreground/50">{resource.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}