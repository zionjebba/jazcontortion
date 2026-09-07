import { ShapeDivider } from "../ui/shape-divider";
import { PlayCircle, Sparkles, Flame, BarChart2 } from "lucide-react";

const features = [
  {
    title: "Step-by-step programs",
    description: "Structured training that works.",
    icon: <PlayCircle className="size-6" />,
  },
  {
    title: "For all levels",
    description: "Beginner to advanced. We've got you.",
    icon: <Sparkles className="size-6" />,
  },
  {
    title: "Train anywhere",
    description: "No gym? No problem. Just consistency.",
    icon: <Flame className="size-6" />,
  },
  {
    title: "Track your progress",
    description: "Stay motivated and see real results.",
    icon: <BarChart2 className="size-6" />,
  },
];

export function ValueStrip() {
  return (
    <section className="relative bg-foreground text-background z-10 mt-[100px]">
        {/* Top Wave: pushed UP into the hero section */}
        <ShapeDivider className="top-0 -translate-y-[99%]" fill="fill-foreground" />
        
      <div className="mx-auto grid w-full max-w-[95%] px-4 lg:max-w-[90%] lg:px-8 grid-cols-1 gap-8 py-8 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-start gap-4 xl:border-r xl:border-background/20 xl:pr-8 last:xl:border-r-0"
          >
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary text-lg text-primary-foreground">
              {feature.icon}
            </div>

            <div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="mt-1 text-sm leading-5 text-background/60">
                {feature.description}
              </p>
              
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
