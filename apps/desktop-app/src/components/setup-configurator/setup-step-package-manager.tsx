import { useGenieStore } from "@/providers/genie-store-provider";
import AnimatedBackground from "@geniehq/ui/components/animated-background";
import StepDescription from "@geniehq/ui/setup-configurator/base/step-description";
import PackageManagerCard from "@geniehq/ui/setup-configurator/package-manager-card";
import Group from "../group";

export default function SetupStepPackageManager() {
  const { currentOS, setCurrentPackageManager, currentPackageManager, supportedPackageManagers } =
    useGenieStore((state) => ({
      currentOS: state.currentOS,
      setCurrentPackageManager: state.setCurrentPackageManager,
      currentPackageManager: state.currentPackageManagerInfo,
      supportedPackageManagers: state.supportedPackageManagers,
    }));
  if (!currentOS) {
    return null;
  }

  return (
    <Group label="Select Your Package Manager">
      <StepDescription>
        Choose the package manager you wish to use for installation based on your operating system:{" "}
        {currentOS}
      </StepDescription>
      <div className="flex flex-wrap justify-center gap-4">
        <AnimatedBackground
          className="rounded-lg bg-zinc-100 dark:bg-slate-400/15"
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.3,
          }}
          enableHover
        >
          {supportedPackageManagers().map((pm) => (
            <div data-id={`card-${pm.name}`} key={pm.name}>
              <PackageManagerCard
                name={pm.name}
                icon={pm.icon}
                onToggle={() => setCurrentPackageManager(pm.name)}
                selectedPackageManager={
                  currentPackageManager?.name ? [currentPackageManager?.name] : []
                }
              />
            </div>
          ))}
        </AnimatedBackground>
      </div>
    </Group>
  );
}
