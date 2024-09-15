import type {
  Application,
  ApplicationId,
  OperatingSystem,
  PackageManager,
  Profile,
} from "@geniehq/ui/lib/store/types";
import { isAppSupported } from "./app-logic";

export function isProfileSupported(
  profile: Profile,
  allApplications: Record<ApplicationId, Application>,
  currentOs: OperatingSystem,
  installedPackageManagers: PackageManager[],
) {
  for (const applicationId of profile.relevantApplications) {
    const application = allApplications[applicationId];
    if (
      !application ||
      !isAppSupported(application, currentOs, installedPackageManagers)
    ) {
      return false;
    }
  }
  return true;
}
