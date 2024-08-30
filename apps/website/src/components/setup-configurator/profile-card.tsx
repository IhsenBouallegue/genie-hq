"use client";

import type { Profile } from "@/lib/store/types";
import { useStore } from "@/lib/store/useStore";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function ProfileCard({ id, title, image }: Profile) {
  const selectProfile = useStore((state) => state.selectProfile);
  const currentProfileId = useStore((state) => state.selectedProfile);
  const isSelected = currentProfileId === id;

  const handleClick = () => {
    selectProfile(id);
  };

  return (
    <div
      className={cn(
        "relative h-36 w-28 flex flex-col items-center gap-2 rounded-lg p-3 cursor-pointer",
        isSelected ? "bg-primary/40" : "bg-transparent",
      )}
      onClick={handleClick}
      onKeyDown={handleClick}
    >
      <div className="relative mb-2">
        {/* Blurred image background */}
        <div className="absolute inset-0 rounded-full overflow-hidden blur-lg">
          <Image
            src={image}
            alt={`${title} blurred`}
            fill
            sizes="64px"
            className="rounded-full"
            quality={20}
          />
        </div>
        {/* Main image */}
        <Image
          src={image}
          alt={title}
          width={64}
          height={64}
          className="relative rounded-full bg-cover"
        />
      </div>
      <p className="text-sm text-center">{title}</p>
    </div>
  );
}
