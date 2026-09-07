import React from "react";

// Helper for consistent styling - massive stroke for a silhouette look
const strokeStyle = "stroke-current stroke-[14] fill-none";
const headStyle = "fill-current stroke-none";
const headRadius = 14;

export const FlexibilityIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`}>
    <g className="origin-[40px_70px] transition-transform duration-500 ease-in-out group-hover:rotate-[45deg] group-hover:translate-x-[5px]">
      {/* Head */}
      <circle cx="40" cy="20" r={headRadius} className={headStyle} />
      {/* Torso */}
      <line x1="40" y1="35" x2="40" y2="70" className={strokeStyle} strokeLinecap="round" />
      {/* Arms */}
      <path d="M40 40 L60 55 L75 55" className={strokeStyle} strokeLinecap="round" strokeLinejoin="round" />
    </g>
    {/* Legs (Static on the floor) */}
    <path d="M40 70 L75 70 L95 70" className={strokeStyle} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StrengthIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`}>
    <g className="transition-transform duration-500 ease-in-out group-hover:translate-y-[15px]">
      {/* Head */}
      <circle cx="16" cy="40" r={headRadius} className={headStyle} />
      {/* Torso and Legs (Plank) */}
      <line x1="30" y1="45" x2="85" y2="75" className={strokeStyle} strokeLinecap="round" />
    </g>
    {/* Arms (Bend on hover) */}
    <g className="transition-all duration-500 ease-in-out">
      <path
        d="M30 45 L30 75"
        className={`group-hover:opacity-0 transition-opacity duration-300 ${strokeStyle}`}
        strokeLinecap="round"
      />
      <path
        d="M30 60 L15 65 L30 75"
        className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${strokeStyle}`}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    {/* Feet support */}
    <circle cx="85" cy="75" r="6" className="fill-current" />
  </svg>
);

export const ContortionIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`}>
    {/* Backbend/Bridge */}
    <g className="origin-[50px_75px] transition-transform duration-700 ease-in-out group-hover:-translate-y-6">
      {/* Head */}
      <circle cx="20" cy="50" r={headRadius} className={`${headStyle} transition-transform duration-700 group-hover:translate-y-4 group-hover:-rotate-45`} />
      
      {/* Torso (Arches on hover) */}
      <path
        d="M30 50 Q50 50 70 50"
        className={`group-hover:opacity-0 transition-opacity duration-300 ${strokeStyle}`}
        strokeLinecap="round"
      />
      <path
        d="M25 60 Q50 20 75 60"
        className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${strokeStyle}`}
        strokeLinecap="round"
      />
    </g>
    
    {/* Arms */}
    <path d="M30 50 L20 75" className={`group-hover:opacity-0 transition-opacity duration-300 ${strokeStyle}`} strokeLinecap="round" />
    <path d="M25 60 L20 80" className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${strokeStyle}`} strokeLinecap="round" />
    
    {/* Legs */}
    <path d="M70 50 L85 75" className={`group-hover:opacity-0 transition-opacity duration-300 ${strokeStyle}`} strokeLinecap="round" />
    <path d="M75 60 L85 80" className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${strokeStyle}`} strokeLinecap="round" />
  </svg>
);

export const SkillsIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`}>
    <g className="origin-center transition-transform duration-700 ease-in-out group-hover:rotate-[180deg]">
      {/* Head */}
      <circle cx="50" cy="20" r={headRadius} className={headStyle} />
      {/* Torso */}
      <line x1="50" y1="34" x2="50" y2="60" className={strokeStyle} strokeLinecap="round" />
      {/* Arms (Up) */}
      <path d="M20 15 L50 35 L80 15" className={strokeStyle} strokeLinecap="round" strokeLinejoin="round" />
      {/* Legs (Split) */}
      <path d="M20 90 L50 60 L80 90" className={strokeStyle} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

export const ControlIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`}>
    {/* Standing Leg */}
    <line x1="50" y1="50" x2="50" y2="90" className={strokeStyle} strokeLinecap="round" />
    
    <g className="origin-[50px_50px] transition-transform duration-700 ease-in-out group-hover:rotate-[45deg]">
      {/* Head */}
      <circle cx="50" cy="15" r={headRadius} className={headStyle} />
      {/* Torso */}
      <line x1="50" y1="29" x2="50" y2="50" className={strokeStyle} strokeLinecap="round" />
      {/* Arms */}
      <path d="M25 40 L50 30 L75 40" className={strokeStyle} strokeLinecap="round" strokeLinejoin="round" />
    </g>
    
    {/* Moving Leg (Arabesque) */}
    <line 
      x1="50" y1="50" 
      x2="30" y2="90" 
      className={`origin-[50px_50px] transition-transform duration-700 ease-in-out group-hover:rotate-[-90deg] ${strokeStyle}`} 
      strokeLinecap="round" 
    />
  </svg>
);
