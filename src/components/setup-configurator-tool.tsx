"use client";

import { useState } from "react";
import ProfileCard, { type Profile } from "./profile-card";
import ApplicationCard, { type Application } from "./application-card";
import { Button } from "./ui/button";
import { Step, type StepItem, Stepper, useStepper } from "./ui/stepper";
import {
  Code,
  FileJson,
  Github,
  GithubIcon,
  Image,
  Monitor,
  Terminal,
} from "lucide-react";

const steps = [
  { label: "Step 1" },
  { label: "Step 2" },
  { label: "Step 3" },
] satisfies StepItem[];

const profiles: Profile[] = [
  { title: "Web Developer" },
  { title: "Data Scientist" },
  { title: "Designer" },
  { title: "Embedded Developer" },
  { title: "Project Manager" },
];

const applications: Application[] = [
  { title: "Visual Studio Code", icon: <Code /> },
  { title: "Jupyter Notebook", icon: <FileJson /> },
  { title: "Adobe Photoshop", icon: <Image /> },
  { title: "Arduino IDE", icon: <Monitor /> },
  { title: "Slack", icon: <Terminal /> },
  { title: "GitHub", icon: <Github /> }, // TODO: both Github and GithubIcon are deprecated, check this
  { title: "Tableau", icon: <FileJson /> },
  { title: "Sketch", icon: <Image /> },
  { title: "Python", icon: <Terminal /> },
  { title: "Java (JDK)", icon: <Code /> },
  { title: "C++", icon: <Code /> },
  { title: "PyCharm", icon: <Code /> },
  { title: "IntelliJ IDEA", icon: <Code /> },
  { title: "Eclipse", icon: <Monitor /> },
  { title: "MATLAB", icon: <Terminal /> },
  { title: "Figma", icon: <Image /> },
];

const profileToApplications: Record<string, string[]> = {
  "Web Developer": [
    "Visual Studio Code",
    "GitHub",
    "Slack",
    "Python",
    "Java (JDK)",
    "C++",
  ],
  "Data Scientist": [
    "Jupyter Notebook",
    "Tableau",
    "GitHub",
    "Python",
    "MATLAB",
  ],
  Designer: ["Adobe Photoshop", "Sketch", "Slack", "Figma"],
  "Embedded Developer": [
    "Arduino IDE",
    "Visual Studio Code",
    "GitHub",
    "C++",
    "Eclipse",
  ],
  "Project Manager": ["Slack", "GitHub"],
};

export default function SetupConfiguratorTool() {
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [currentApplications, setCurrentApplications] = useState<Application[]>(
    [],
  );

  const setProfileAndApplications = (profile: Profile) => {
    setCurrentProfile(profile);
    const applicationTitles = profileToApplications[profile.title] || [];
    const selectedApplications = applicationTitles.map((title) => {
      const app = applications.find((app) => app.title === title);
      if (app) {
        return { title: app.title, icon: app.icon };
      }
      return { title: "", icon: <></> };
    });
    setCurrentApplications(selectedApplications);
  };

  const toggleApplication = (application: Application) => {
    setCurrentApplications((prev) =>
      prev.some((app) => app.title === application.title)
        ? prev.filter((app) => app.title !== application.title)
        : [...prev, application],
    );
  };

  return (
    <div className="container flex h-full max-w-6xl">
      <div className="flex w-full flex-col gap-4">
        <Stepper initialStep={0} steps={steps}>
          {steps.map(({ label }, index) => {
            switch (index) {
              case 0:
                return (
                  <Step key={label} label={label}>
                    <div className="h-40 flex items-center justify-center my-4 gap-3 border rounded-md">
                      {profiles.map((profile) => (
                        <ProfileCard
                          key={profile.title}
                          currentProfile={currentProfile}
                          setCurrentProfile={setProfileAndApplications}
                          {...profile}
                        />
                      ))}
                    </div>
                  </Step>
                );

              case 1:
                return (
                  <Step key={label} label={label}>
                    <div className="h-80 flex flex-wrap justify-center my-4 gap-3 border rounded-md p-4">
                      {applications.map((application) => (
                        <ApplicationCard
                          key={application.title}
                          currentApplications={currentApplications}
                          toggleApplication={toggleApplication}
                          {...application}
                        />
                      ))}
                    </div>
                  </Step>
                );

              case 2:
                return (
                  <Step key={label} label={label}>
                    <div className="h-40 flex items-center justify-center my-4 border rounded-md">
                      <p>Scammed</p>
                    </div>
                  </Step>
                );

              default:
                return null;
            }
          })}
          <Footer />
        </Stepper>
      </div>
    </div>
  );
}

const Footer = () => {
  const {
    nextStep,
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
  } = useStepper();
  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 flex items-center justify-center my-4 border bg-secondary text-primary rounded-md">
          <h1 className="text-xl">Woohoo! All steps completed! 🎉</h1>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? (
          <Button size="sm" onClick={resetSteps}>
            Reset
          </Button>
        ) : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button size="sm" onClick={nextStep}>
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};
