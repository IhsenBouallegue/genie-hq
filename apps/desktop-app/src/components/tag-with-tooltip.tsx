"use client";

import { Badge } from "@geniehq/ui/components/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@geniehq/ui/components/tooltip";
import type { PackageManagerInfo } from "@geniehq/ui/lib/store/types";
import { Book, Globe, Shield } from "lucide-react";

const tagInfo = {
  "Cross Platform": {
    icon: Globe,
    description: "Works on multiple operating systems",
  },
  Official: {
    icon: Shield,
    description: "Officially supported by the OS or a major organization",
  },
  Community: {
    icon: Book,
    description: "Developed and maintained by the community",
  },
};

export function TagWithTooltip({ type, value }: PackageManagerInfo["tags"][number]) {
  const { icon: Icon } = tagInfo[type];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className="flex items-center gap-1" variant="secondary">
            {Icon && <Icon className="w-3 h-3" />}
            {type}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{value}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
