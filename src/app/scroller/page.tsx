"use client";

import SetupConfiguratorTool from "@/components/setup-configurator-tool";
import SetupStepApplications from "@/components/setup-step-applications";
import SetupStepProfile from "@/components/setup-step-profile";
import SetupStepSummary from "@/components/setup-step-summary";
import { Button } from "@/components/ui/button";
import {
  Step,
  type StepItem,
  Stepper,
  useStepper,
} from "@/components/ui/stepper";

const steps = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
] satisfies StepItem[];

export default function ScrollerPage() {
  return (
    <>
      <StepperTool />
      <div className="bg-white/10 h-[200vh] m-12" />
    </>
  );
}

export function StepperTool() {
  return (
    <div className="container max-w-screen-lg flex w-full flex-col gap-4">
      <Stepper
        initialStep={0}
        steps={steps}
        onClickStep={(step, setStep) => setStep(step)}
        scrollTracking
      >
        {steps.map(({ label }, index) => {
          switch (index) {
            case 0:
              return (
                <Step key={label} label={label}>
                  <div className="bg-slate-800 h-[50vh]" />
                  <StepButtons />
                </Step>
              );

            case 1:
              return (
                <Step key={label} label={label}>
                  <div className="bg-slate-800 h-[200vh]" />
                  <StepButtons />
                </Step>
              );

            case 2:
              return (
                <Step key={label} label={label}>
                  <div className="bg-slate-800 h-[30vh]" />
                  <StepButtons />
                </Step>
              );

            default:
              return null;
          }
        })}
        <FinalStep />
      </Stepper>
    </div>
  );
}

const StepButtons = () => {
  const { nextStep, prevStep, isLastStep, isOptionalStep, isDisabledStep } =
    useStepper();
  return (
    <div className="w-full flex gap-2 mb-4">
      <Button
        disabled={isDisabledStep}
        onClick={(event) => {
          event.stopPropagation();
          prevStep();
        }}
        size="sm"
        variant="secondary"
      >
        Prev
      </Button>
      <Button
        size="sm"
        onClick={(event) => {
          event.stopPropagation();
          nextStep();
        }}
      >
        {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
      </Button>
    </div>
  );
};

const FinalStep = () => {
  const { hasCompletedAllSteps, resetSteps } = useStepper();

  if (!hasCompletedAllSteps) {
    return null;
  }

  return (
    <>
      <div className="h-40 flex items-center justify-center border bg-secondary text-primary rounded-md">
        <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
      </div>
      <div className="w-full flex justify-end gap-2">
        <Button size="sm" onClick={resetSteps}>
          Reset
        </Button>
      </div>
    </>
  );
};
