"use client";

import Image from "next/image";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

const playlists = [
  {
    title: "Stretching Routines",
    description: "Follow along flexibility routines.",
    embedId: "PLhn1k62VlxDKVtiZ1gjVP9Cof8V5VCmjJ",
    url: "https://www.youtube.com/watch?v=7KaDBLMvfRI&list=PLhn1k62VlxDKVtiZ1gjVP9Cof8V5VCmjJ",
  },
  {
    title: "Warmups",
    description: "Prepare your body for training.",
    embedId: "PLhn1k62VlxDJWk3PAdlI-XWOXmfyhxvCB",
    url: "https://www.youtube.com/watch?v=XxyVTSRyde8&list=PLhn1k62VlxDJWk3PAdlI-XWOXmfyhxvCB",
  },
  {
    title: "Calisthenics",
    description: "Build strength and body control.",
    embedId: "PLhn1k62VlxDLa1vZuMIYyMwOt0c2bp0si",
    url: "https://www.youtube.com/watch?v=KQGigJG_a8M&list=PLhn1k62VlxDLa1vZuMIYyMwOt0c2bp0si",
  },
];

export function PlaylistShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let intervalId: NodeJS.Timeout;
    
    const startScroll = () => {
      intervalId = setInterval(() => {
        if (scrollContainer) {
          const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
          if (scrollContainer.scrollLeft >= maxScrollLeft - 10) {
            scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollContainer.scrollBy({ left: 350, behavior: 'smooth' });
          }
        }
      }, 4000);
    };

    startScroll();

    const handleMouseEnter = () => clearInterval(intervalId);
    const handleMouseLeave = () => startScroll();

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(intervalId);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden pb-20 pt-10 lg:pb-32 lg:pt-16">
      {/* Decorative accent */}
      <div className="pointer-events-none absolute -right-32 top-20 size-96 rounded-full bg-primary/5 blur-[100px]" />

      {/* HORIZONTAL SCROLL SHOWCASE */}
      <div className="relative w-full">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 pb-12 pt-4 no-scrollbar lg:gap-8 lg:px-12 scroll-smooth"
        >
          {playlists.map((playlist, idx) => (
            <div
              key={idx}
              className="group relative flex w-[85vw] sm:w-[350px] lg:w-[450px] shrink-0 snap-center flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-background/50 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_20px_40px_-15px_rgba(255,100,0,0.15)]"
            >
              {/* iframe Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/videoseries?list=${playlist.embedId}`}
                  title={playlist.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0"
                />
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-2 p-6 lg:p-8">
                <h3 className="text-xl font-bold tracking-tight lg:text-2xl">
                  {playlist.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {playlist.description}
                </p>
                
                <a 
                  href={playlist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FF0000] transition-transform duration-300 hover:translate-x-2 w-fit"
                >
                  Open on YouTube <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          ))}
          
          {/* Spacer to allow scrolling past the last item neatly */}
          <div className="w-[1vw] shrink-0 lg:w-[4vw]" />
        </div>
      </div>
      
    </section>
  );
}
