import {
  PackageManager,
  PackageManagerDetails,
} from "@geniehq/ui/lib/store/types";
import { Command } from "@tauri-apps/plugin-shell";
import { executeCommand } from "./logic";

// Function to get the installed version of a package manager
export async function getPackageManagerVersion(
  packageManager: PackageManager,
): Promise<string | undefined> {
  try {
    let command: string[] = [];
    switch (packageManager) {
      case PackageManager.Homebrew:
        command = ["brew", "--version"];
        break;
      case PackageManager.Scoop:
        command = ["scoop", "--version"];
        break;
      case PackageManager.Winget:
        command = ["winget", "--version"];
        break;
      case PackageManager.APT:
        command = ["apt-get", "--version"];
        break;
      case PackageManager.DNF:
        command = ["dnf", "--version"];
        break;
      default:
        throw new Error(`Unsupported package manager: ${packageManager}`);
    }

    const result = await executeCommand(command);

    // Return the first line of the version output
    return result.split("\n")[0];
  } catch (error) {
    // console.log(`Failed to get version for ${packageManager}:`, error);
    console.log(`Failed to get version for ${packageManager}:`);
    return undefined;
  }
}

// Function to check the installation status of the package manager
export async function getPackageManagerStatus(
  packageManager: PackageManager,
): Promise<"installed" | "available" | "update-available"> {
  try {
    // Check if the package manager is installed
    const version = await getPackageManagerVersion(packageManager);

    if (version) {
      // If version exists, it's installed, check if updates are available
      const updateAvailable = await checkForUpdates(packageManager);
      return updateAvailable ? "update-available" : "installed";
    }
    return "available"; // Not installed
  } catch (error) {
    console.error(`Failed to check status for ${packageManager}:`, error);
    return "available"; // Default to "available" if an error occurs
  }
}

// Simulate checking for updates
async function checkForUpdates(
  packageManager: PackageManager,
): Promise<boolean> {
  // Add logic here to determine if updates are available for the package manager
  // For now, we simulate this with a random outcome
  return Math.random() > 0.5;
}

export async function populatePackageManagerDetails() {
  for (const [key, details] of Object.entries(PackageManagerDetails)) {
    const packageManager = key as PackageManager;

    // Get the version and status asynchronously
    const version = await getPackageManagerVersion(packageManager);
    const status = await getPackageManagerStatus(packageManager);

    // Update the details with the fetched version and status
    details.version = version || "Not Installed";
    details.status = status;
  }

  console.log(PackageManagerDetails); // Now has populated version and status
}
