import { ProgramForm } from "@/components/admin/ProgramForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditProgramPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const program = await prisma.program.findUnique({
    where: { id },
  });

  if (!program) {
    notFound();
  }

  return (
    <main className="p-6 lg:p-12">
      <div className="mx-auto max-w-3xl">
        <Link 
          href="/admin/programs" 
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground/50 hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Programs
        </Link>
        <header className="mb-12">
          <h1 className="text-3xl font-black uppercase tracking-[-0.04em]">Edit Program</h1>
          <p className="mt-2 text-foreground/50">Modify details for {program.title}.</p>
        </header>
        
        <ProgramForm program={program} />
      </div>
    </main>
  );
}
