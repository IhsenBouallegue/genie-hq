"use client";

import { useStore } from "@/lib/store/useStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@geniehq/ui/components/accordion";
import { CardContent, MotionCard } from "@geniehq/ui/components/card";
import SetupStepApplications from "../setup-step-applications";
import SetupStepProfile from "../setup-step-profile";
import SetupStepSummary from "../setup-step-summary";

export default function SetupConfiguratorAccordion() {
  const openSteps = useStore((state) => state.openSteps);
  const setOpenSteps = useStore((state) => state.setOpenSteps);

  return (
    <section className="flex justify-center items-center p-6 w-full max-w-6xl flex-col">
      <MotionCard className="shadow-lg w-full">
        <CardContent className="p-8">
          <h3 className="font-semibold text-primary">Setup Configurator</h3>
          <p className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Setup your device in 3 easy steps:
          </p>
          <Accordion
            className="w-full mt-4"
            type="multiple"
            value={openSteps}
            onValueChange={setOpenSteps}
          >
            <AccordionItem value="profile-step">
              <AccordionTrigger className="hover:underline-none">
                1. Choose a Profile
              </AccordionTrigger>
              <AccordionContent>
                <SetupStepProfile />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="applications-step">
              <AccordionTrigger className="hover:underline-none">
                2. Choose Applications
              </AccordionTrigger>
              <AccordionContent>
                <SetupStepApplications />
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="summary-step">
              <AccordionTrigger className="hover:underline-none">
                3. Summary and Download
              </AccordionTrigger>
              <AccordionContent>
                <SetupStepSummary />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </MotionCard>
    </section>
  );
}
