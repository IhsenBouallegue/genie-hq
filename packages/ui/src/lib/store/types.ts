import type { IconType } from "@icons-pack/react-simple-icons";

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
  Homebrew = "Homebrew", // MacOS
  Scoop = "Scoop", // Windows (Alternative)
  Winget = "Winget", // Windows (Primary)
  APT = "APT", // Debian, Ubuntu
  DNF = "DNF", // Fedora
}

export interface InstallationMethod {
  os: OperatingSystem;
  packageManager: PackageManager;
  installCommand: string;
}
