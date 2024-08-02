"use client";

import { useStore } from "@/lib/store/useStore";
import StepContainer from "./step-container";
import StepTitle from "./step-title";
import { SubscribeDialog } from "./subscribe-dialog";

export default function SetupStepSummary() {
  const selectedProfile = useStore((state) => state.getSelectedProfile());
  const selectedApplications = useStore((state) =>
    state.getSelectedApplications(),
  );

  const isNothingSelected =
    !selectedProfile && selectedApplications.length === 0;

  return (
    <StepContainer>
      <StepTitle>Configuration Summary</StepTitle>
      <div className="flex flex-col gap-6">
        {isNothingSelected ? (
          <p>No profile or applications selected.</p>
        ) : (
          <>
            {selectedProfile && (
              <div>
                <h4 className="text-md font-semibold">Selected Profile:</h4>
                <p>{selectedProfile.title}</p>
              </div>
            )}
            {selectedApplications.length > 0 && (
              <div>
                <h4 className="text-md font-semibold">
                  Selected Applications:
                </h4>
                <ul className="list-disc pl-5">
                  {selectedApplications.map((app) => (
                    <li key={app.id}>{app.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
        <SubscribeDialog />
      </div>
    </StepContainer>
  );
}
