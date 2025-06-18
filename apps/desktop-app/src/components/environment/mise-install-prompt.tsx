"use client";

import { useGenieStore } from "@/providers/genie-store-provider";
import { Alert, AlertDescription, AlertTitle } from "@geniehq/ui/components/alert";
import { Button } from "@geniehq/ui/components/button";
import { AlertCircle, Download } from "lucide-react";
import { Loader2 } from "lucide-react";

export function MiseInstallPrompt() {
  const isLoading = useGenieStore((state) => state.isLoading);
  const installMise = useGenieStore((state) => state.installMise);

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Development Environments</h1>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Mise Not Installed</AlertTitle>
        <AlertDescription>
          Mise is required to manage development environments.
          <Button onClick={() => installMise()} disabled={isLoading} className="ml-4">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Installing...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Install Mise
              </>
            )}
          </Button>
        </AlertDescription>
      </Alert>
    </div>
  );
}
