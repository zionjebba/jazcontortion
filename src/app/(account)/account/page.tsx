import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      entitlements: {
        include: {
          program: {
            include: {
              modules: {
                include: {
                  lessons: {
                    select: { id: true },
                  },
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const completedProgress = await prisma.lessonProgress.findMany({
    where: { userId: session.user.id, completed: true },
    select: { lessonId: true },
  });
  const completedLessonIds = new Set(completedProgress.map(p => p.lessonId));

  const programs = user.entitlements.map((entitlement) => {
    const program = entitlement.program;
    const allLessonIds = program.modules.flatMap(m => m.lessons.map(l => l.id));
    const completedCount = allLessonIds.filter(id => completedLessonIds.has(id)).length;
    const progressPercent = allLessonIds.length > 0 ? Math.round((completedCount / allLessonIds.length) * 100) : 0;

    return {
      ...program,
      progressPercent,
      completedCount,
      totalLessons: allLessonIds.length,
    };
  });

  return (
    <>
      <main className="min-h-screen bg-background px-6 pb-24 pt-32 lg:px-12 selection:bg-primary/20">
        <div className="mx-auto w-full lg:max-w-[90%]">
          
          {/* HEADER */}
          <section className="mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-4">
              DASHBOARD
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-[-0.04em] leading-[0.9]">
              Welcome back, <br/>
              <span className="text-foreground/40">{user.name?.split(" ")[0] || "User"}.</span>
            </h1>
          </section>

          {/* TRAINING LIBRARY */}
          <section className="mt-12">
            <div className="flex items-end justify-between border-b border-foreground/10 pb-6 mb-10">
              <h2 className="text-2xl lg:text-3xl font-black uppercase tracking-[-0.02em]">
                Your Library
              </h2>
              <span className="text-xs font-bold uppercase tracking-wider text-foreground/50">
                {programs.length} {programs.length === 1 ? "Program" : "Programs"}
              </span>
            </div>

            {programs.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                {programs.map((program) => (
                  <Link
                    key={program.id}
                    href={`/account/programs/${program.slug}`}
                    className="group relative flex flex-col h-full overflow-hidden rounded-[2rem] border border-white/5 bg-secondary hover:shadow-[0_20px_40px_-15px_rgba(255,100,0,0.15)] hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
                  >
                    {/* IMAGE SECTION */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                      <Image
                        src={program.image || "/program-back-flexibility.png"}
                        alt={program.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                      />
                      
                      {/* Hover Overlay with Progress */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col items-center justify-center p-6 text-center">
                        <p className="text-3xl font-black text-white mb-2">{program.progressPercent}%</p>
                        <div className="w-2/3 h-1.5 bg-white/20 rounded-full overflow-hidden mb-6">
                          <div className="h-full bg-primary" style={{ width: `${program.progressPercent}%` }} />
                        </div>
                        <span className="inline-flex rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-lg scale-90 transition-transform duration-500 group-hover:scale-100">
                          {program.progressPercent > 0 ? "Continue Training" : "Start Program"}
                        </span>
                      </div>
                    </div>

                    {/* TEXT CONTENT */}
                    <div className="flex flex-col p-6 lg:p-8 flex-1 justify-between bg-background/50 backdrop-blur-md">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">
                          {program.type}
                        </p>
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-3">
                          {program.title}
                        </h3>
                        <p className="text-sm text-foreground/60 line-clamp-2 leading-relaxed">
                          {program.description}
                        </p>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground/40 pt-4 border-t border-foreground/10">
                        <span>{program.completedCount} / {program.totalLessons} Lessons</span>
                        <span className="text-primary transition-transform duration-300 group-hover:translate-x-1">Open →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="rounded-[2.5rem] border border-foreground/10 bg-secondary px-8 py-20 text-center backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  YOUR LIBRARY IS EMPTY
                </p>
                <h3 className="mt-6 text-4xl font-black uppercase tracking-[-0.05em]">
                  Ready to start?
                </h3>
                <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-foreground/50">
                  Explore the available programs and start building your flexibility, strength, and movement control.
                </p>
                <Link
                  href="/programs"
                  className="mt-10 inline-flex items-center justify-center rounded-full bg-foreground px-8 py-4 text-sm font-bold uppercase tracking-widest text-background transition-all hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_10px_30px_-10px_rgba(255,100,0,0.5)]"
                >
                  Explore Programs
                </Link>
              </div>
            )}
          </section>

        </div>
      </main>
    </>
  );
}