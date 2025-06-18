"use client";

import type { InstalledTool } from "@/lib/mise-api";
import { ToolCard } from "./tool-card";

interface InstalledToolsGridProps {
  tools: InstalledTool[];
  selectedTool: string | null;
  onOpenDialog: (toolName: string) => void;
}

export function InstalledToolsGrid({ tools, selectedTool, onOpenDialog }: InstalledToolsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <ToolCard
          key={tool.name}
          tool={tool}
          selectedTool={selectedTool}
          onOpenDialog={onOpenDialog}
        />
      ))}
    </div>
  );
}
