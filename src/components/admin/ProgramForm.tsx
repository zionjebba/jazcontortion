"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Program } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import { createProgram, updateProgram } from "@/app/(admin)/admin/actions";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export function ProgramForm({ program }: { program?: Program }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(program?.image || "");
  const [includes, setIncludes] = useState(program?.includes.join("\n") || "");
  const [goals, setGoals] = useState(program?.goals.join("\n") || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      slug: formData.get("slug") as string,
      tagline: formData.get("tagline") as string,
      description: formData.get("description") as string,
      price: parseInt(formData.get("price") as string),
      level: formData.get("level") as string,
      type: formData.get("type") as string,
      image,
      includes: includes.split("\n").filter(Boolean),
      goals: goals.split("\n").filter(Boolean),
      isPublished: formData.get("isPublished") === "on",
    };

    try {
      if (program) {
        await updateProgram(program.id, data);
      } else {
        await createProgram(data);
      }
      router.push("/admin/programs");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to save program.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-8 pb-24">
      <div className="rounded-xl border border-white/10 bg-secondary/30 p-8">
        <h2 className="text-xl font-bold">Basic Information</h2>
        
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input 
              name="title" 
              defaultValue={program?.title} 
              required 
              className="w-full rounded-md border border-white/10 bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug (URL)</label>
            <input 
              name="slug" 
              defaultValue={program?.slug} 
              required 
              className="w-full rounded-md border border-white/10 bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none" 
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">Tagline</label>
            <input 
              name="tagline" 
              defaultValue={program?.tagline} 
              required 
              className="w-full rounded-md border border-white/10 bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none" 
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <textarea 
              name="description" 
              defaultValue={program?.description} 
              required 
              rows={4}
              className="w-full rounded-md border border-white/10 bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none" 
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-secondary/30 p-8">
        <h2 className="text-xl font-bold">Details</h2>
        
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Price (GHS)</label>
            <input 
              name="price" 
              type="number"
              defaultValue={program?.price} 
              required 
              className="w-full rounded-md border border-white/10 bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Level</label>
            <select 
              name="level" 
              defaultValue={program?.level || "Beginner"} 
              className="w-full rounded-md border border-white/10 bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="All Levels">All Levels</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>
            <select 
              name="type" 
              defaultValue={program?.type || "Full Program"} 
              className="w-full rounded-md border border-white/10 bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none"
            >
              <option value="Full Program">Full Program</option>
              <option value="Video Course">Video Course</option>
            </select>
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Includes (One per line)</label>
            <textarea 
              value={includes}
              onChange={(e) => setIncludes(e.target.value)}
              rows={5}
              className="w-full rounded-md border border-white/10 bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Goals (One per line)</label>
            <textarea 
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              rows={5}
              className="w-full rounded-md border border-white/10 bg-background px-4 py-2 text-sm focus:border-primary focus:outline-none" 
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-secondary/30 p-8">
        <h2 className="text-xl font-bold">Media & Status</h2>
        
        <div className="mt-6 space-y-4">
          <label className="text-sm font-medium">Thumbnail Image</label>
          <div className="flex items-center gap-6">
            {image && (
              <div className="relative h-24 w-40 overflow-hidden rounded-md border border-white/10">
                <Image src={image} alt="Thumbnail" fill className="object-cover" />
              </div>
            )}
            <CldUploadWidget 
              signatureEndpoint="/api/admin/cloudinary-sign"
              onSuccess={(result: any) => {
                setImage(result.info.secure_url);
              }}
            >
              {({ open }) => (
                <button 
                  type="button" 
                  onClick={() => open()}
                  className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold hover:bg-secondary/80"
                >
                  Upload Image
                </button>
              )}
            </CldUploadWidget>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3 border-t border-white/5 pt-6">
          <input 
            type="checkbox" 
            name="isPublished" 
            id="isPublished"
            defaultChecked={program?.isPublished} 
            className="size-5 rounded border-white/10 bg-background text-primary focus:ring-primary"
          />
          <label htmlFor="isPublished" className="text-sm font-medium">
            Published (Visible to public)
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button 
          type="submit" 
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-y-1 disabled:opacity-50"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {program ? "Save Changes" : "Create Program"}
        </button>
      </div>
    </form>
  );
}
