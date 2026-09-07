"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { GoalSelector } from "./Goal-Selector";
import { SubGoalSelector } from "./SubGoalSelector";
import { RecommendationCard, Recommendation } from "./RecommendationCard";
import { ZigzagConnector, ZigzagConnectorHandle } from "./zigzag-connector";
import Link from "next/link";

gsap.registerPlugin(ScrollToPlugin);

const goals = [
  { id: "flexibility", title: "Flexibility", description: "Improve your range of motion.", imageSrc: "/hero-image.png" },
  { id: "strength", title: "Strength", description: "Build strength for your movement.", imageSrc: "/hero-image-2.png" },
  { id: "skills", title: "Skills & Contortion", description: "Work toward specific movement skills.", imageSrc: "/hero-image-3.png" },
];

function getSubGoals(goalId: string) {
  switch (goalId) {
    case "flexibility":
      return [
        { id: "legs", title: "Splits & Legs", description: "Focus on hamstrings, hips, and deep splits.", imageSrc: "/jaz-youtube-feed.png" },
        { id: "back", title: "Backbends & Spine", description: "Focus on spinal mobility and back control.", imageSrc: "/featured-program.png" },
        { id: "active", title: "Active Range", description: "Focus on strength at end ranges.", imageSrc: "/hero-image.png" },
      ];
    case "strength":
      return [
        { id: "calisthenics", title: "Calisthenics", description: "Bodyweight control and skills.", imageSrc: "/hero-image-3.png" },
        { id: "fullbody", title: "Full Body Foundation", description: "Joint prep and raw strength.", imageSrc: "/featured-program.png" },
      ];
    case "skills":
      return [
        { id: "handstands", title: "Handstands", description: "Master balancing on your hands.", imageSrc: "/jaz-youtube-feed.png" },
        { id: "contortion", title: "Contortion Poses", description: "Extreme flexibility skills.", imageSrc: "/hero-image-2.png" },
      ];
    default:
      return [];
  }
}

function getSubGoalQuestion(goalId: string) {
  switch (goalId) {
    case "flexibility": return "What is your primary focus?";
    case "strength": return "What type of strength?";
    case "skills": return "What are you working toward?";
    default: return "";
  }
}

function getRecommendations(goalId: string, subGoalId: string): Recommendation[] {
  if (goalId === "flexibility" && subGoalId === "legs") {
    return [{ title: "Leg Flexibility", description: "Go deeper with stronger, more flexible legs.", href: "/programs/leg-flexibility", label: "VIEW PROGRAM" }];
  }
  if (goalId === "flexibility" && subGoalId === "back") {
    return [{ title: "Back Flexibility", description: "Build the mobility and control behind your backbends.", href: "/programs/back-flexibility", label: "VIEW PROGRAM" }];
  }
  if (goalId === "flexibility" && subGoalId === "active") {
    return [{ title: "Active Flexibility", description: "Turn flexibility into strength and control.", href: "/programs/active-flexibility", label: "VIEW PROGRAM" }];
  }
  if (goalId === "strength" && subGoalId === "calisthenics") {
    return [{ title: "Calisthenics for Flexibility", description: "Build the strength behind your movement.", href: "/programs/calisthenics-for-flexibility", label: "VIEW PROGRAM" }];
  }
  if (goalId === "strength" && subGoalId === "fullbody") {
    return [{ title: "Full Body Strength", description: "Build a bulletproof foundation for advanced movement.", href: "/programs/full-body-strength", label: "VIEW PROGRAM" }];
  }
  if (goalId === "skills" && subGoalId === "handstands") {
    return [{ title: "Handstand Foundations", description: "Master the art of balancing on your hands.", href: "/programs/handstand-foundations", label: "VIEW PROGRAM" }];
  }
  if (goalId === "skills" && subGoalId === "contortion") {
    return [
      { title: "Flexibility Blueprint", description: "Master the basics before advanced poses.", href: "/programs/flexibility-blueprint", label: "VIEW PROGRAM" },
      { title: "Back Flexibility", description: "Essential mobility for deep contortion.", href: "/programs/back-flexibility", label: "VIEW PROGRAM" }
    ];
  }
  
  return [{ title: "The Flexibility Blueprint", description: "A complete program combining structured training and guided videos to help you make consistent progress.", href: "/programs/flexibility-blueprint", label: "VIEW PROGRAM" }];
}

export function TrainingPath() {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [selectedSubGoal, setSelectedSubGoal] = useState<string | null>(null);

  const experienceRef = useRef<HTMLElement>(null);
  const recommendationRef = useRef<HTMLElement>(null);
  
  const connector1Ref = useRef<ZigzagConnectorHandle>(null);
  const connector2Ref = useRef<ZigzagConnectorHandle>(null);

  const playJourneyStep = (
    connector: ZigzagConnectorHandle | null,
    target: HTMLElement | null
  ) => {
    if (!connector || !target) return;

    const pathEl = connector.path;
    const dotEl = connector.dot;

    if (pathEl && dotEl) {
      const length = pathEl.getTotalLength();
      
      const tl = gsap.timeline();
      
      tl.set(pathEl, { strokeDasharray: length, strokeDashoffset: length }, 0);
      tl.set(dotEl, { opacity: 1 }, 0);
      
      const progress = { value: 0 };
      
      tl.to(
        progress,
        {
          value: 1,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            pathEl.style.strokeDashoffset = String(length * (1 - progress.value));
            const point = pathEl.getPointAtLength(length * progress.value);
            dotEl.setAttribute("transform", `translate(${point.x}, ${point.y})`);
          },
        },
        0
      );

      tl.to(
        window,
        {
          duration: 1.5,
          ease: "power2.inOut",
          scrollTo: { y: target, offsetY: 100 },
        },
        0
      );

      tl.to(target, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 1);
    }
  };

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    setSelectedSubGoal(null);
    if (recommendationRef.current) gsap.set(recommendationRef.current, { opacity: 0 });

    setTimeout(() => {
      playJourneyStep(connector1Ref.current, experienceRef.current);
    }, 100);
  };

  const handleSubGoalSelect = (id: string) => {
    setSelectedSubGoal(id);
    
    setTimeout(() => {
      playJourneyStep(connector2Ref.current, recommendationRef.current);
    }, 100);
  };

  const handleRestart = () => {
    setSelectedGoal(null);
    setSelectedSubGoal(null);
    
    gsap.to(window, {
      duration: 1,
      ease: "power2.inOut",
      scrollTo: { y: 0 },
    });
  };

  return (
    <div>
      {/* STEP 1 */}
      <section>
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            STEP 01
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
            What do you want to work on?
          </h2>
        </div>
        
        <GoalSelector 
          goals={goals} 
          selectedGoal={selectedGoal} 
          locked={!!selectedSubGoal} 
          onSelect={handleGoalSelect} 
        />
        
        <div className="mt-8 flex justify-center">
          <Link 
            href="/programs"
            className="rounded-full border-2 border-foreground/10 bg-card px-8 py-4 text-sm font-bold uppercase tracking-widest text-foreground text-center transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
          >
            Not sure? Explore all programs
          </Link>
        </div>
      </section>

      {/* CONNECTOR 1 */}
      <div className={`transition-all duration-500 ease-in-out ${selectedGoal ? "opacity-100 max-h-[240px]" : "opacity-0 max-h-0 overflow-hidden"}`}>
        <ZigzagConnector ref={connector1Ref} active={!!selectedGoal} />
      </div>

      {/* STEP 2 */}
      {selectedGoal && (
        <section key={selectedGoal} ref={experienceRef} className="scroll-mt-24" style={{ opacity: 0 }}>
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">STEP 02</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              {getSubGoalQuestion(selectedGoal)}
            </h2>
          </div>
          <SubGoalSelector 
            subGoals={getSubGoals(selectedGoal)} 
            selectedSubGoal={selectedSubGoal} 
            locked={!!selectedSubGoal} 
            onSelect={handleSubGoalSelect} 
          />
        </section>
      )}

      {/* CONNECTOR 2 */}
      <div className={`transition-all duration-500 ease-in-out ${selectedSubGoal ? "opacity-100 max-h-[240px]" : "opacity-0 max-h-0 overflow-hidden"}`}>
        <ZigzagConnector ref={connector2Ref} active={!!selectedSubGoal} />
      </div>

      {/* STEP 3 (RECOMMENDATION) */}
      {selectedGoal && selectedSubGoal && (
        <section ref={recommendationRef} className="scroll-mt-24" style={{ opacity: 0 }}>
          <RecommendationCard 
            recommendations={getRecommendations(selectedGoal, selectedSubGoal)} 
            onRestart={handleRestart}
          />
          
          <div className="mt-12 flex justify-center">
            <Link 
              href="/programs"
              className="rounded-full border-2 border-foreground/10 bg-card px-8 py-4 text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
            >
              EXPLORE ALL PROGRAMS
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}