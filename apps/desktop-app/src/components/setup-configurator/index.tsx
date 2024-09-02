"use client";

import { useStore } from "@/lib/store/useStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@geniehq/ui/components/accordion";
import { CardContent, MotionCard } from "@geniehq/ui/components/card";
import { useEffect } from "react";
import SetupStepApplications from "./setup-step-applications";
import SetupStepPackageManager from "./setup-step-package-manager";
import SetupStepProfile from "./setup-step-profile";
import SetupStepSummary from "./setup-step-summary";

export default function SetupConfiguratorAccordion() {
  const openSteps = useStore((state) => state.openSteps);
  const setOpenSteps = useStore((state) => state.setOpenSteps);
  const setCurrentOS = useStore((state) => state.setCurrentOS);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setCurrentOS();
  }, []);

  return (
    <section className="flex justify-center items-center p-6 w-full max-w-6xl flex-col">
      <MotionCard className="shadow-lg w-full">
        <CardContent className="p-8">
          <h3 className="font-semibold text-primary">Setup Configurator</h3>
          <p className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Setup your device in 3 easy steps:
          </p>
          0. Choose a Package Manager
          <SetupStepPackageManager />
          1. Choose a Profile
          <SetupStepProfile />
          2. Choose Applications
          <SetupStepApplications />
          3. Summary and Download
          <SetupStepSummary />
        </CardContent>
      </MotionCard>
    </section>
  );
}
