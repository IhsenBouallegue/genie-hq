import { PlusIcon } from "lucide-react";
import AnimatedBackground from "#components/animated-background";
import { Category } from "#lib/store/types";
import { useStore } from "#lib/store/useStore";
import ApplicationCard from "./application-card";
import StepContainer from "./base/step-container";
import StepDescription from "./base/step-description";
import StepTitle from "./base/step-title";

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
            <AnimatedBackground
              className="rounded-lg bg-zinc-100 dark:bg-slate-400/15"
              transition={{
                type: "spring",
                bounce: 0.2,
                duration: 0.3,
              }}
              enableHover
            >
              {applications
                .filter((application) => application.category === category)
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((application, index) => (
                  <div key={application.id} data-id={`card-${index}`}>
                    <ApplicationCard {...application} />
                  </div>
                ))}
            </AnimatedBackground>
            <div className="text-xs text-muted-foreground h-32 w-28 flex flex-col items-center gap-2 rounded-lg p-3 border border-dashed ">
              <div className="h-1/2">
                <div className="size-16 rounded-full flex flex-1">
                  <PlusIcon className="m-auto size-8" />
                </div>
              </div>
              <p className="text-xs text-wrap text-center">More Coming Soon</p>
            </div>
          </div>
        </div>
      ))}
    </StepContainer>
  );
}
