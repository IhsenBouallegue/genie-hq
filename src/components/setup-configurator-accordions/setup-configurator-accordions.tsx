"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Card, CardContent } from "../ui/card";
import SetupStepProfile from "../setup-step-profile";
import SetupStepApplications from "../setup-step-applications";
import SetupStepSummary from "../setup-step-summary";

export default function SetupConfiguratorAccordions() {
  return (
    <section className="flex justify-center items-center p-6 w-full">
      <Card className="shadow-lg w-full max-w-[1100px]">
        <CardContent className="p-8">
          <h3 className="font-semibold text-primary">Setup Configurator</h3>
          <p className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Configure your setup in three easy steps
          </p>
          <Accordion
            className="w-full mt-4"
            type="multiple"
            defaultValue={["profile-step"]}
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
      </Card>
    </section>
  );
}
