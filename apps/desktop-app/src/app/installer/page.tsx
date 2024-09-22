"use client";

import ExpandableListSelector from "@/components/expandable-list";
import InstallationSidebar from "@/components/installation-sidebar";
import Installer from "@/components/installer";
import SetupConfigurator from "@/components/setup-configurator";
import SelectableCard from "@geniehq/ui/setup-configurator/selectable-card";
import { SiWindows } from "@icons-pack/react-simple-icons";
export default function Page() {
  return (
    <div className="flex w-full">
      <div className="flex flex-1 flex-col">
        <SetupConfigurator />
      </div>
      <div className="">
        <InstallationSidebar />
      </div>
    </div>
  );
}
