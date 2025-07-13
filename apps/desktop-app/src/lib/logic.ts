import { type Application, OperatingSystem, PackageManager } from "@geniehq/ui/lib/store/types";
import { platform } from "@tauri-apps/plugin-os";
import { Command } from "@tauri-apps/plugin-shell";

export async function handleSequentialInstallations(
  applications: Application[],
  packageManager: PackageManager,
  markAppAsCompleted: (id: string, stderr: string) => void,
  markAppAsFailed: (id: string, stderr: string) => void,
  updateProgress: () => void,
  finishInstallation: () => void,
): Promise<void> {
  for (const application of applications) {
    const command = await getInstallationCommand(application, packageManager);

    const executionCommad =
      process.env.NODE_ENV === "development"
        ? fakeExecuteCommand(command)
        : executeCommand(command);

    await executionCommad
      .then((result) => {
        if (result.stdout) {
          console.log(`Installation successful for ${application.title}:`, result);
          markAppAsCompleted(application.id, result.stdout || "");
        } else if (result.stderr) {
          console.error(`Installation failed for ${application.title}:`, result);
          markAppAsFailed(application.id, result.stderr);
        }
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.error(`Installation failed for ${application.title}:`, error);
          markAppAsFailed(application.id, error.message);
        } else {
          console.error("Installation failed due to an unknown error:", error);
          markAppAsFailed(application.id, "Unknown error");
        }
      })
      .finally(() => {
        updateProgress();
      });
  }

  finishInstallation();
}

// Real command execution
export async function executeCommand(
  command: string[],
): Promise<{ stdout?: string; stderr?: string }> {
  return new Promise((resolve, _reject) => {
    detectOSType().then((osType) => {
      let cmd: Command<string>;

      if (osType === OperatingSystem.Windows) {
        // Use PowerShell for Windows
        cmd = Command.create("cmd", ["/C", command.join(" ")]);
      } else {
        // Use sh for Linux-based systems (macOS and Ubuntu)
        cmd = Command.create("sh", ["-c", command.join(" ")]);
      }
      cmd.execute().then((result) => {
        if (result.code !== 0 && result.stderr) {
          resolve({ stderr: result.stderr });
        }
        resolve({ stdout: result.stdout });
      });
    });
  });
}

// Fake command execution for development
async function fakeExecuteCommand(
  command: string[],
): Promise<{ stdout?: string; stderr?: string }> {
  console.log(`Simulating execution of command: ${command.join(" ")}`);
  return new Promise((resolve) => {
    // Simulate a delay (e.g., 1 second)
    setTimeout(() => {
      // Random success or failure
      if (Math.random() > 0.2) {
        resolve({ stdout: "Simulated installation successful" });
      } else {
        resolve({ stderr: "Simulated installation failed" });
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
    (installationMethod) => installationMethod.packageManager === packageManager,
  );

  if (!preferredInstallationMethod) {
    throw new Error(`No installation method found for ${application.title} on this OS`);
  }

  switch (preferredInstallationMethod.packageManager) {
    case PackageManager.Homebrew:
      return ["brew", "install", "--cask", preferredInstallationMethod.packageId];
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
      return ["sudo", "apt-get", "install", "-y", preferredInstallationMethod.packageId];
    default:
      throw new Error(`Unsupported package manager: ${preferredInstallationMethod.packageManager}`);
  }
}

export async function detectOSType(): Promise<OperatingSystem> {
  const currentPlatform = await platform();
  if (currentPlatform === "windows") return OperatingSystem.Windows;
  if (currentPlatform === "macos") return OperatingSystem.MacOS;
  if (currentPlatform === "linux") return OperatingSystem.Ubuntu;

  throw new Error("Unsupported operating system");
}
