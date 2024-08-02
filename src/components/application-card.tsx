"use client";
import type { Application } from "@/lib/store/types";
import { useStore } from "@/lib/store/useStore";
import { cn } from "@/lib/utils";
import React from "react";

export default function ApplicationCard({ id, title, icon }: Application) {
  const toggleApplication = useStore((state) => state.toggleApplication);
  const isSelected = useStore((state) =>
    state.selectedApplicationIds.includes(id),
  );
  return (
    <div
      className={cn(
        "h-32 w-28 flex flex-col items-center gap-2 rounded-lg p-3 cursor-pointer border",
        isSelected ? "bg-primary/20" : "bg-transparent",
        isSelected ? " hover:bg-primary/30" : " hover:bg-gray-100/10",
      )}
      onClick={() => toggleApplication(id)}
      onKeyDown={() => toggleApplication(id)}
    >
      <div className="h-1/2">
        <div className="size-16 rounded-full flex flex-1">
          {React.createElement(icon, { className: "text-white m-auto size-8" })}
        </div>
      </div>
      <p className="text-sm text-wrap text-center">{title}</p>
    </div>
  );
}
