import {
  type Application,
  OperatingSystem,
  PackageManager,
} from "@geniehq/ui/lib/store/types";
import { platform } from "@tauri-apps/plugin-os";
import { Command } from "@tauri-apps/plugin-shell";
export async function handleSequentialInstallations(
  applications: Application[],
  packageManager: PackageManager,
): Promise<void> {
  for (const application of applications) {
    try {
      const command = await getInstallationCommand(application, packageManager);
      const output = await executeCommand(command);
      console.log(`Installation successful for ${application.title}:`, output);
      alert(`Installation successful for ${application.title}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Installation failed for ${application.title}:`, error);
        alert(`Installation failed for ${application.title}: ${error.message}`);
      } else {
        console.error("Installation failed due to an unknown error:", error);
        alert("Installation failed due to an unknown error.");
      }
    }
  }
}

async function executeCommand(command: string[]): Promise<string> {
  console.log(`Executing command: ${command.join(" ")}`);
  if (command[0] === "" || command.length === 0 || command[0] === undefined) {
    throw new Error("Command is empty");
  }
  const cmd = Command.create(command[0], command.slice(1));

  try {
    const result = await cmd.execute();
    return result.stdout; // assuming stdout is the desired output
  } catch (err) {
    throw new Error(`Command failed: ${err}`);
  }
}

async function getInstallationCommand(
  application: Application,
  packageManager: PackageManager,
): Promise<string[]> {
  const osType = await detectOSType();
  const availableInstallationMethod = application.installationMethods.filter(
    (method) => method.os === osType,
  );
  const preferredInstallationMethod = availableInstallationMethod.find(
    (installationMethod) =>
      installationMethod.packageManager === packageManager,
  );

  if (!preferredInstallationMethod) {
    throw new Error(
      `No installation method found for ${application.title} on this OS`,
    );
  }

  switch (preferredInstallationMethod.packageManager) {
    case PackageManager.Homebrew:
      return [
        "brew",
        "install",
        "--cask",
        preferredInstallationMethod.packageId,
      ];
    case PackageManager.Scoop:
      return ["scoop", "install", preferredInstallationMethod.packageId];
    case PackageManager.Winget:
      return [
        "winget",
        "install",
        "--id",
        preferredInstallationMethod.packageId,
        "--silent",
        "--exact",
        "--source",
        "winget",
      ];
    case PackageManager.APT:
      return [
        "sudo",
        "apt-get",
        "install",
        "-y",
        preferredInstallationMethod.packageId,
      ];
    default:
      throw new Error(
        `Unsupported package manager: ${preferredInstallationMethod.packageManager}`,
      );
  }
}

export async function detectOSType(): Promise<OperatingSystem> {
  const currentPlatform = await platform();
  if (currentPlatform === "windows") return OperatingSystem.Windows;
  if (currentPlatform === "macos") return OperatingSystem.MacOS;
  if (currentPlatform === "linux") return OperatingSystem.Ubuntu;

  throw new Error("Unsupported operating system");
}
