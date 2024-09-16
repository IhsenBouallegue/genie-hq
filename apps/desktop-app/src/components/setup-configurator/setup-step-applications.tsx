import { useGenieStore } from "@/providers/genie-store-provider";
import AnimatedBackground from "@geniehq/ui/components/animated-background";
import { Category } from "@geniehq/ui/lib/store/types";
import ApplicationCard from "@geniehq/ui/setup-configurator/application-card";
import StepDescription from "@geniehq/ui/setup-configurator/base/step-description";
import { PlusIcon } from "lucide-react";
import Group from "../group";
export default function SetupStepApplications() {
  const selectedPackageManager = useGenieStore((state) => state.currentPackageManagerInfo);
  const applications = useGenieStore((state) => Object.values(state.applications));
  const categories = Object.values(Category);
  const toggleApplication = useGenieStore((state) => state.toggleApplication);
  const selectedApplicationIds = useGenieStore((state) => state.selectedApplicationIds);
  if (!selectedPackageManager) {
    return null;
  }
  return (
    <Group label="What do you like to install?">
      <StepDescription>
        Choose the applications you want to install on your system. Or refine the selection from a
        profile.
      </StepDescription>
      {categories.map((category) => (
        <div key={category} className="w-full">
          <h3 className="text-lg font-bold mb-2 text-muted-foreground">{category}</h3>
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
                .filter((application) =>
                  application.installationMethods
                    .map((method) => method.packageManager)
                    .includes(selectedPackageManager.name),
                )
                .filter((application) => application.category === category)
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((application, index) => (
                  <div key={application.id} data-id={`card-${index}`}>
                    <ApplicationCard
                      id={application.id}
                      title={application.title}
                      icon={application.icon}
                      onToggle={toggleApplication}
                      selectedApplicationIds={selectedApplicationIds}
                    />
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
    </Group>
  );
}
