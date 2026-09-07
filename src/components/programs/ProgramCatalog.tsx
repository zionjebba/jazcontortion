"use client";

import { useState, useMemo, useEffect } from "react";
import { Program } from "@prisma/client";
import { ProgramGrid } from "./ProgramGrid";
import { Search, Filter } from "lucide-react";
import { useSearchParams } from "next/navigation";

type ProgramCatalogProps = {
  programs: Program[];
};

const ALL_GOALS = [
  { id: "flexibility", label: "Flexibility" },
  { id: "strength", label: "Strength" },
  { id: "contortion", label: "Contortion" },
  { id: "skills", label: "Skills & Acrobatics" },
  { id: "control", label: "Body Control" },
];

const ALL_TYPES = ["Full Program", "Video Course"];
const ALL_LEVELS = ["Beginner", "Intermediate", "Advanced", "All Levels"];

export function ProgramCatalog({ programs }: ProgramCatalogProps) {
  const searchParams = useSearchParams();
  const initialGoal = searchParams.get("goal");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    initialGoal && ALL_GOALS.some(g => g.id === initialGoal) ? [initialGoal] : []
  );
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const toggleFilter = (
    current: string[],
    setCurrent: (val: string[]) => void,
    item: string
  ) => {
    if (current.includes(item)) {
      setCurrent(current.filter((i) => i !== item));
    } else {
      setCurrent([...current, item]);
    }
  };

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      // Search
      if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.tagline.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Types
      if (selectedTypes.length > 0 && !selectedTypes.includes(p.type)) {
        return false;
      }
      
      // Goals
      if (selectedGoals.length > 0 && !p.goals.some((g) => selectedGoals.includes(g))) {
        return false;
      }
      
      // Levels
      // Simply checking if the program's level string includes any of the selected levels
      if (selectedLevels.length > 0 && !selectedLevels.some((l) => p.level.includes(l))) {
        return false;
      }
      
      return true;
    });
  }, [programs, searchQuery, selectedTypes, selectedGoals, selectedLevels]);

  return (
    <div className="relative z-10 mx-auto w-full lg:max-w-[90%] px-6 pb-32 lg:px-12">
      
      {/* Top Bar: Search & Simple Filters */}
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center justify-start md:gap-12">
        
        {/* Search & Mobile Toggle */}
        <div className="flex w-full items-center gap-4 md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-white/5 bg-background/50 py-3 pl-10 pr-4 text-sm outline-none backdrop-blur-md transition-all focus:border-primary/50 focus:ring-1 focus:ring-primary/50"
            />
          </div>
          
          <button 
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/5 bg-background/50 px-5 py-3 text-sm font-bold uppercase tracking-widest lg:hidden"
          >
            <Filter className="size-4" />
          </button>
        </div>

        {/* Type Filter Pills (Moved from Sidebar) */}
        <div className="-mx-6 flex overflow-x-auto px-6 pb-2 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0 items-center gap-3 no-scrollbar">
          <button
            onClick={() => setSelectedTypes([])}
            className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${
              selectedTypes.length === 0
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-background/50 border border-white/5 text-muted-foreground hover:text-foreground hover:border-white/20"
            }`}
          >
            All Programs
          </button>
          
          {ALL_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => {
                if (selectedTypes.includes(type)) {
                  setSelectedTypes(selectedTypes.filter((t) => t !== type));
                } else {
                  setSelectedTypes([type]); // single select
                }
              }}
              className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all ${
                selectedTypes.includes(type)
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-background/50 border border-white/5 text-muted-foreground hover:text-foreground hover:border-white/20"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
        
        {/* Sidebar Filters */}
        <div className={`w-full shrink-0 lg:sticky lg:top-32 lg:block lg:w-64 ${isMobileFiltersOpen ? "block" : "hidden"}`}>
          <div className="flex flex-col gap-10">

            {/* Filter: Goals */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Goals</h4>
              <div className="flex flex-col gap-3">
                {ALL_GOALS.map((goal) => (
                  <label key={goal.id} className="flex cursor-pointer items-center gap-3 group">
                    <div className={`flex size-5 items-center justify-center rounded border transition-colors ${selectedGoals.includes(goal.id) ? "border-primary bg-primary" : "border-foreground/20 group-hover:border-primary/50"}`}>
                      <input type="checkbox" className="hidden" checked={selectedGoals.includes(goal.id)} onChange={() => toggleFilter(selectedGoals, setSelectedGoals, goal.id)} />
                      {selectedGoals.includes(goal.id) && <div className="size-2.5 rounded-sm bg-primary-foreground" />}
                    </div>
                    <span className={`text-sm ${selectedGoals.includes(goal.id) ? "font-semibold text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                      {goal.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter: Level */}
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-primary">Experience Level</h4>
              <div className="flex flex-col gap-3">
                {ALL_LEVELS.map((level) => (
                  <label key={level} className="flex cursor-pointer items-center gap-3 group">
                    <div className={`flex size-5 items-center justify-center rounded border transition-colors ${selectedLevels.includes(level) ? "border-primary bg-primary" : "border-foreground/20 group-hover:border-primary/50"}`}>
                      <input type="checkbox" className="hidden" checked={selectedLevels.includes(level)} onChange={() => toggleFilter(selectedLevels, setSelectedLevels, level)} />
                      {selectedLevels.includes(level) && <div className="size-2.5 rounded-sm bg-primary-foreground" />}
                    </div>
                    <span className={`text-sm ${selectedLevels.includes(level) ? "font-semibold text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Main Grid Area */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">
              {filteredPrograms.length} Results
            </h2>
            
            {(selectedTypes.length > 0 || selectedGoals.length > 0 || selectedLevels.length > 0 || searchQuery) && (
              <button 
                onClick={() => {
                  setSelectedTypes([]);
                  setSelectedGoals([]);
                  setSelectedLevels([]);
                  setSearchQuery("");
                }}
                className="text-xs font-bold uppercase tracking-widest text-primary hover:underline"
              >
                Clear All
              </button>
            )}
          </div>
          
          <ProgramGrid programs={filteredPrograms} />
        </div>
      </div>
    </div>
  );
}
