import { useGenieStore } from "@/providers/genie-store-provider";
import { PackageManagerDetails } from "@geniehq/ui/lib/store/types";
import StepDescription from "@geniehq/ui/setup-configurator/base/step-description";
import SelectableCard from "@geniehq/ui/setup-configurator/selectable-card";
import Group from "../group";

export default function SetupStepPackageManager() {
  const { currentOS, setCurrentPackageManager, currentPackageManager } =
    useGenieStore((state) => ({
      currentOS: state.currentOS,
      setCurrentPackageManager: state.setCurrentPackageManager,
      currentPackageManager: state.currentPackageManagerInfo,
    }));
  if (!currentOS) {
    return null;
  }
  const packageManagers = Object.values(PackageManagerDetails).filter((pm) =>
    pm.supportedOS.includes(currentOS),
  );

  return (
    <Group label="Select Your Package Manager">
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
            isSelected={currentPackageManager?.name === pm.name}
            onToggle={() => setCurrentPackageManager(pm.name)}
          />
        ))}
      </div>
    </Group>
  );
}
