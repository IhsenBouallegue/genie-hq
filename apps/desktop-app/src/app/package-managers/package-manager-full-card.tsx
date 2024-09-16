import { TagWithTooltip } from "@/components/tag-with-tooltip";
import { Badge } from "@geniehq/ui/components/badge";
import { Button } from "@geniehq/ui/components/button";
import type { PackageManagerInfo } from "@geniehq/ui/lib/store/types";
import { Selectable } from "@geniehq/ui/setup-configurator/selectable-card";
import {
  CheckCircle,
  Download,
  Package,
  RefreshCw,
  XCircle,
} from "lucide-react";

export default function PackageManagerFullCard({
  pm,
}: { pm: PackageManagerInfo }) {
  const isSupported = pm.status !== "unsupported";
  return (
    <Selectable
      key={pm.name}
      id={pm.name}
      enableHover={isSupported}
      className={`${isSupported ? "" : "opacity-60 cursor-default saturate-50 blur-[0.8px] pointer-events-none"} `}
    >
      <div className="flex justify-between items-start mb-2 w-full">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">{pm.name}</h2>
        </div>
        <div>
          {isSupported &&
            (pm.status === "available" ? (
              <Button
                size="sm"
                variant="ghost"
                disabled
                title="Not supported yet"
              >
                <Download className="w-4 h-4 mr-1" />
                Install
              </Button>
            ) : pm.status === "update-available" ? (
              <Button size="sm" variant="ghost">
                <RefreshCw className="w-4 h-4 mr-1" />
                Update
              </Button>
            ) : null)}
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-2 text-left flex-grow">
        {pm.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-2">
        {pm.status === "installed" && (
          <Badge variant="green">
            <CheckCircle className="w-3 h-3 mr-1" />
            Installed
          </Badge>
        )}
        {pm.status === "available" && (
          <Badge variant="outline">
            <Download className="w-3 h-3 mr-1" />
            Available
          </Badge>
        )}
        {pm.status === "update-available" && (
          <Badge variant="yellow">
            <RefreshCw className="w-3 h-3 mr-1" />
            Update Available
          </Badge>
        )}
        {pm.tags.map((tag) => (
          <TagWithTooltip
            key={tag.type}
            type={tag.type}
            value={tag.value}
            icon={tag.icon}
          />
        ))}
        {pm.version && <Badge>v{pm.version}</Badge>}
        {!isSupported && (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Not Supported
          </Badge>
        )}
      </div>
    </Selectable>
  );
}
