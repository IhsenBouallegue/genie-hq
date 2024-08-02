import { Category } from "@/lib/store/types";
import { useStore } from "@/lib/store/useStore";
import ApplicationCard from "./application-card";
import StepContainer from "./step-container";
import StepDescription from "./step-description";
import StepTitle from "./step-title";

export default function SetupStepApplications() {
  const applications = useStore((state) => Object.values(state.applications));
  const categories = Object.values(Category);

  return (
    <StepContainer>
      <StepTitle>What do you like to install?</StepTitle>
      <StepDescription>
        Choose the applications you want to install on your system. Or refine
        the selection from a profile.
      </StepDescription>
      {categories.map((category) => (
        <div key={category} className="w-full">
          <h3 className="text-lg font-bold mb-2 text-muted-foreground">
            {category}
          </h3>
          <div className="flex flex-wrap gap-3">
            {applications
              .filter((application) => application.category === category)
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((application) => (
                <ApplicationCard key={application.id} {...application} />
              ))}
          </div>
        </div>
      ))}
    </StepContainer>
  );
}
