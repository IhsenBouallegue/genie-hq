// ProfileCard.tsx
"use client";

import type { Profile } from "@/lib/store/types";
import { useStore } from "@/lib/store/useStore";
import { cn } from "@/lib/utils";
import { User2 } from "lucide-react";
import { Circle } from "./circle";

export default function ProfileCard({ id, title }: Profile) {
  const selectProfile = useStore((state) => state.selectProfile);
  const currentProfileId = useStore((state) => state.selectedProfile);
  const currentProfile = useStore(
    (state) => state.profiles[currentProfileId || ""],
  );

  const handleClick = () => {
    selectProfile(id);
  };

  return (
    <div
      className={cn(
        "h-32 w-28 flex flex-col items-center gap-2 rounded-lg p-3 cursor-pointer hover:bg-gray-100/10",
        currentProfile?.title === title ? "bg-primary/20" : "bg-transparent",
      )}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <div className="h-1/2">
        <Circle className=" rounded-full">
          <User2 className="text-black size-18" />
        </Circle>
      </div>

      <p className="text-sm text-center">{title}</p>
    </div>
  );
}
