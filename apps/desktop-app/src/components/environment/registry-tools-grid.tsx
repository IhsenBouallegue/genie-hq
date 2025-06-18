"use client";

import type { RegistryTool } from "@/lib/mise-api";
import { RegistryToolCard } from "./registry-tool-card";

interface RegistryToolsGridProps {
  tools: RegistryTool[];
}

export function RegistryToolsGrid({ tools }: RegistryToolsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <RegistryToolCard key={tool.name} tool={tool} />
      ))}
    </div>
  );
}
