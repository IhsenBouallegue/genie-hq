"use client";

import type { InstalledTool, ToolVersion } from "@/lib/mise-api";
import { useGenieStore } from "@/providers/genie-store-provider";
import { Badge } from "@geniehq/ui/components/badge";
import { Button } from "@geniehq/ui/components/button";
import { Selectable } from "@geniehq/ui/setup-configurator/selectable-card";
import { Code, Globe, Settings } from "lucide-react";
import React from "react";

interface ToolCardProps {
  tool: InstalledTool;
  selectedTool: string | null;
  onOpenDialog: (toolName: string) => void;
}

export function ToolCard({ tool, selectedTool, onOpenDialog }: ToolCardProps) {
  const installedVersions = tool.versions.filter((v: ToolVersion) => v.installed);
  const activeVersion = tool.versions.find((v: ToolVersion) => v.active);
  const isSelected = selectedTool === tool.name;

  return (
    <Selectable
      id={tool.name}
      isSelected={isSelected}
      enableHover={true}
      enableBorder={true}
      className="h-auto min-h-[120px]"
      onClick={() => onOpenDialog(tool.name)}
    >
      <React.Fragment>
        <div className="flex justify-between items-start mb-2 w-full">
          <div className="flex items-center gap-2">
            <Code className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">{tool.name}</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDialog(tool.name);
            }}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {installedVersions.length > 0 && (
            <Badge variant="secondary">{installedVersions.length} installed</Badge>
          )}

          {activeVersion && (
            <Badge variant="default">
              <Globe className="w-3 h-3 mr-1" />
              Active: {activeVersion.version}
            </Badge>
          )}

          {!activeVersion && installedVersions.length > 0 && (
            <Badge variant="outline">No active version</Badge>
          )}

          {installedVersions.length === 0 && <Badge variant="outline">Not installed</Badge>}
        </div>

        {installedVersions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {installedVersions.slice(0, 3).map((v: ToolVersion) => (
              <Badge key={v.version} variant="outline" className="text-xs">
                {v.version}
              </Badge>
            ))}
            {installedVersions.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{installedVersions.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </React.Fragment>
    </Selectable>
  );
}
