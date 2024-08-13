import { Category } from "@/lib/store/types";
import { useStore } from "@/lib/store/useStore";
import ApplicationCard from "./application-card";
import StepContainer from "./step-container";
import StepDescription from "./step-description";
import StepTitle from "./step-title";
import AnimatedBackground from "./ui/animated-background";
const ITEMS = [
  {
    id: 1,
    title: "Dialog",
    description: "Enhances modal presentations.",
  },
  {
    id: 2,
    title: "Popover",
    description: "For small interactive overlays.",
  },
  {
    id: 3,
    title: "Accordion",
    description: "Collapsible sections for more content.",
  },
  {
    id: 4,
    title: "Collapsible",
    description: "Collapsible sections for more content.",
  },
  {
    id: 5,
    title: "Drag to Reorder",
    description: "Reorder items with drag and drop.",
  },
  {
    id: 6,
    title: "Swipe to Delete",
    description: "Delete items with swipe gestures.",
  },
];
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
          </div>
        </div>
      ))}
    </StepContainer>
  );
}
