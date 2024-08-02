"use client";

import SetupStepApplications from "./setup-step-applications";
import SetupStepProfile from "./setup-step-profile";
import SetupStepSummary from "./setup-step-summary";
import { Button } from "./ui/button";
import { Step, type StepItem, Stepper, useStepper } from "./ui/stepper";

const steps = [
  { label: "Choose your Profile" },
  { label: "Choose your Applications" },
  { label: "Configuration Summary" },
] satisfies StepItem[];

export default function SetupConfiguratorTool() {
  return (
    <div className="container flex flex-col h-full max-w-6xl">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
        Start your Setup!
      </h1>
      <div className="flex w-full flex-col gap-4">
        <Stepper
          initialStep={0}
          steps={steps}
          onClickStep={(step, setStep) => setStep(step)}
        >
          <Footer />

          {steps.map(({ label }, index) => {
            switch (index) {
              case 0:
                return (
                  <Step key={label} label={label}>
                    <SetupStepProfile />
                  </Step>
                );

              case 1:
                return (
                  <Step key={label} label={label}>
                    <SetupStepApplications />
                  </Step>
                );

              case 2:
                return (
                  <Step key={label} label={label}>
                    <SetupStepSummary />
                  </Step>
                );

              default:
                return null;
            }
          })}
        </Stepper>
      </div>
    </div>
  );
}

const Footer = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center my-4 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Previous
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
