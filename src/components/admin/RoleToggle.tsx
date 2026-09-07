"use client";

import { useState, useTransition } from "react";
import { toggleUserRole } from "@/app/(admin)/admin/actions";
import { Loader2 } from "lucide-react";

export function RoleToggle({ userId, currentRole }: { userId: string, currentRole: "ADMIN" | "USER" }) {
  const [isPending, startTransition] = useTransition();
  const [role, setRole] = useState(currentRole);

  const handleToggle = () => {
    const newRole = role === "ADMIN" ? "USER" : "ADMIN";
    
    startTransition(async () => {
      setRole(newRole);
      const res = await toggleUserRole(userId, newRole);
      if (!res.success) {
        // Revert on error
        setRole(currentRole);
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`relative inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
        role === "ADMIN" 
          ? "bg-primary/20 text-primary hover:bg-primary/30" 
          : "bg-white/10 text-foreground/70 hover:bg-white/20"
      }`}
    >
      {isPending ? (
        <Loader2 className="size-3 animate-spin" />
      ) : (
        <div className={`size-1.5 rounded-full ${role === "ADMIN" ? "bg-primary" : "bg-foreground/40"}`} />
      )}
      {role}
    </button>
  );
}
