import Image from "next/image";

export type SubGoal = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
};

type SubGoalSelectorProps = {
  subGoals: SubGoal[];
  selectedSubGoal: string | null;
  onSelect: (id: string) => void;
  locked?: boolean;
};

export function SubGoalSelector({
  subGoals,
  selectedSubGoal,
  locked,
  onSelect,
}: SubGoalSelectorProps) {
  const hasSelection = selectedSubGoal !== null;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {subGoals.map((subGoal) => {
        const isSelected = selectedSubGoal === subGoal.id;
        const isFaded = hasSelection && !isSelected;

        return (
          <button
            key={subGoal.id}
            type="button"
            disabled={locked}
            onClick={() => onSelect(subGoal.id)}
            className={`group relative flex aspect-square w-full flex-col justify-end overflow-hidden rounded-[2rem] text-left transition-all duration-700 ease-out ${
              isSelected
                ? "ring-4 ring-primary ring-offset-4 ring-offset-background scale-[1.02] z-10 shadow-2xl"
                : !locked ? "hover:-translate-y-2 hover:shadow-xl" : ""
            } ${isFaded ? "opacity-30 grayscale-[80%] scale-95" : "opacity-100"}`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 bg-muted/20" />
            <Image
              src={subGoal.imageSrc}
              alt={subGoal.title}
              fill
              className={`object-contain transition-transform duration-1000 ${
                isSelected ? "scale-105" : !locked ? "group-hover:scale-110" : ""
              }`}
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-80" />
            
            {isSelected && (
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
            )}

            {/* Content */}
            <div className="relative z-10 p-6">
              <h3 className="text-xl font-bold tracking-[-0.02em] text-foreground transition-colors duration-300 group-hover:text-primary">
                {subGoal.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-foreground/80">
                {subGoal.description}
              </p>
            </div>

            {/* Selection Arrow/Indicator */}
            <div
              className={`absolute right-6 top-6 flex size-10 items-center justify-center rounded-full bg-background/20 backdrop-blur-md transition-all duration-500 ${
                isSelected
                  ? "bg-primary text-primary-foreground scale-100 opacity-100"
                  : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
              }`}
            >
              <span className="text-lg">
                {isSelected ? "✓" : "→"}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
