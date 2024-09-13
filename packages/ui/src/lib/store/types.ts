import type { IconType } from "@icons-pack/react-simple-icons";
import {
  AppWindow,
  AppWindowMac,
  AppleIcon,
  CoffeeIcon,
  IceCreamBowlIcon,
} from "lucide-react";
import { ElementType, ReactElement } from "react";
import type { IconId } from "./icons";

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
  icon: IconId;
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
  tags: Array<{
    type: "cli" | "gui" | "cross-platform" | "official" | "community";
    value: string;
  }>;
  status?: "installed" | "available" | "update-available"; // Optional now
  isSupported?: boolean;
  version?: string; // Optional now
};

// Updated PackageManagerDetails with version and status omitted
export const PackageManagerDetails: Record<PackageManager, PackageManagerInfo> =
  {
    [PackageManager.Homebrew]: {
      name: PackageManager.Homebrew,
      description: "The missing package manager for macOS (or Linux).",
      supportedOS: [OperatingSystem.MacOS],
      icon: CoffeeIcon,
      tags: [{ type: "cli", value: "Command-line Interface" }],
    },
    [PackageManager.Scoop]: {
      name: PackageManager.Scoop,
      description: "A command-line installer for Windows.",
      supportedOS: [OperatingSystem.Windows],
      icon: IceCreamBowlIcon,
      tags: [{ type: "cli", value: "Command-line Interface" }],
    },
    [PackageManager.Winget]: {
      name: PackageManager.Winget,
      description:
        "Windows Package Manager for installing applications on Windows.",
      supportedOS: [OperatingSystem.Windows],
      icon: AppWindow,
      tags: [{ type: "cli", value: "Command-line Interface" }],
    },
    [PackageManager.APT]: {
      name: PackageManager.APT,
      description:
        "Advanced Package Tool, used for managing packages on Debian and its derivatives.",
      supportedOS: [OperatingSystem.Ubuntu, OperatingSystem.Debian],
      icon: AppWindowMac,
      tags: [{ type: "cli", value: "Command-line Interface" }],
    },
    [PackageManager.DNF]: {
      name: PackageManager.DNF,
      description:
        "Fedora Package Manager, the next-generation version of Yum.",
      supportedOS: [OperatingSystem.Fedora],
      icon: AppWindowMac,
      tags: [{ type: "cli", value: "Command-line Interface" }],
    },
  };
export function supportedPackageManagerForOS(
  os: OperatingSystem,
): PackageManager[] {
  return Object.values(PackageManagerDetails)
    .filter((pm) => pm.supportedOS.includes(os))
    .map((pm) => pm.name);
}

export function isSupportedPackageManager(
  pm: PackageManager,
  os: OperatingSystem,
): boolean {
  return supportedPackageManagerForOS(os).includes(pm);
}
