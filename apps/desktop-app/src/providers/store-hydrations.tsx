"use client";

import { useGenieStore } from "@/providers/genie-store-provider";
import dynamic from "next/dynamic";

// Dynamically import the loading component
const Loading = dynamic(() => import("../app/loading"));

export function HydrationBoundary({ children }: { children: React.ReactNode }) {
  const hasHydrated = useGenieStore((state) => state._hasHydrated);

  if (!hasHydrated) {
    return <Loading />;
  }

  return <>{children}</>;
}
