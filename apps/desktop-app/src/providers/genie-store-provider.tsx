"use client";

import { createGenieStore } from "@/lib/store/genie-store";
import type { GenieStore } from "@/lib/store/genie-store-type";
import type { OperatingSystem } from "@geniehq/ui/lib/store/types";
import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

export type GenieStoreApi = ReturnType<typeof createGenieStore>;

export const GenieStoreContext = createContext<GenieStoreApi | undefined>(
  undefined,
);

interface GenieStoreProviderProps {
  children: ReactNode;
  os: OperatingSystem; // The OS is required here
}

export const GenieStoreProvider = ({
  children,
  os,
}: GenieStoreProviderProps) => {
  const storeRef = useRef<ReturnType<typeof createGenieStore>>();

  if (!storeRef.current) {
    storeRef.current = createGenieStore({ currentOS: os });
  }

  return (
    <GenieStoreContext.Provider value={storeRef.current}>
      {children}
    </GenieStoreContext.Provider>
  );
};

export const useGenieStore = <T,>(selector: (store: GenieStore) => T): T => {
  const counterStoreContext = useContext(GenieStoreContext);

  if (!counterStoreContext) {
    throw new Error("useCounterStore must be used within CounterStoreProvider");
  }

  return useStore(counterStoreContext, selector);
};
