import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Settings, Video } from "lucide-react";
import Image from "next/image";

export default async function AdminProgramsPage() {
  const programs = await prisma.program.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { modules: true, purchases: true }
      }
    }
  });

  return (
    <main className="min-h-screen p-6 lg:p-12">
      <header className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-[-0.04em]">Programs</h1>
          <p className="mt-4 text-foreground/60 max-w-xl text-sm leading-relaxed">Manage your course catalog.</p>
        </div>

        <Link 
          href="/admin/programs/new" 
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-1"
        >
          <Plus className="size-4" />
          Create Program
        </Link>
      </header>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {programs.map((program) => (
          <div key={program.id} className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-secondary/30 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(255,100,0,0.15)]">
            <div className="relative aspect-video w-full bg-black overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
              {program.image ? (
                <Image src={program.image} alt={program.title} fill className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="flex h-full items-center justify-center text-foreground/20">No Image</div>
              )}
              <div className="absolute right-4 top-4 z-20 rounded-full bg-black/60 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md shadow-xl">
                {program.isPublished ? (
                  <span className="text-green-400">Published</span>
                ) : (
                  <span className="text-yellow-400">Draft</span>
                )}
              </div>
            </div>

            <div className="relative z-20 flex flex-1 flex-col p-8 pt-0">
              <h3 className="text-2xl font-black uppercase tracking-tight">{program.title}</h3>
              <p className="mt-3 text-sm text-foreground/60 line-clamp-2 leading-relaxed">{program.tagline}</p>

              <div className="mt-8 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-foreground/40">
                <span>{program._count.modules} Modules</span>
                <span>{program._count.purchases} Sales</span>
                <span className="text-primary">₵{program.price}</span>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
                <Link 
                  href={`/admin/programs/${program.id}/edit`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/5 py-3 text-[10px] font-black uppercase tracking-widest transition-colors hover:bg-primary/20 hover:text-primary"
                >
                  <Settings className="size-4" />
                  Settings
                </Link>
                <Link 
                  href={`/admin/programs/${program.id}/content`}
                  className="flex items-center justify-center gap-2 rounded-xl bg-white/5 py-3 text-[10px] font-black uppercase tracking-widest transition-colors hover:bg-primary/20 hover:text-primary"
                >
                  <Video className="size-4" />
                  Content
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {programs.length === 0 && (
          <div className="col-span-full py-24 text-center text-foreground/50 border border-dashed border-foreground/20 rounded-2xl">
            No programs found. Create your first one!
          </div>
        )}
      </div>
    </main>
  );
}
