import {
  PackageManager,
  type PackageManagerInfo,
  isSupportedPackageManager,
} from "@geniehq/ui/lib/store/types";
import { detectOSType, executeCommand } from "./logic";

// Function to check the installation status of the package manager
export async function getPackageManagerStatus(
  packageManager: PackageManager,
  version: string | undefined,
): Promise<"installed" | "available" | "update-available"> {
  try {
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
async function checkForUpdates(_packageManager: PackageManager): Promise<boolean> {
  // Add logic here to determine if updates are available for the package manager
  // For now, we simulate this with a random outcome
  return Math.random() > 0.5;
}

function parseScoopVersion(output: string): string {
  if (typeof output !== "string" || output.trim() === "") {
    throw new Error("Invalid input: output must be a non-empty string.");
  }

  const versionRegex = /Bump to version (\d+\.\d+\.\d+)/;
  const match = output.match(versionRegex);

  if (match?.[1]) {
    return match[1];
  }
  throw new Error("Failed to parse Scoop version from output.");
}

// Parser for Winget version
function parseWingetVersion(output: string): string {
  // Input validation
  if (typeof output !== "string" || output.trim() === "") {
    throw new Error("Invalid input: output must be a non-empty string.");
  }

  // Winget version output is 'vX.Y.Z' or 'vX.Y.Z.W'; extract the version number
  const versionRegex = /^v?(\d+\.\d+\.\d+(?:\.\d+)?)$/;
  const trimmedOutput = output.trim();
  const match = trimmedOutput.match(versionRegex);

  if (match?.[1]) {
    return match[1];
  }
  throw new Error("Failed to parse Winget version from output.");
}

function parseHomebrewVersion(output: string): string {
  if (typeof output !== "string" || output.trim() === "") {
    throw new Error("Invalid input: output must be a non-empty string.");
  }
  const versionRegex = /^Homebrew\s+(\d+\.\d+\.\d+)/m;
  const match = output.match(versionRegex);
  if (match?.[1]) {
    return match[1];
  }
  throw new Error("Failed to parse Homebrew version from output.");
}

function parseAptVersion(output: string): string {
  if (typeof output !== "string" || output.trim() === "") {
    throw new Error("Invalid input: output must be a non-empty string.");
  }
  const versionRegex = /^apt\s+(\d+\.\d+\.\d+)/m;
  const match = output.match(versionRegex);
  if (match?.[1]) {
    return match[1];
  }
  throw new Error("Failed to parse APT version from output.");
}

function parseDnfVersion(output: string): string {
  if (typeof output !== "string" || output.trim() === "") {
    throw new Error("Invalid input: output must be a non-empty string.");
  }
  const versionRegex = /DNF\s+version\s+(\d+\.\d+\.\d+)/i;
  const match = output.match(versionRegex);
  if (match?.[1]) {
    return match[1];
  }
  throw new Error("Failed to parse DNF version from output.");
}

export async function getPackageManagerInfo(packageManager: PackageManager): Promise<{
  version: string | undefined;
  status: "installed" | "available" | "update-available" | "unsupported";
}> {
  try {
    const os = await detectOSType();
    if (!isSupportedPackageManager(packageManager, os)) {
      console.log(`Package manager ${packageManager} is not supported on ${os}.`);
      return { version: undefined, status: "unsupported" };
    }

    let command: string[] = [];
    let parseVersion: (output: string) => string;

    switch (packageManager) {
      case PackageManager.Homebrew:
        command = ["brew", "--version"];
        parseVersion = parseHomebrewVersion;
        break;
      case PackageManager.Scoop:
        command = ["scoop", "--version"];
        parseVersion = parseScoopVersion;
        break;
      case PackageManager.Winget:
        command = ["winget", "--version"];
        parseVersion = parseWingetVersion;
        break;
      case PackageManager.APT:
        command = ["apt-get", "--version"];
        parseVersion = parseAptVersion;
        break;
      case PackageManager.DNF:
        command = ["dnf", "--version"];
        parseVersion = parseDnfVersion;
        break;
      default:
        throw new Error(`Unsupported package manager: ${packageManager}`);
    }

    const output = await executeCommand(command);
    if (output.stderr || !output.stdout) {
      throw new Error(output.stderr);
    }

    console.log(`Output for ${packageManager}:`, output.stdout);

    const version = parseVersion(output.stdout);
    console.log(`Version for ${packageManager}:`, version);

    const updateAvailable = await checkForUpdates(packageManager);
    const status = updateAvailable ? "update-available" : "installed";

    return { version, status };
  } catch (error) {
    console.error(`Failed to get information for ${packageManager}:`, error);
    if (error instanceof Error) {
      if (error.message.includes("command not found") || error.message.includes("not recognized")) {
        return { version: undefined, status: "unsupported" };
      }

      return { version: undefined, status: "available" };
    }
    return { version: undefined, status: "unsupported" };
  }
}

export function getSupportedPackageManagers(packageManagers: PackageManagerInfo[]) {
  return packageManagers.filter((pm) => pm.status !== "unsupported");
}
