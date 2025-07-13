"use client";

import Image from "next/image";
import type { Profile } from "#lib/store/types";
import { cn } from "#lib/utils";

export default function ProfileCard({
  id,
  title,
  image,
  onSelect,
  currentProfileId,
}: Profile & { onSelect: (id: string) => void; currentProfileId: string | null }) {
  const isSelected = currentProfileId === id;

  const handleClick = () => {
    onSelect(id);
  };

  return (
    <button
      type="button"
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
    </button>
  );
}
