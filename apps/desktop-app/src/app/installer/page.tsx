"use client";
import { AnimatePresence } from "framer-motion";

import InstallationSidebar from "@/components/installation-sidebar";
import SetupConfigurator from "@/components/setup-configurator";
import { useGenieStore } from "@/providers/genie-store-provider";
export default function Page() {
  const installationQueue = useGenieStore((state) => state.installationQueue);

  return (
    <div className="flex overflow-clip relative">
      <AnimatePresence initial={false}>
        <div className="flex flex-1 flex-col">
          <SetupConfigurator />
        </div>
        {Object.keys(installationQueue).length !== 0 && (
          <InstallationSidebar key="installation-sidebar" />
        )}
      </AnimatePresence>
    </div>
  );
}
