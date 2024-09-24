import type { AppInstallationInfo } from "@/lib/store/_slices/installation-slice";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@geniehq/ui/components/dialog";
import { iconLookup } from "@geniehq/ui/lib/store/icons";
import type { Application } from "@geniehq/ui/lib/store/types";
import { cn } from "@geniehq/ui/lib/utils";
import { AlertCircleIcon, CheckIcon, Loader2Icon, Logs, LogsIcon } from "lucide-react";

export default function InstallationApplication({
  title,
  icon,
  status,
  stdout,
  stderr,
}: Pick<Application, "icon" | "title"> & AppInstallationInfo) {
  const Icon = iconLookup[icon];

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={cn(
            "flex w-full h-12 items-center gap-4 p-4 bg-zinc-800/60 rounded-lg transition-colors cursor-pointer text-nowrap text-ellipsis",
            status === "finished" && "bg-primary/20",
            status === "failed" && "bg-red-600/80",
            status === "installing" && "animate-pulse",
          )}
        >
          <Icon className="size-4" />

          {title}

          {status === "failed" && <AlertCircleIcon className="size-4 ml-auto" />}
          {status === "finished" && <CheckIcon className="size-4 ml-auto" />}
          {status === "installing" && (
            <Loader2Icon className="size-4 ml-auto animate-spin duration-1000" />
          )}
        </div>
      </DialogTrigger>

      <DialogContent forceMount>
        <DialogHeader>
          <DialogTitle>{title} Logs</DialogTitle>
          <DialogDescription>
            Review the installation logs for <strong>{title}</strong>.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Standard Output (stdout)</h3>
          <pre className="bg-gray-800 p-2 rounded mt-2 overflow-auto max-h-40">{stdout}</pre>
          <h3 className="text-lg font-semibold mt-4">Error Output (stderr)</h3>
          <pre className="bg-gray-800 p-2 rounded mt-2 overflow-auto max-h-40">{stderr}</pre>
        </div>
        <DialogClose className="mt-4">Close</DialogClose>
      </DialogContent>
    </Dialog>
  );
}
