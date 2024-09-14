"use client";

import { Badge } from "@geniehq/ui/components/badge";
import { Button } from "@geniehq/ui/components/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@geniehq/ui/components/tooltip";
import { Book, Code, Globe, Shield, Terminal } from "lucide-react";
import React from "react";

type TagProps = {
  type: "cli" | "gui" | "cross-platform" | "official" | "community" | "version";
  value: string;
};

const tagInfo = {
  cli: { icon: Terminal, description: "Command Line Interface" },
  gui: { icon: Code, description: "Graphical User Interface" },
  "cross-platform": {
    icon: Globe,
    description: "Works on multiple operating systems",
  },
  official: {
    icon: Shield,
    description: "Officially supported by the OS or a major organization",
  },
  community: {
    icon: Book,
    description: "Developed and maintained by the community",
  },
  version: {
    icon: null,
    description: "Current version of the package manager",
  },
};

export function TagWithTooltip({ type, value }: TagProps) {
  const { icon: Icon, description } = tagInfo[type];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant={type === "version" ? "outline" : "secondary"}
            className="flex items-center gap-1"
          >
            {Icon && <Icon className="w-3 h-3" />}
            {value}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
