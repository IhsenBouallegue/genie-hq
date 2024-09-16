import type {
  Application,
  OperatingSystem,
  PackageManager,
  PackageManagerInfo,
} from "@geniehq/ui/lib/store/types";

export function isAppSupportedByOS(application: Application, currentOs: OperatingSystem): boolean {
  return application.installationMethods.map((im) => im.os).some((os) => os === currentOs);
}

export function isAppSupportedByPackageManagers(
  application: Application,
  installedPackageManagers: PackageManager[],
): boolean {
  return application.installationMethods
    .map((im) => im.packageManager)
    .some((packageManager) => installedPackageManagers.includes(packageManager));
}
export function isAppSupported(
  application: Application,
  currentOs: OperatingSystem,
  installedPackageManagers: PackageManager[],
): boolean {
  return (
    isAppSupportedByOS(application, currentOs) &&
    isAppSupportedByPackageManagers(application, installedPackageManagers)
  );
}
export function allPackageManagersForApllication(application: Application): PackageManager[] {
  return application.installationMethods.map((im) => im.packageManager);
}

export function allInstalledPackageManagersForApllication(
  application: Application,
  installedPackageManagers: PackageManager[],
): PackageManager[] {
  return allPackageManagersForApllication(application).filter((pm) =>
    installedPackageManagers.includes(pm),
  );
}
