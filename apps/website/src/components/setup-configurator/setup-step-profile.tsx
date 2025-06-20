import { useStore } from "@/lib/store/useStore";
import AnimatedBackground from "@geniehq/ui/components/animated-background";
import StepContainer from "@geniehq/ui/setup-configurator/base/step-container";
import StepDescription from "@geniehq/ui/setup-configurator/base/step-description";
import StepTitle from "@geniehq/ui/setup-configurator/base/step-title";

import ProfileCard from "@geniehq/ui/setup-configurator/profile-card";

export default function SetupStepProfile() {
  const profiles = useStore((state) => Object.values(state.profiles));
  const selectProfile = useStore((state) => state.selectProfile);
  const currentProfileId = useStore((state) => state.selectedProfile);

  return (
    <StepContainer>
      <StepTitle>Who are you?</StepTitle>
      <StepDescription>
        Based on this profile we will help you select apps you might need.
      </StepDescription>
      <div className="flex gap-4 flex-wrap items-center justify-center">
        <AnimatedBackground
          className="rounded-lg bg-zinc-100 dark:bg-slate-400/15"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
          enableHover
        >
          {profiles.map((profile, index) => (
            <div key={profile.id} data-id={`card-${index}`}>
              <ProfileCard
                {...profile}
                onSelect={selectProfile}
                currentProfileId={currentProfileId}
              />
            </div>
          ))}
        </AnimatedBackground>
      </div>
    </StepContainer>
  );
}
