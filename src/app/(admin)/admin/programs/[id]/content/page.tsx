import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ContentManager } from "@/components/admin/ContentManager";

export default async function ProgramContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const program = await prisma.program.findUnique({
    where: { id },
    include: {
      modules: {
        orderBy: { position: "asc" },
        include: {
          lessons: {
            orderBy: { position: "asc" },
          }
        }
      }
    }
  });

  if (!program) notFound();

  return (
    <main className="p-6 lg:p-12">
      <div className="mx-auto max-w-4xl">
        <Link 
          href="/admin/programs" 
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground/50 hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Programs
        </Link>
        <header className="mb-12">
          <h1 className="text-3xl font-black uppercase tracking-[-0.04em]">Manage Content</h1>
          <p className="mt-2 text-foreground/50">Edit modules and lessons for <strong>{program.title}</strong>.</p>
        </header>

        <ContentManager programId={program.id} initialModules={program.modules} />
      </div>
    </main>
  );
}
