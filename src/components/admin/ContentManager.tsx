"use client";

import { useState } from "react";
import { Plus, Trash, Loader2 } from "lucide-react";
import { createModule, deleteModule, createLesson, deleteLesson } from "@/app/(admin)/admin/content-actions";
import MuxUploader from "@mux/mux-uploader-react";

type Lesson = {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  content: string | null;
  muxStatus: string | null;
};

type Module = {
  id: string;
  title: string;
  description: string | null;
  lessons: Lesson[];
};

export function ContentManager({ programId, initialModules }: { programId: string, initialModules: Module[] }) {
  const [modules] = useState<Module[]>(initialModules);
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  
  const [moduleTitle, setModuleTitle] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  

  const [muxEndpoint, setMuxEndpoint] = useState<string | null>(null);
  const [muxUploadId, setMuxUploadId] = useState<string | null>(null);
  const [isGettingEndpoint, setIsGettingEndpoint] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleCreateModule = async () => {
    if (!moduleTitle) return;
    await createModule(programId, { title: moduleTitle });
    setIsAddingModule(false);
    setModuleTitle("");
    window.location.reload(); 
  };

  const requestMuxUpload = async () => {
    setIsGettingEndpoint(true);
    try {
      const res = await fetch("/api/admin/mux-upload", { method: "POST" });
      const data = await res.json();
      setMuxEndpoint(data.url);
      setMuxUploadId(data.uploadId);
    } catch (error) {
      console.error("Failed to get Mux upload URL");
      alert("Failed to initialize video upload.");
    } finally {
      setIsGettingEndpoint(false);
    }
  };

  const handleCreateLesson = async (moduleId: string) => {
    if (!lessonTitle) return;
    
    // Enforce upload completion if started
    if (muxEndpoint && !uploadComplete) {
      alert("Please wait for the video upload to complete.");
      return;
    }

    await createLesson(moduleId, programId, {
      title: lessonTitle,
      content: lessonContent,
      muxUploadId: muxUploadId || undefined,
    });
    
    setActiveModuleId(null);
    setLessonTitle("");
    setLessonContent("");
    setMuxEndpoint(null);
    setMuxUploadId(null);
    setUploadComplete(false);
    
    window.location.reload();
  };

  const handleDeleteModule = async (id: string) => {
    if (confirm("Are you sure? This will delete all lessons inside it.")) {
      await deleteModule(id);
      window.location.reload();
    }
  };

  const handleDeleteLesson = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteLesson(id, programId);
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 pb-24">
      {modules.map((mod) => (
        <div key={mod.id} className="rounded-xl border border-white/10 bg-secondary/30 overflow-hidden">
          <div className="flex items-center justify-between bg-white/5 p-4">
            <h3 className="font-bold text-lg">{mod.title}</h3>
            <button onClick={() => handleDeleteModule(mod.id)} className="text-red-400 hover:text-red-300">
              <Trash className="size-4" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            {mod.lessons.map((lesson) => (
              <div key={lesson.id} className="flex items-center justify-between rounded-lg border border-white/5 bg-background p-3">
                <div>
                  <h4 className="font-semibold text-sm">{lesson.title}</h4>
                  <div className="text-xs text-foreground/50 mt-1 flex items-center gap-2">
                    {lesson.muxStatus === "ready" && <span className="text-green-400 font-semibold">Video Ready</span>}
                    {lesson.muxStatus === "uploading" && <span className="text-yellow-400 font-semibold animate-pulse">Processing...</span>}
                    {lesson.muxStatus === "error" && <span className="text-red-400 font-semibold">Processing Failed</span>}
                    {!lesson.muxStatus && <span>Text Lesson</span>}
                  </div>
                </div>
                <button onClick={() => handleDeleteLesson(lesson.id)} className="text-red-400 hover:text-red-300">
                  <Trash className="size-4" />
                </button>
              </div>
            ))}

            {activeModuleId === mod.id ? (
              <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-4 space-y-4">
                <input 
                  placeholder="Lesson Title" 
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-sm" 
                />
                
                {/* Mux Video Upload Section */}
                <div className="rounded-md border border-white/10 bg-background p-4 space-y-4">
                  <label className="text-sm font-semibold">Lesson Video (Optional)</label>
                  
                  {!muxEndpoint ? (
                    <button 
                      type="button"
                      onClick={requestMuxUpload}
                      disabled={isGettingEndpoint}
                      className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-white/20 py-8 text-sm text-foreground/60 hover:bg-white/5 hover:text-foreground transition-colors disabled:opacity-50"
                    >
                      {isGettingEndpoint ? <Loader2 className="size-4 animate-spin" /> : <Plus className="size-4" />}
                      Add Video via Mux
                    </button>
                  ) : (
                    <div className="overflow-hidden rounded-md border border-white/10">
                      <MuxUploader 
                        endpoint={muxEndpoint} 
                        onSuccess={() => setUploadComplete(true)}
                        className="w-full"
                      />
                    </div>
                  )}
                  {uploadComplete && <p className="text-xs text-green-400 font-semibold">Upload complete! Processing will begin once you save the lesson.</p>}
                </div>

                <textarea 
                  placeholder="Markdown Content" 
                  value={lessonContent}
                  onChange={(e) => setLessonContent(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-white/10 bg-background px-3 py-2 text-sm font-mono" 
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => {
                    setActiveModuleId(null);
                    setMuxEndpoint(null);
                    setMuxUploadId(null);
                    setUploadComplete(false);
                  }} className="px-3 py-1 text-sm text-foreground/60 hover:text-foreground">Cancel</button>
                  <button onClick={() => handleCreateLesson(mod.id)} className="rounded bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">Save Lesson</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setActiveModuleId(mod.id)}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-white/10 py-3 text-sm text-foreground/50 hover:bg-white/5 hover:text-foreground transition-colors"
              >
                <Plus className="size-4" />
                Add Lesson
              </button>
            )}
          </div>
        </div>
      ))}

      {isAddingModule ? (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 space-y-4">
          <input 
            placeholder="Module Title" 
            value={moduleTitle}
            onChange={(e) => setModuleTitle(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-background px-3 py-2" 
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setIsAddingModule(false)} className="px-3 py-2 text-sm text-foreground/60 hover:text-foreground">Cancel</button>
            <button onClick={handleCreateModule} className="rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Save Module</button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsAddingModule(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 py-6 text-foreground/50 hover:bg-white/5 hover:text-foreground transition-colors"
        >
          <Plus className="size-5" />
          Add New Module
        </button>
      )}
    </div>
  );
}
