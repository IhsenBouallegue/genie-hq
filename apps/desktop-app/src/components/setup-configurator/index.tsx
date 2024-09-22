"use client";

import SetupStepApplications from "./setup-step-applications";
import SetupStepPackageManager from "./setup-step-package-manager";
import SetupStepProfile from "./setup-step-profile";
import SetupStepSummary from "./setup-step-summary";

export default function SetupConfigurator() {
  return (
    <div className="flex flex-col gap-2 justify-center w-full">
      <SetupStepPackageManager />
      <SetupStepProfile />
      <SetupStepApplications />
      <SetupStepSummary />
    </div>
  );
}
