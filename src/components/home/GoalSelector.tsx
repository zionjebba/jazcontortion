"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { Lottie } from "lottie-react";

const goals = [
  {
    title: "Flexibility",
    description: "Improve your range of motion and overall flexibility.",
    href: "/programs?goal=flexibility",
    lottieSrc: "/flexibility.json",
  },
  {
    title: "Strength",
    description: "Build the strength that supports flexibility.",
    href: "/programs?goal=strength",
    lottieSrc: "/strength.json.json",
  },
  {
    title: "Contortion",
    description: "Train extreme flexibility and contortion skills.",
    href: "/programs?goal=contortion",
    lottieSrc: "/balance.json",
  },
  {
    title: "Skills",
    description: "Build strength and body control for impressive skills.",
    href: "/programs?goal=skills",
    lottieSrc: "/calisthenics.json",
  },
  {
    title: "Body Control",
    description: "Gain control, balance and awareness of your body.",
    href: "/programs?goal=control",
    lottieSrc: "/control.json.json",
  },
];

// Custom component to handle hover state for each Lottie
function HoverGoalCard({ goal }: { goal: typeof goals[0] }) {
  const lottieRef = useRef<any>(null);
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(goal.lottieSrc)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load lottie", err));
  }, [goal.lottieSrc]);

  return (
    <Link
      href={goal.href}
      onMouseEnter={() => lottieRef.current?.play()}
      onMouseLeave={() => lottieRef.current?.stop()}
      className="group flex min-h-64 flex-col items-center justify-between rounded-3xl border border-foreground/10 bg-card p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-lg"
    >
      {/* Icon visual */}
      <div className="flex size-24 items-center justify-center text-primary mb-4">
        {animationData ? (
          <Lottie
            lottieRef={lottieRef}
            src={animationData}
            loop={true}
            autoplay={false}
            className="w-full h-full"
          />
        ) : (
          <div className="size-16 bg-foreground/5 rounded-full animate-pulse" />
        )}
      </div>

      <div className="flex flex-col items-center flex-1">
        <h3 className="text-xl font-bold tracking-[-0.02em]">
          {goal.title}
        </h3>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {goal.description}
        </p>

        <span className="mt-auto pt-4 inline-block text-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-primary">
          ↓
        </span>
      </div>
    </Link>
  );
}

import { RevealOnScroll } from "@/components/ui/reveal";

export function GoalSelector() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Decorative orange shapes */}
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-[45%_55%_60%_40%] bg-primary/10 blur-[80px]" />
      <div className="absolute -right-24 top-1/2 h-80 w-80 rounded-[30%_70%_70%_30%] bg-primary/5 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-[95%] px-4 lg:max-w-[90%] lg:px-8">
        {/* Heading */}
        <RevealOnScroll className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            CHOOSE YOUR GOAL
          </p>

          <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            What do you want to train?
          </h2>
        </RevealOnScroll>

        {/* Goals */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {goals.map((goal, idx) => (
            <RevealOnScroll key={goal.title} delayClass={`delay-[${idx * 100}ms]`}>
              <HoverGoalCard goal={goal} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
