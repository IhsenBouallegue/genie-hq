"use client";
import { cn } from "@/lib/utils";
import React from "react";

export interface Application {
  title: string;
  icon: React.ReactElement;
}

export default function ApplicationCard({
  title,
  icon,
  currentApplications,
  toggleApplication,
}: Application & {
  toggleApplication: (application: Application) => void;
  currentApplications: Application[];
}) {
  const isSelected = currentApplications.some((app) => app.title === title);

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className={cn(
        "h-32 flex flex-col items-center gap-2 rounded-lg p-3 cursor-pointer hover:bg-gray-100/10",
        isSelected ? "bg-primary/20" : "bg-transparent",
      )}
      onClick={() => toggleApplication({ title, icon })}
    >
      <div className="size-16 rounded-full">
        {React.cloneElement(icon, { className: "text-white size-16" })}
      </div>
      <p className="text-sm">{title}</p>
    </div>
  );
}
