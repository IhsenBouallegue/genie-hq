import Group from "@/components/group";
import InstallationApplication from "@/components/installation-sidebar/installation-application";
import { useGenieStore } from "@/providers/genie-store-provider";
import { Button } from "@geniehq/ui/components/button";
import { cn } from "@geniehq/ui/lib/utils";
import { motion } from "framer-motion";
import { MonitorDown } from "lucide-react";
import { MagicMotion } from "react-magic-motion";
export default function InstallationSidebar() {
  const installationQueue = useGenieStore((state) => state.installationQueue);
  const applications = useGenieStore((state) => state.applications);
  const isLoading = useGenieStore((state) => state.isLoading);
  const startInstallation = useGenieStore((state) => state.startInstallation);

  return (
    <motion.div
      initial={{ x: 200 }}
      animate={{ x: 0 }}
      exit={{ x: 200 }}
      transition={{ duration: 0.2 }}
    >
      {/* <MagicMotion
        transition={{ type: "spring", stiffness: 100 }}
        layoutDependency={installationQueue}
        disabled
      > */}
      <Group label="Queued Apps" className="p-0 md:p-3 gap-4 ml-4 w-72 sticky top-4">
        <Button
          onClick={startInstallation}
          className={cn(
            "w-full",
            isLoading && "animate-pulse duration-3000 pointer-events-none cursor-none select-none",
          )}
          // disabled={isLoading}
        >
          <MonitorDown className="size-4 mr-2" />
          {isLoading ? "Installing..." : "Start Installation"}
        </Button>
        <div className="flex flex-col gap-2">
          {Object.keys(installationQueue).length > 0 &&
            Object.values(applications)
              .filter((app) => installationQueue[app.id])
              .map((app) => (
                <InstallationApplication
                  key={app.id}
                  title={app.title}
                  icon={app.icon}
                  status={installationQueue[app.id]?.status || "queued"}
                  stdout={installationQueue[app.id]?.stdout}
                  stderr={installationQueue[app.id]?.stderr}
                />
              ))}
        </div>
      </Group>
      {/* </MagicMotion> */}
    </motion.div>
  );
}
