type ProgramIncludesProps = {
  items: string[];
};

export function ProgramIncludes({
  items,
}: ProgramIncludesProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        WHAT&apos;S INCLUDED
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {items?.map((item) => (
          <div
            key={item}
            className="inline-flex items-center gap-3 rounded-full border border-white/5 bg-background px-6 py-3 shadow-md transition-transform hover:-translate-y-1"
          >
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              ✓
            </span>

            <span className="text-sm font-bold tracking-wide">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}