import { useStore } from "@/lib/store/useStore";
import ProfileCard from "./profile-card";
import StepContainer from "./step-container";
import StepDescription from "./step-description";
import StepTitle from "./step-title";

export default function SetupStepProfile() {
  const profiles = useStore((state) => Object.values(state.profiles));

  return (
    <StepContainer>
      <StepTitle>Who are you?</StepTitle>
      <StepDescription>
        Based on this profile we will help you select apps you might need.
      </StepDescription>
      <div className="flex gap-4 flex-wrap items-center justify-center">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} {...profile} />
        ))}
      </div>
    </StepContainer>
  );
}
