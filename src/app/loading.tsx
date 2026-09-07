export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="relative size-14">
          <div className="absolute inset-0 rounded-full border-4 border-foreground/5"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary border-r-primary/50"></div>
        </div>
        
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/60 animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}
