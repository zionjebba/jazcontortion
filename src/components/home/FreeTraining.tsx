import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";



const youtubeUrl = "https://www.youtube.com/@jazcontortion/videos";

export function FreeTraining() {
  return (
    <section className="relative overflow-hidden bg-transparent py-16 lg:py-20">
      {/* Decorative shapes */}
      <div className="absolute -left-32 top-20 size-72 rounded-full bg-primary/10" />

      <div className="relative mx-auto w-full max-w-[95%] px-4 lg:max-w-[90%] lg:px-8">
        {/* HEADER */}
        <div className="max-w-3xl flex flex-col gap-2">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#FF0000]">
            Free YouTube Training
          </p>

          <h2 className="text-[3rem] sm:text-6xl lg:text-[5.5rem] font-black uppercase leading-[0.85] tracking-[-0.04em]">
            SUBSCRIBE ON
            <br />
            <span className="text-[#FF0000]">YOUTUBE.</span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg font-medium">
            No program. No subscription. No experience required. Just show up,
            train with me, and see what your body can do.
          </p>
          
          <div className="mt-8 lg:mt-10">
            <Link
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 lg:gap-3 rounded-full bg-[#FF0000] px-8 py-3.5 lg:px-12 lg:py-5 text-sm lg:text-lg font-black uppercase tracking-widest text-white shadow-2xl transition-all hover:-translate-y-1 hover:bg-[#CC0000] hover:shadow-[0_20px_40px_-15px_rgba(255,0,0,0.4)]"
            >
              <Play className="size-4 lg:size-6" />
              SUBSCRIBE TO THE CHANNEL 
            </Link>
          </div>
        </div>

      
        {/* VIDEO SHOWCASE */}
        <div className="relative mt-16 lg:mt-24 min-h-[300px] sm:min-h-[450px] lg:min-h-[650px] flex flex-col items-center justify-center">
          <h3 className="mb-8 lg:mb-12 text-2xl lg:text-4xl font-bold text-center tracking-[-0.03em] max-w-2xl px-4">
            Join thousands of others training with me every week.
          </h3>
          
          {/* Orange organic accent */}
          <div className="absolute left-[5%] lg:left-[12%] top-[25%] lg:top-[18%] h-[60%] lg:h-[70%] w-[90%] lg:w-[65%] rotate-[-8deg] rounded-[48%_52%_42%_58%] bg-[#FF0000]/10" />

          {/* MAIN VIDEO */}
          <Link
            href="https://www.youtube.com/watch?v=p4OcLehvnq0&t=43s"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative z-20 w-[95%] sm:w-[80%] lg:w-[70%]"
          >
            <div className="relative overflow-hidden rounded-xl lg:rounded-[2rem] border-[4px] lg:border-[6px] border-foreground bg-foreground shadow-2xl">
              <div className="relative aspect-video">
                <Image
                  src="/sub3.jpeg"
                  alt="Watch on YouTube"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-foreground/10 transition-colors group-hover:bg-foreground/0" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex size-16 lg:size-24 items-center justify-center rounded-full bg-[#FF0000] text-xl lg:text-3xl text-white shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    ▶
                  </div>
                </div>
              </div>
            </div>

          </Link>
        </div>
      </div>
    </section>
  );
}
