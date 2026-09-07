import Link from "next/link";
import { MapPin } from "lucide-react";

export type Recommendation = {
  title: string;
  description: string;
  href: string;
  label: string;
};

type RecommendationCardProps = {
  recommendations: Recommendation[];
  onRestart: () => void;
};

export function RecommendationCard({
  recommendations,
  onRestart
}: RecommendationCardProps) {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className={`grid gap-8 ${recommendations.length > 1 ? "md:grid-cols-2" : "grid-cols-1 max-w-3xl mx-auto"}`}>
        {recommendations.map((recommendation, idx) => (
          <div key={idx} className="group relative overflow-hidden rounded-[3rem] border border-primary/20 bg-card p-1">
            {/* Animated glowing background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background opacity-50" />
            <div className="absolute -right-32 -top-32 size-64 rounded-full bg-primary/20 blur-[80px] transition-transform duration-700 group-hover:scale-150" />
            
            <div className="relative flex h-full flex-col items-center rounded-[2.5rem] border border-foreground/5 bg-background/50 px-8 py-12 backdrop-blur-sm sm:px-12 sm:py-16 text-center">
              {/* Destination Icon */}
              <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary shadow-[0_0_40px_-10px_rgba(255,100,0,0.4)]">
                <MapPin className="size-8" />
              </div>

              <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
                YOUR DESTINATION
              </p>

              <h2 className="mt-4 text-4xl font-black leading-[1] tracking-[-0.04em] sm:text-5xl">
                {recommendation.title}
              </h2>

              <p className="mx-auto mt-4 max-w-xl flex-1 text-base leading-7 text-muted-foreground">
                {recommendation.description}
              </p>

              <Link
                href={recommendation.href}
                className="mt-8 flex w-full items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-xl transition-all hover:-translate-y-1 hover:shadow-primary/25"
              >
                {recommendation.label}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-6">
        {/* Start Again is now here (was below card) */}
        <button 
          onClick={onRestart}
          className="text-xs font-semibold uppercase tracking-widest text-foreground/50 transition-colors hover:text-foreground"
        >
          ⟲ START AGAIN
        </button>
      </div>
    </div>
  );
}