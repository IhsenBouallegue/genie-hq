import type { IconType } from "@icons-pack/react-simple-icons";
import { AppWindow, AppWindowMac, AppleIcon, CoffeeIcon } from "lucide-react";

export type ApplicationId = string;
export type ProfileId = string;

export interface Profile {
  id: ProfileId;
  title: string;
  image: string;
  relevantApplications: ApplicationId[];
}

export interface Application {
  id: ApplicationId;
  title: string;
  icon: IconType;
  category: Category;
  installationMethods: InstallationMethod[];
}

export interface InstallationMethod {
  os: OperatingSystem;
  packageManager: PackageManager;
  packageId: string;
}

export enum Category {
  Browser = "Browser",
  Code = "Code",
  Data = "Data",
  Design = "Design",
  Communication = "Communication",
  Miscellaneous = "Miscellaneous",
}

export enum OperatingSystem {
  Windows = "Windows",
  MacOS = "MacOS",
  Ubuntu = "Ubuntu",
  Fedora = "Fedora",
  Debian = "Debian",
}

// Define the enum for package manager names
export enum PackageManager {
  Homebrew = "Homebrew",
  Scoop = "Scoop",
  Winget = "Winget",
  APT = "APT",
  DNF = "DNF",
}

// Define a type for package manager details
export type PackageManagerInfo = {
  name: PackageManager;
  description: string;
  supportedOS: OperatingSystem[];
  icon: IconType;
};

// Define the map that associates enum values with detailed information
export const PackageManagerDetails: Record<PackageManager, PackageManagerInfo> =
  {
    [PackageManager.Homebrew]: {
      name: PackageManager.Homebrew,
      description: "The missing package manager for macOS (or Linux).",
      supportedOS: [OperatingSystem.MacOS],
      icon: CoffeeIcon,
    },
    [PackageManager.Scoop]: {
      name: PackageManager.Scoop,
      description: "A command-line installer for Windows.",
      supportedOS: [OperatingSystem.Windows],
      icon: AppleIcon,
    },
    [PackageManager.Winget]: {
      name: PackageManager.Winget,
      description:
        "Windows Package Manager for installing applications on Windows.",
      supportedOS: [OperatingSystem.Windows],
      icon: AppWindow,
    },
    [PackageManager.APT]: {
      name: PackageManager.APT,
      description:
        "Advanced Package Tool, used for managing packages on Debian and its derivatives.",
      supportedOS: [OperatingSystem.Ubuntu, OperatingSystem.Debian],
      icon: AppWindowMac,
    },
    [PackageManager.DNF]: {
      name: PackageManager.DNF,
      description:
        "Fedora Package Manager, the next-generation version of Yum.",
      supportedOS: [OperatingSystem.Fedora],
      icon: AppWindowMac,
    },
  };

export function supportedPackageManagerForOS(
  os: OperatingSystem,
): PackageManager[] {
  return Object.values(PackageManagerDetails)
    .filter((pm) => pm.supportedOS.includes(os))
    .map((pm) => pm.name);
}
