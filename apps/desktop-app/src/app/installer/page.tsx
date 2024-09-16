"use client";

import InstallationSidebar from "@/components/installation-sidebar";
import SetupConfigurator from "@/components/setup-configurator";
export default function Page() {
  return (
    <div className="flex w-full">
      <div className="flex flex-1 flex-col">
        {/* <ExpandableListSelector
          title="Select your profile"
          description="Select the profile you want to install"
          options={[
            { id: "1" },
            { id: "2" },
            { id: "3" },
            { id: "5" },
            { id: "6" },
            { id: "8" },
          ]}
          renderOption={(option) => (
            <SelectableCard title={"someth"} id={option.id} icon={SiWindows} />
          )}
        /> */}
        <SetupConfigurator />
      </div>
      <div className="w-1/3 sticky top-0 h-screen">
        <InstallationSidebar />
      </div>
    </div>
  );
}
