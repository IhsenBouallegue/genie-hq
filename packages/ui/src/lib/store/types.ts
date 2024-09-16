import type { IconType } from "@icons-pack/react-simple-icons";
import {
  AppWindow,
  AppWindowIcon,
  AppWindowMac,
  AppleIcon,
  BoxIcon,
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

export enum PackageManager {
  Homebrew = "Homebrew",
  Scoop = "Scoop",
  Winget = "Winget",
  APT = "APT",
  DNF = "DNF",
}

export type PackageManagerInfo = {
  name: PackageManager;
  description: string;
  supportedOS: OperatingSystem[];
  icon: IconType;
  tags: Array<{
    type: "Cross Platform" | "Official" | "Community";
    icon: string; // Lucide icon name
    value: string;
  }>;
  status?: "installed" | "available" | "update-available" | "unsupported";
  version?: string;
};

export const PackageManagerDetails: Record<PackageManager, PackageManagerInfo> = {
  [PackageManager.Homebrew]: {
    name: PackageManager.Homebrew,
    description: "The missing package manager for macOS (or Linux).",
    supportedOS: [OperatingSystem.MacOS],
    icon: CoffeeIcon,
    tags: [
      {
        type: "Official",
        icon: "check-circle",
        value: "Official macOS package manager",
      },
      {
        type: "Cross Platform",
        icon: "globe",
        value: "macOS and Linux support",
      },
    ],
  },
  [PackageManager.Scoop]: {
    name: PackageManager.Scoop,
    description: "A command-line installer for Windows.",
    supportedOS: [OperatingSystem.Windows],
    icon: IceCreamBowlIcon,
    tags: [
      {
        type: "Community",
        icon: "users",
        value: "Community-driven Windows package manager",
      },
    ],
  },
  [PackageManager.Winget]: {
    name: PackageManager.Winget,
    description: "Windows Package Manager for installing applications on Windows.",
    supportedOS: [OperatingSystem.Windows],
    icon: AppWindowIcon,
    tags: [
      {
        type: "Official",
        icon: "check-circle",
        value: "Official Windows package manager",
      },
    ],
  },
  [PackageManager.APT]: {
    name: PackageManager.APT,
    description: "Advanced Package Tool, used for managing packages on Debian and its derivatives.",
    supportedOS: [OperatingSystem.Ubuntu, OperatingSystem.Debian],
    icon: BoxIcon,
    tags: [
      {
        type: "Official",
        icon: "check-circle",
        value: "Official Debian-based package manager",
      },
      {
        type: "Cross Platform",
        icon: "globe",
        value: "Supports Ubuntu and Debian",
      },
    ],
  },
  [PackageManager.DNF]: {
    name: PackageManager.DNF,
    description: "Fedora Package Manager, the next-generation version of Yum.",
    supportedOS: [OperatingSystem.Fedora],
    icon: BoxIcon,
    tags: [
      {
        type: "Official",
        icon: "check-circle",
        value: "Official Fedora package manager",
      },
    ],
  },
};
export function supportedPackageManagerForOS(os: OperatingSystem): PackageManager[] {
  return Object.values(PackageManagerDetails)
    .filter((pm) => pm.supportedOS.includes(os))
    .map((pm) => pm.name);
}

export function isSupportedPackageManager(pm: PackageManager, os: OperatingSystem): boolean {
  return supportedPackageManagerForOS(os).includes(pm);
}
