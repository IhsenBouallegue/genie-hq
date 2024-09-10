"use client";

import InstallationSidebar from "../installation-sidebar";
import SetupStepApplications from "./setup-step-applications";
import SetupStepPackageManager from "./setup-step-package-manager";
import SetupStepProfile from "./setup-step-profile";
import SetupStepSummary from "./setup-step-summary";

export default function SetupConfigurator() {
  return (
    <div className="flex flex-col justify-center w-full">
      <SetupStepPackageManager />
      <SetupStepProfile />
      <SetupStepApplications />
      <SetupStepSummary />
    </div>
  );
}
