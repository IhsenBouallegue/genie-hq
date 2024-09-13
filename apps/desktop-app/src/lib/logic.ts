import {
  type Application,
  OperatingSystem,
  PackageManager,
} from "@geniehq/ui/lib/store/types";
import { platform } from "@tauri-apps/plugin-os";
import { Command } from "@tauri-apps/plugin-shell";
import { useInstallationStore } from "./store/useInstallationStore";

export async function handleSequentialInstallations(
  applications: Application[],
  packageManager: PackageManager,
): Promise<void> {
  const installStore = useInstallationStore.getState(); // Access the installation store

  for (const application of applications) {
    try {
      const command = await getInstallationCommand(application, packageManager);

      // If in development mode, simulate installation
      const output =
        process.env.NODE_ENV === "development"
          ? await fakeExecuteCommand(command)
          : await executeCommand(command);

      console.log(`Installation successful for ${application.title}:`, output);

      // Mark as completed
      installStore.markAppAsCompleted(application.id);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Installation failed for ${application.title}:`, error);
        // Mark as failed
        installStore.markAppAsFailed(application.id, error.message);
      } else {
        console.error("Installation failed due to an unknown error:", error);
        installStore.markAppAsFailed(application.id, "Unknown error");
      }
    }

    // Update the progress in the UI
    installStore.updateProgress();
  }

  // Finish the installation process
  installStore.finishInstallation();
}

// Real command execution
export async function executeCommand(command: string[]): Promise<string> {
  console.log(`Executing command: ${command.join(" ")}`);
  if (command[0] === "" || command.length === 0 || command[0] === undefined) {
    throw new Error("Command is empty");
  }

  const osType = await detectOSType();
  let cmd: Command<string>;

  if (osType === OperatingSystem.Windows) {
    // Use PowerShell for Windows
    cmd = Command.create("powershell", ["-Command", command.join(" ")]);
  } else {
    // Use sh for Linux-based systems (macOS and Ubuntu)
    cmd = Command.create("sh", ["-c", command.join(" ")]);
  }

  try {
    const result = await cmd.execute();
    return result.stdout; // assuming stdout is the desired output
  } catch (err) {
    throw new Error(`Command failed: ${err}`);
  }
}

// Fake command execution for development
async function fakeExecuteCommand(command: string[]): Promise<string> {
  console.log(`Simulating execution of command: ${command.join(" ")}`);
  return new Promise((resolve, reject) => {
    // Simulate a delay (e.g., 1 second)
    setTimeout(() => {
      // Random success or failure
      if (Math.random() > 0.2) {
        resolve("Simulated installation successful");
      } else {
        reject(new Error("Simulated installation failed"));
      }
    }, 2000);
  });
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
