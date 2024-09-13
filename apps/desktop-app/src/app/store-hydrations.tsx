import { useStore } from "@/lib/store/useStore";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";

// Dynamically import the loading component
const Loading = dynamic(() => import("./loading"));

export function HydrationBoundary({ children }: { children: React.ReactNode }) {
  const hasHydrated = useStore((state) => state._hasHydrated);

  if (!hasHydrated) {
    return <Loading />;
  }

  return <>{children}</>;
}
