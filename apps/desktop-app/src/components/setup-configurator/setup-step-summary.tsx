"use client";

import Group from "@/components/group";
import { handleSequentialInstallations } from "@/lib/logic";
import { useGenieStore } from "@/providers/genie-store-provider";
import { Button } from "@geniehq/ui/components/button";
import StepDescription from "@geniehq/ui/setup-configurator/base/step-description";
import SelectableCard from "@geniehq/ui/setup-configurator/selectable-card";
import { ShieldCheckIcon, UserXIcon } from "lucide-react";
import { useState } from "react";

export default function SetupStepSummary() {
  const selectedProfile = useGenieStore((state) => state.getSelectedProfile());
  const currentPackageManagerInfo = useGenieStore((state) => state.currentPackageManagerInfo);
  const selectedApplications = useGenieStore((state) => state.getSelectedApplications());
  const { installationQueue, isLoading, startInstallation, queueApps } = useGenieStore((state) => ({
    installationQueue: state.installationQueue,
    isLoading: state.isLoading,
    startInstallation: state.startInstallation,
    queueApps: state.queueApps,
  }));

  const isNothingSelected = !selectedProfile || selectedApplications.length === 0;

  // State to manage the installation method
  const [useAdminRights, setUseAdminRights] = useState<boolean | null>(null);

  return (
    <Group label="Is this all you need?">
      <StepDescription>
        These apps will be installed by GenieHQ. If you need anything else, you can go back and
        adjust your selection.
      </StepDescription>
      <div className="flex flex-col gap-6">
        {isNothingSelected ? (
          <p>No profile or applications selected.</p>
        ) : (
          <>
            {selectedProfile && (
              <div>
                <h4 className="text-md font-semibold">Selected Profile:</h4>
                <p className="pl-2 mt-3">{selectedProfile.title}</p>
              </div>
            )}
            {selectedApplications.length > 0 && (
              <div>
                <h4 className="text-md font-semibold">Selected Applications:</h4>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3 pl-5 list-disc">
                  {selectedApplications.map((app) => (
                    <li key={app.id}>{app.title}</li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="text-md font-semibold">Choose Installation Method:</h4>
              <div className="flex flex-wrap gap-2 mt-4">
                <SelectableCard
                  id="admin-rights"
                  title="With Admin Rights"
                  icon={ShieldCheckIcon}
                  isSelected={useAdminRights === true}
                  onToggle={() => setUseAdminRights(true)}
                />
                <SelectableCard
                  id="no-admin-rights"
                  title="No Admin Rights"
                  icon={UserXIcon}
                  isSelected={useAdminRights === false}
                  onToggle={() => setUseAdminRights(false)}
                />
              </div>
            </div>
            {currentPackageManagerInfo && (
              <>
                <div className="flex space-x-4">
                  <Button
                    onClick={() => {
                      queueApps(selectedApplications.map((app) => app.id));
                    }}
                    className="w-full"
                  >
                    Queue Apps for Installation
                  </Button>
                  {Object.values(installationQueue).length > 0 && (
                    <Button onClick={startInstallation} className="w-full" disabled={isLoading}>
                      {isLoading ? "Installing..." : "Start Installation"}
                    </Button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Group>
  );
}
