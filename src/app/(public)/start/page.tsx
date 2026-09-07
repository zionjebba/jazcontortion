import { TrainingPath } from "@/components/start/TrainingPath";
export default function StartPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute -left-40 top-40 size-80 rounded-full bg-primary/10" />

      <div className="pointer-events-none absolute -right-48 bottom-0 size-[32rem] rounded-[45%_55%_50%_50%] bg-primary/10" />

      <section className="relative z-10 mx-auto w-full lg:max-w-[90%] px-6 pb-24 pt-36 lg:px-8 lg:pb-32 lg:pt-48">
        <div className="mx-auto mb-24 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            THE JAZ CONTORTION QUIZ
          </p>

          <h1 className="mt-5 text-6xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
            LET'S FIND YOUR
            <br />
            PERFECT MATCH.
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-foreground/60 sm:text-lg">
            Take this quick quiz to discover exactly which program is built for your body and goals.
          </p>
        </div>

        <TrainingPath />
      </section>
    </main>
  );
}