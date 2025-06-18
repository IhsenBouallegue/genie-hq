"use client";

import { useGenieStore } from "@/providers/genie-store-provider";
import { Alert, AlertDescription, AlertTitle } from "@geniehq/ui/components/alert";
import { Button } from "@geniehq/ui/components/button";
import { AlertCircle, X } from "lucide-react";

export function ErrorAlert() {
  const error = useGenieStore((state) => state.error);
  const clearError = useGenieStore((state) => state.clearError);

  if (!error) return null;

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span>{error}</span>
        <Button variant="ghost" size="sm" onClick={clearError}>
          <X className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
