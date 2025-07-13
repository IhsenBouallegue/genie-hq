"use client";

import type { LucideIcon } from "lucide-react";
import React from "react";
import { cn } from "#lib/utils";

interface SelectableCardProps {
  id: string;
  title: string;
  icon: LucideIcon;
  isSelected?: boolean;
  onToggle?: (id: string) => void;
  enableHover?: boolean;
  enableBorder?: boolean;
}

export default function SelectableCard({
  id,
  title,
  icon,
  isSelected = false,
  onToggle,
  enableHover = true,
  enableBorder = true,
  ...rest
}: SelectableCardProps) {
  return (
    <button
      className={cn(
        "h-32 w-28 flex flex-col items-center gap-2 rounded-lg p-3 cursor-pointer transition-colors duration-300 ease-in-out",
        isSelected ? "bg-primary/40" : "bg-transparent",
        enableBorder && "border",
        enableHover && (isSelected ? "hover:bg-primary/60" : "hover:bg-slate-400/20"),
      )}
      onClick={() => onToggle?.(id)}
      type="button"
      {...rest}
    >
      <div className="h-1/2">
        <div className="size-16 rounded-full flex flex-1">
          {React.createElement(icon, { className: "text-white m-auto size-8" })}
        </div>
      </div>
      <p className="text-sm text-wrap text-center">{title}</p>
    </button>
  );
}

export function Selectable({
  id,
  isSelected = false,
  enableHover = true,
  enableBorder = true,
  className,
  children,
  ...rest
}: {
  id: string;
  isSelected?: boolean;
  enableHover?: boolean;
  enableBorder?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "flex flex-col flex-1 gap-2 rounded-lg p-3 cursor-pointer transition-colors duration-300 ease-in-out",
        isSelected ? "bg-primary/40" : "bg-transparent",
        enableBorder && "border",
        enableHover && (isSelected ? "hover:bg-primary/60" : "hover:bg-slate-400/20"),
        className,
      )}
      {...rest}
      type="button"
    >
      {children}
    </button>
  );
}
