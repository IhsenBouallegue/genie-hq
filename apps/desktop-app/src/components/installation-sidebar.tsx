import { useState } from "react";

import { useInstallationStore } from "@/lib/store/useInstallationStore";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@geniehq/ui/components/alert";
import { Button } from "@geniehq/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@geniehq/ui/components/card";
import { Progress } from "@geniehq/ui/components/progress";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2Icon,
  Loader2Icon,
  PackageIcon,
  RefreshCwIcon,
  XCircleIcon,
} from "lucide-react";

export default function InstallationSidebar() {
  const {
    installingApps,
    completedApps,
    failedApps,
    totalApps,
    progress,
    isLoading,
    queueApps,
    processQueue,
    markAppAsCompleted,
    markAppAsFailed,
    updateProgress,
    finishInstallation,
    installationQueue,
  } = useInstallationStore();

  const [error, setError] = useState<string | null>(null);

  const handleRetry = () => {
    setError(null);
    // Retry logic for failed installations
    for (const app of Object.keys(failedApps)) {
      markAppAsCompleted(app);
    }
    updateProgress();
  };

  const fadeInOut = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">App Installation Progress</CardTitle>
          <CardDescription>
            Installing {totalApps} app{totalApps !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="w-full h-2" />
          <p className="text-center mt-4 text-lg font-medium">
            {isLoading ? (
              <motion.span
                className="flex items-center justify-center"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Loader2Icon className="mr-2 h-5 w-5 animate-spin" />
                Installing... {Math.round(progress)}%
              </motion.span>
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Installation complete
              </motion.span>
            )}
          </p>
        </CardContent>
      </Card>

      {/* Completed Apps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle2Icon className="mr-2 h-5 w-5 text-green-500" />
            Completed Apps
          </CardTitle>
        </CardHeader>
        <CardContent>
          {completedApps.length > 0 ? (
            <ul className="space-y-2">
              <AnimatePresence>
                {completedApps.map((app) => (
                  <motion.li
                    key={app}
                    className="flex items-center text-green-600"
                    {...fadeInOut}
                  >
                    <PackageIcon className="mr-2 h-4 w-4" />
                    {app}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          ) : (
            <p className="text-muted-foreground">No apps completed yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Failed Apps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <XCircleIcon className="mr-2 h-5 w-5 text-red-500" />
            Failed Apps
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(failedApps).length > 0 ? (
            <>
              <ul className="space-y-2 mb-4">
                <AnimatePresence>
                  {Object.entries(failedApps).map(([app, error]) => (
                    <motion.li
                      key={app}
                      className="flex items-center text-red-600"
                      {...fadeInOut}
                    >
                      <PackageIcon className="mr-2 h-4 w-4" />
                      {app}: {error}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <Button onClick={handleRetry} className="w-full">
                <RefreshCwIcon className="mr-2 h-4 w-4" />
                Retry Failed Installations
              </Button>
            </>
          ) : (
            <p className="text-muted-foreground">No apps failed. Great job!</p>
          )}
        </CardContent>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Installation Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">{totalApps}</p>
              <p className="text-sm text-muted-foreground">Total Apps</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {completedApps.length}
              </p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {Object.keys(failedApps).length}
              </p>
              <p className="text-sm text-muted-foreground">Failed</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
