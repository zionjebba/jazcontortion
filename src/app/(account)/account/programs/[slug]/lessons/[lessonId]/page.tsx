import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import MuxPlayer from "@mux/mux-player-react";
import ReactMarkdown from "react-markdown";
import Mux from "@mux/mux-node";
import { ArrowLeft, ArrowRight, PlayCircle, CheckCircle2, ChevronDown } from "lucide-react";

type LessonPageProps = {
  params: Promise<{
    slug: string;
    lessonId: string;
  }>;
};

export default async function LessonPage({
  params,
}: LessonPageProps) {
  const { slug, lessonId } = await params;

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
  const allLessons = program.modules.flatMap((module) => module.lessons);

  const lessonIndex = allLessons.findIndex((lesson) => lesson.id === lessonId);

  if (lessonIndex === -1) {
    notFound();
  }

  const lesson = allLessons[lessonIndex];
  const previousLesson = lessonIndex > 0 ? allLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < allLessons.length - 1 ? allLessons[lessonIndex + 1] : null;

  const completedProgress = await prisma.lessonProgress.findMany({
    where: {
      userId: session.user.id,
      lessonId: { in: allLessons.map((l) => l.id) },
      completed: true,
    },
    select: { lessonId: true },
  });

  const completedLessonIds = new Set(completedProgress.map((p) => p.lessonId));
  const isCompleted = completedLessonIds.has(lesson.id);

  let playbackToken = null;
  if (lesson.muxPlaybackId) {
    const mux = new Mux({
      tokenId: process.env.MUX_TOKEN_ID,
      tokenSecret: process.env.MUX_TOKEN_SECRET,
    });
    
    playbackToken = await mux.jwt.signPlaybackId(lesson.muxPlaybackId, {
      keyId: process.env.MUX_SIGNING_KEY!,
      keySecret: process.env.MUX_SIGNING_PRIVATE_KEY!,
      expiration: "6h", 
    });
  }

  return (
    <main className="min-h-screen bg-background">
      {/* TOP NAVIGATION BAR */}
      <header className="sticky top-0 z-40 w-full border-b border-foreground/10 bg-background/80 backdrop-blur-xl">
        <div className="flex h-16 items-center px-6 lg:px-8">
          <Link
            href={`/account/programs/${program.slug}`}
            className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground/50 transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Back to {program.title}
          </Link>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        
        {/* MAIN VIDEO & CONTENT AREA */}
        <div className="flex-1 px-6 py-8 lg:px-12 lg:py-12">
          <div className="mx-auto w-full max-w-5xl">
            
            {/* VIDEO PLAYER */}
            <section>
              <div className="aspect-video w-full overflow-hidden rounded-3xl bg-black shadow-2xl border border-white/5">
                {lesson.muxPlaybackId ? (
                  <MuxPlayer
                    playbackId={lesson.muxPlaybackId}
                    tokens={{ playback: playbackToken || undefined }}
                    className="h-full w-full object-cover"
                    metadata={{
                      video_id: lesson.id,
                      video_title: lesson.title,
                    }}
                    primaryColor="#FF8A00"
                  />
                ) : lesson.videoUrl ? (
                  <video
                    className="h-full w-full object-cover"
                    controls
                    preload="metadata"
                    src={lesson.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/20 text-2xl text-primary">
                        <PlayCircle className="size-8" />
                      </div>
                      <p className="mt-5 text-sm font-bold uppercase tracking-widest text-foreground/50">
                        Training video
                      </p>
                      <p className="mt-2 text-xs text-foreground/30">
                        Video will be added here
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* LESSON HEADER & ACTIONS */}
            <section className="mt-10 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                  LESSON {lesson.position}
                </p>
                <h1 className="mt-3 text-4xl lg:text-5xl font-black uppercase tracking-[-0.04em] leading-[0.9]">
                  {lesson.title}
                </h1>
                {lesson.description && (
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-foreground/70">
                    {lesson.description}
                  </p>
                )}
              </div>

              {/* COMPLETE ACTION */}
              <div className="shrink-0">
                <form action="/api/progress" method="POST">
                  <input type="hidden" name="lessonId" value={lesson.id} />
                  <input type="hidden" name="slug" value={program.slug} />
                  <button
                    type="submit"
                    className={`flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all ${
                      isCompleted
                        ? "border border-primary bg-primary/10 text-primary hover:bg-primary/20"
                        : "bg-primary text-primary-foreground hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(255,138,0,0.5)]"
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="size-5" /> : null}
                    {isCompleted ? "Completed" : "Mark Complete"}
                  </button>
                </form>
              </div>
            </section>

            {/* LESSON CONTENT */}
            {lesson.content && (
              <section className="mt-12">
                <div className="rounded-[2.5rem] border border-foreground/5 bg-secondary p-8 lg:p-12 shadow-sm">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-8 border-b border-foreground/10 pb-4">
                    Lesson Notes
                  </p>
                  <div className="prose prose-lg prose-invert max-w-none text-foreground/80 selection:bg-primary/20">
                    <ReactMarkdown>{lesson.content}</ReactMarkdown>
                  </div>
                </div>
              </section>
            )}

            {/* NAVIGATION FOOTER */}
            <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-between border-t border-foreground/10 pt-8">
              {previousLesson ? (
                <Link
                  href={`/account/programs/${program.slug}/lessons/${previousLesson.id}`}
                  className="group flex items-center gap-4 rounded-2xl bg-secondary p-5 transition-all hover:-translate-y-1 hover:border-primary/50 border border-transparent"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background transition-transform group-hover:-translate-x-1">
                    <ArrowLeft className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">Previous</p>
                    <p className="mt-1 font-bold text-sm">{previousLesson.title}</p>
                  </div>
                </Link>
              ) : <div />}

              {nextLesson ? (
                <Link
                  href={`/account/programs/${program.slug}/lessons/${nextLesson.id}`}
                  className="group flex items-center text-right gap-4 rounded-2xl bg-secondary p-5 transition-all hover:-translate-y-1 hover:border-primary/50 border border-transparent"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">Next</p>
                    <p className="mt-1 font-bold text-sm">{nextLesson.title}</p>
                  </div>
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background transition-transform group-hover:translate-x-1">
                    <ArrowRight className="size-5" />
                  </div>
                </Link>
              ) : <div />}
            </div>

          </div>
        </div>

        {/* SIDEBAR PLAYLIST */}
        <aside className="w-full lg:w-[400px] border-l border-foreground/10 bg-secondary/30 h-[calc(100vh-4rem)] overflow-y-auto sticky top-16">
          <div className="p-6">
            <h2 className="text-xl font-black uppercase tracking-tight mb-6">Course Content</h2>
            
            <div className="space-y-6">
              {program.modules.map((module) => {
                const isCurrentModule = module.lessons.some(l => l.id === lessonId);
                
                return (
                  <details 
                    key={module.id} 
                    open={isCurrentModule}
                    className="group [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer select-none items-center justify-between pb-3 border-b border-foreground/10 text-sm font-bold uppercase tracking-widest">
                      <span className="group-open:text-primary transition-colors">{module.title}</span>
                      <span className="text-foreground/40 transition-transform duration-300 group-open:rotate-180">
                        <ChevronDown className="size-5" />
                      </span>
                    </summary>
                    <div className="pt-3 space-y-1">
                      {module.lessons.map((l) => {
                        const isActive = l.id === lessonId;
                        const isDone = completedLessonIds.has(l.id);
                        return (
                          <Link
                            key={l.id}
                            href={`/account/programs/${program.slug}/lessons/${l.id}`}
                            className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition-all ${
                              isActive 
                                ? "bg-primary/10 text-primary border border-primary/20" 
                                : "hover:bg-foreground/5 text-foreground/70"
                            }`}
                          >
                            <span className="shrink-0 text-foreground/40">
                              {isDone ? (
                                <CheckCircle2 className="size-4 text-primary" />
                              ) : isActive ? (
                                <PlayCircle className="size-4 text-primary" />
                              ) : (
                                <div className="size-4 flex items-center justify-center text-[10px] font-bold">
                                  {l.position}
                                </div>
                              )}
                            </span>
                            <span className="line-clamp-2 leading-tight">{l.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </details>
                );
              })}
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}