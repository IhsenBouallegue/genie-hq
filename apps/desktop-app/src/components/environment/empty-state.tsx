"use client";

import { XCircle } from "lucide-react";

interface EmptyStateProps {
  activeTab: "installed" | "registry";
}

export function EmptyState({ activeTab }: EmptyStateProps) {
  return (
    <div className="text-center py-8">
      <XCircle className="w-12 h-12 mx-auto text-muted-foreground" />
      <p className="mt-2 text-lg font-medium">
        No {activeTab === "installed" ? "installed" : "registry"} tools found
      </p>
    </div>
  );
}
