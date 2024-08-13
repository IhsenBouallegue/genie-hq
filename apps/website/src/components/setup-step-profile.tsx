import { useStore } from "@/lib/store/useStore";
import ProfileCard from "./profile-card";
import StepContainer from "./step-container";
import StepDescription from "./step-description";
import StepTitle from "./step-title";
import AnimatedBackground from "./ui/animated-background";

export default function SetupStepProfile() {
  const profiles = useStore((state) => Object.values(state.profiles));

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
              <ProfileCard {...profile} />
            </div>
          ))}
        </AnimatedBackground>
      </div>
    </StepContainer>
  );
}
