"use client";

import InstallationSidebar from "@/components/installation-sidebar";
import SetupConfigurator from "@/components/setup-configurator";
export default function Home() {
  return (
    <div className="flex w-full">
      <div className="flex flex-1">
        <SetupConfigurator />
      </div>
      <div className="w-1/3 sticky top-0 h-screen">
        <InstallationSidebar />
      </div>
    </div>
  );
}
