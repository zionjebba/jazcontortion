import { SignalLow, SignalMedium, SignalHigh } from "lucide-react";

type ExperienceLevel = {
  id: string;
  title: string;
  description: string;
};

type ExperienceSelectorProps = {
  levels: ExperienceLevel[];
  selectedExperience: string | null;
  onSelect: (experienceId: string) => void;
};

function getIconForIndex(index: number, isSelected: boolean) {
  const props = {
    className: `size-12 transition-transform duration-500 ${isSelected ? "text-primary scale-110" : "text-primary/40 group-hover:scale-110"}`,
  };
  
  if (index === 0) return <SignalLow {...props} />;
  if (index === 1) return <SignalMedium {...props} />;
  return <SignalHigh {...props} />;
}

export function ExperienceSelector({
  levels,
  selectedExperience,
  onSelect,
}: ExperienceSelectorProps) {
  const hasSelection = selectedExperience !== null;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {levels.map((level, index) => {
        const isSelected = selectedExperience === level.id;
        const isFaded = hasSelection && !isSelected;

        return (
          <button
            key={level.id}
            type="button"
            onClick={() => onSelect(level.id)}
            className={`group relative flex min-h-64 flex-col items-center justify-between rounded-[2rem] border p-6 text-center transition-all duration-500 ${
              isSelected
                ? "border-primary bg-primary/10 shadow-[0_0_40px_-10px_rgba(255,100,0,0.3)] scale-105 z-10"
                : "border-foreground/10 bg-card hover:-translate-y-2 hover:border-primary/50 hover:shadow-xl"
            } ${isFaded ? "opacity-40 grayscale-[50%] scale-95" : "opacity-100"}`}
          >
            {/* Visual Indicator */}
            <div className="flex size-24 items-center justify-center text-primary mb-2">
              {getIconForIndex(index, isSelected)}
            </div>

            <div className="flex flex-col items-center flex-1">
              <h3 className="text-xl font-bold tracking-[-0.02em]">{level.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{level.description}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}