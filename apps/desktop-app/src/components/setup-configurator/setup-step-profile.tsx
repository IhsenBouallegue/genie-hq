import { isProfileSupported } from "@/lib/profile-logic";
import { useGenieStore } from "@/providers/genie-store-provider";
import AnimatedBackground from "@geniehq/ui/components/animated-background";
import type { Profile } from "@geniehq/ui/lib/store/types";
import StepDescription from "@geniehq/ui/setup-configurator/base/step-description";
import ProfileCard from "@geniehq/ui/setup-configurator/profile-card";
import { useMemo } from "react";
import Group from "../group";

export default function SetupStepProfile() {
  const profiles = useGenieStore((state) => Object.values(state.profiles));
  const selectProfile = useGenieStore((state) => state.selectProfile);
  const currentProfileId = useGenieStore((state) => state.selectedProfile);
  const applications = useGenieStore((state) => state.applications);
  const currentOS = useGenieStore((state) => state.currentOS);
  const currentPackageManager = useGenieStore((state) => state.currentPackageManagerInfo)?.name;

  const isSupported = useMemo(
    () => (profile: Profile) =>
      isProfileSupported(
        profile,
        applications,
        currentOS,
        currentPackageManager ? [currentPackageManager] : [],
      ),
    [applications, currentOS, currentPackageManager],
  );
  return (
    <Group label="Who are you?">
      <StepDescription>
        Based on this profile we will help you select apps you might need.
      </StepDescription>
      <div className="flex gap-3 flex-wrap">
        <AnimatedBackground
          className="rounded-lg bg-zinc-100 dark:bg-slate-400/15"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
          enableHover
        >
          {profiles.filter(isSupported).map((profile, index) => (
            <div key={profile.id} data-id={`card-${index}`}>
              <ProfileCard
                {...profile}
                onSelect={selectProfile}
                currentProfileId={currentProfileId}
              />
            </div>
          ))}
        </AnimatedBackground>
        {profiles.filter(isSupported).length === 0 && (
          <p className="text-lg">No profile is fully supported by this package manager.</p>
        )}
      </div>
    </Group>
  );
}
