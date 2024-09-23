import { iconLookup } from "@geniehq/ui/lib/store/icons";
import type { Application } from "@geniehq/ui/lib/store/types";
import { cn } from "@geniehq/ui/lib/utils";
import { CheckIcon, Loader2Icon, LoaderIcon, TriangleAlertIcon, XIcon } from "lucide-react";

export default function InstallationApplication({
  title,
  icon,
  status,
}: Pick<Application, "icon" | "title"> & {
  status: "finished" | "queued" | "failed" | "installing";
}) {
  const Icon = iconLookup[icon];
  return (
    <div
      className={cn(
        "flex w-full h-12 items-center gap-4 p-4 bg-zinc-800/60 rounded-lg transition-colors",
        status === "finished" && "bg-primary/50",
        status === "failed" && "bg-red-600/80",
        status === "installing" && "animate-pulse",
      )}
    >
      <Icon className="size-4" />

      {title}

      {status === "failed" && <TriangleAlertIcon className="ml-auto" />}
      {status === "finished" && <CheckIcon className="ml-auto" />}
      {status === "installing" && <Loader2Icon className="ml-auto animate-spin duration-1000" />}
    </div>
  );
}
