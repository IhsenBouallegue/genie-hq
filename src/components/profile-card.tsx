"use client";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";
import { useState } from "react";
import { Circle } from "./circle";

export interface Profile {
  title: string;
}

export default function ProfileCard({ title }: Profile) {
  const [selected, setSelected] = useState(false);
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className={cn(
        "h-32 flex flex-col items-center gap-2 rounded-lg p-3  cursor-pointer hover:bg-gray-100/10",
        selected ? "bg-primary/20" : "bg-transparent",
      )}
      onClick={() => setSelected((selected) => !selected)}
    >
      <Circle className="size-20 rounded-full">
        <User2 className="text-black size-18" />
      </Circle>

      <p className="text-sm">{title}</p>
    </div>
  );
}
