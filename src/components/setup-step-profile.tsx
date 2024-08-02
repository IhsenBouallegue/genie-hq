// SetupStepProfile.tsx
import { useStore } from "@/lib/store/useStore";
import ProfileCard from "./profile-card";
import StepContainer from "./step-container";
import StepTitle from "./step-title";

export default function SetupStepProfile() {
  const profiles = useStore((state) => Object.values(state.profiles));

  return (
    <StepContainer>
      <StepTitle>Choose your Profile</StepTitle>
      <div className="flex gap-4">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} {...profile} />
        ))}
      </div>
    </StepContainer>
  );
}
