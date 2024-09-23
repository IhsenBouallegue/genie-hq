import { useGenieStore } from "@/providers/genie-store-provider";
import { Progress } from "@geniehq/ui/components/progress";
import { motion } from "framer-motion";
import { Loader2Icon } from "lucide-react";

export default function InstallationProgressBar() {
  const { progress, isLoading, installationQueue } = useGenieStore((state) => ({
    progress: state.progress,
    isLoading: state.isLoading,
    installationQueue: state.installationQueue,
  }));
  const doneApps = Object.values(installationQueue).filter(
    ({ status }) => status === "failed" || status === "finished",
  ).length;
  const totalApps = Object.values(installationQueue).length;
  if (totalApps === 0) return null;
  return (
    <motion.div
      className="flex justify-center items-center gap-2 text-sm text-nowrap"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {isLoading ? (
        <span className="flex items-center justify-center ">
          <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />
          {Math.round(progress)}%
        </span>
      ) : (
        <span className="text-sm text-nowrap">100%</span>
      )}
      <Progress value={progress} className="w-48 h-2" />
      {doneApps}/{totalApps}
    </motion.div>
  );
}
