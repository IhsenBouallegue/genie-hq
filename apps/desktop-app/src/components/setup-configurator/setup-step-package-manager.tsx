import { useStore } from "@/lib/store/useStore";
import {
  PackageManagerDetails,
  type PackageManagerInfo,
} from "@geniehq/ui/lib/store/types";
import StepContainer from "@geniehq/ui/setup-configurator/base/step-container";
import StepDescription from "@geniehq/ui/setup-configurator/base/step-description";
import StepTitle from "@geniehq/ui/setup-configurator/base/step-title";
import SelectableCard from "@geniehq/ui/setup-configurator/selectable-card";
import { useEffect } from "react";

export default function SetupStepPackageManager() {
  const { currentOS, setCurrentPackageManager, currentPackageManager } =
    useStore((state) => ({
      currentOS: state.currentOS,
      setCurrentPackageManager: state.setCurrentPackageManager,
      currentPackageManager: state.currentPackageManager,
    }));
  if (!currentOS) {
    return null;
  }
  const packageManagers = Object.values(PackageManagerDetails).filter((pm) =>
    pm.supportedOS.includes(currentOS),
  );

  return (
    <StepContainer>
      <StepTitle>Select Your Package Manager</StepTitle>
      <StepDescription>
        Choose the package manager you wish to use for installation based on
        your operating system: {currentOS}
      </StepDescription>
      <div className="flex flex-wrap justify-center gap-4">
        {packageManagers.map((pm) => (
          <SelectableCard
            key={pm.name}
            id={pm.name}
            title={pm.name}
            icon={pm.icon}
            isSelected={currentPackageManager === pm.name}
            onToggle={() => setCurrentPackageManager(pm.name)}
          />
        ))}
      </div>
    </StepContainer>
  );
}
