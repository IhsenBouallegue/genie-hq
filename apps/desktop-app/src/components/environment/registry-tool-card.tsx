"use client";

import type { RegistryTool } from "@/lib/mise-api";
import { useGenieStore } from "@/providers/genie-store-provider";
import { Badge } from "@geniehq/ui/components/badge";
import { Button } from "@geniehq/ui/components/button";
import { Selectable } from "@geniehq/ui/setup-configurator/selectable-card";
import { Download, Loader2, Package } from "lucide-react";
import React from "react";

interface RegistryToolCardProps {
  tool: RegistryTool;
}

export function RegistryToolCard({ tool }: RegistryToolCardProps) {
  const isLoading = useGenieStore((state) => state.isLoading);
  const installToolFromRegistry = useGenieStore((state) => state.installToolFromRegistry);

  return (
    <Selectable
      id={tool.name}
      isSelected={false}
      enableHover={true}
      enableBorder={true}
      className="h-auto min-h-[120px]"
    >
      <React.Fragment>
        <div className="flex justify-between items-start mb-2 w-full">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">{tool.name}</h2>
          </div>
          <div>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                installToolFromRegistry(tool.name);
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-1" />
              )}
              Install
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline">{tool.backend.split(":")[0]}</Badge>
          <Badge variant="secondary">Registry</Badge>
        </div>
      </React.Fragment>
    </Selectable>
  );
}
