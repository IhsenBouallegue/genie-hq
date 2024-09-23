"use client";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

import InstallationSidebar from "@/components/installation-sidebar";
import SetupConfigurator from "@/components/setup-configurator";
export default function Page() {
  return (
    <div className="flex overflow-clip relative">
      <AnimatePresence>
        <div className="flex flex-1 flex-col">
          <SetupConfigurator />
        </div>
        <div>
          <InstallationSidebar />
        </div>
      </AnimatePresence>
    </div>
  );
}
