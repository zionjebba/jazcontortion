import { Hero } from "@/components/home/Hero";
import { ValueStrip } from "@/components/home/ValuesStrip";
import { GoalSelector } from "@/components/home/GoalSelector";
import { FeaturedProgram } from "@/components/home/FeaturedProgram";
import { FreeTraining } from "@/components/home/FreeTraining";

export default function Home() {
  return (
    <div className="w-full font-sans">
      <Hero />
      <ValueStrip />
      <GoalSelector />
      <FeaturedProgram />
      <FreeTraining />
    </div>
  );
}
