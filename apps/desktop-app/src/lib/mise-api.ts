import { OperatingSystem } from "@geniehq/ui/lib/store/types";
import { detectOSType } from "./logic";

// Type definitions following the guide
export interface ToolVersion {
  version: string;
  requested_version?: string;
  install_path?: string;
  source?: {
    type: string;
    path: string;
  };
  symlinked_to?: string;
  installed: boolean;
  active: boolean;
  isInstalling?: boolean;
}

export interface InstalledTool {
  name: string;
  versions: ToolVersion[];
}

export interface MiseListResponse {
  [toolName: string]: ToolVersion[];
}

export interface RegistryTool {
  name: string;
  backend: string;
  shortName?: string;
  fullName?: string;
}

export interface CommandResult {
  success: boolean;
  stdout: string;
  stderr: string;
}

// Helper functions
async function executeMiseCommand(args: string[]): Promise<{ stdout: string; stderr: string }> {
  try {
    // For now, use the existing executeCommand from logic.ts
    // In the future, this could be updated to use Tauri's Command.sidecar
    const { executeCommand } = await import("./logic");
    const result = await executeCommand(["mise", ...args]);
    return {
      stdout: result.stdout || "",
      stderr: result.stderr || "",
    };
  } catch (error) {
    console.error("💥 MiseAPI: Command execution failed:", error);
    throw error;
  }
}

async function executeSystemCommand(args: string[]): Promise<CommandResult> {
  try {
    const { executeCommand } = await import("./logic");
    const result = await executeCommand(args);

    return {
      success: !result.stderr,
      stdout: result.stdout || "",
      stderr: result.stderr || "",
    };
  } catch (error) {
    console.error("💥 MiseAPI: System command execution failed:", error);
    throw error;
  }
}

// Core functionality methods
export async function checkMiseInstalled(): Promise<boolean> {
  console.log("🔍 MiseAPI: Checking mise availability...");

  try {
    const { stdout, stderr } = await executeMiseCommand(["--version"]);
    const isInstalled = stderr ? false : Boolean(stdout?.trim());

    if (isInstalled) {
      console.log("✅ MiseAPI: mise is available");
    } else {
      console.log("❌ MiseAPI: mise is not available");
    }

    return isInstalled;
  } catch (error) {
    console.error("💥 MiseAPI: mise check failed:", error);
    return false;
  }
}

export async function installMise(): Promise<CommandResult> {
  console.log("🔽 MiseAPI: Installing mise...");

  try {
    const osType = await detectOSType();
    let command: string[];

    switch (osType) {
      case OperatingSystem.Windows:
        command = ["winget", "install", "--id", "jdxcode.mise", "--source", "winget", "--silent"];
        break;

      case OperatingSystem.MacOS:
      case OperatingSystem.Ubuntu:
        command = ["sh", "-c", "curl -fsSL https://mise.jdx.dev/install.sh | sh"];
        break;

      default:
        throw new Error("Unsupported operating system");
    }

    const result = await executeSystemCommand(command);

    if (result.success) {
      console.log("✅ MiseAPI: mise installed successfully");
    } else {
      console.error("❌ MiseAPI: mise installation failed:", result.stderr);
    }

    return result;
  } catch (error) {
    console.error("💥 MiseAPI: mise installation error:", error);
    throw error;
  }
}

export async function listInstalledTools(): Promise<InstalledTool[]> {
  console.log("📋 MiseAPI: Listing installed tools...");

  try {
    const { stdout, stderr } = await executeMiseCommand(["ls", "--json"]);

    if (stderr) {
      throw new Error(`Command failed: ${stderr}`);
    }

    if (!stdout?.trim()) {
      console.log("📋 MiseAPI: No tools installed");
      return [];
    }

    // Parse mise's JSON output format
    const data: MiseListResponse = JSON.parse(stdout);

    // Transform mise format to our internal format
    const tools: InstalledTool[] = Object.entries(data).map(([name, versions]) => ({
      name,
      versions: versions.map((version) => ({
        ...version,
        isInstalling: false,
      })),
    }));

    console.log(`📋 MiseAPI: Found ${tools.length} installed tools`);
    return tools;
  } catch (error) {
    console.error("💥 MiseAPI: Error listing tools:", error);
    throw error;
  }
}

export async function listAvailableVersions(tool: string): Promise<ToolVersion[]> {
  console.log(`📋 MiseAPI: Listing available versions for ${tool}...`);

  try {
    const { stdout, stderr } = await executeMiseCommand(["ls-remote", tool]);

    if (stderr) {
      throw new Error(`Command failed: ${stderr}`);
    }

    if (!stdout?.trim()) {
      return [];
    }

    // Parse version list and convert to ToolVersion format
    const versions: ToolVersion[] = stdout
      .split("\n")
      .filter((line): line is string => typeof line === "string" && line.length > 0)
      .map((line) => line.trim())
      .filter((version): version is string => version.length > 0)
      .map((version) => ({
        version,
        installed: false,
        active: false,
        isInstalling: false,
      }));

    console.log(`📋 MiseAPI: Found ${versions.length} available versions for ${tool}`);
    return versions;
  } catch (error) {
    console.error(`💥 MiseAPI: Error listing versions for ${tool}:`, error);
    throw error;
  }
}

export async function installVersion(tool: string, version: string): Promise<CommandResult> {
  console.log(`🔽 MiseAPI: Installing ${tool}@${version}...`);

  try {
    const result = await executeMiseCommand(["install", `${tool}@${version}`]);

    console.log(`📦 MiseAPI: Install result for ${tool}@${version}:`, result);

    const success = !result.stderr;
    if (success) {
      console.log(`✅ MiseAPI: Successfully installed ${tool}@${version}`);
    } else {
      console.error(`❌ MiseAPI: Failed to install ${tool}@${version}:`, result.stderr);
    }

    return {
      success,
      stdout: result.stdout,
      stderr: result.stderr,
    };
  } catch (error) {
    console.error(`💥 MiseAPI: Error installing ${tool}@${version}:`, error);
    throw error;
  }
}

export async function useVersion(
  tool: string,
  version: string,
  global = false,
): Promise<CommandResult> {
  console.log(
    `🔧 MiseAPI: Setting ${tool}@${version} as ${global ? "global" : "local"} default...`,
  );

  try {
    const args = global ? ["use", "--global", `${tool}@${version}`] : ["use", `${tool}@${version}`];
    const result = await executeMiseCommand(args);

    const success = !result.stderr;
    if (success) {
      console.log(
        `✅ MiseAPI: Successfully set ${tool}@${version} as ${global ? "global" : "local"} default`,
      );
    } else {
      console.error(`❌ MiseAPI: Failed to set ${tool}@${version} as default:`, result.stderr);
    }

    return {
      success,
      stdout: result.stdout,
      stderr: result.stderr,
    };
  } catch (error) {
    console.error(`💥 MiseAPI: Error setting ${tool}@${version} as default:`, error);
    throw error;
  }
}

export async function uninstallVersion(tool: string, version: string): Promise<CommandResult> {
  console.log(`🗑️ MiseAPI: Uninstalling ${tool}@${version}...`);

  try {
    const result = await executeMiseCommand(["uninstall", `${tool}@${version}`]);

    const success = !result.stderr;
    if (success) {
      console.log(`✅ MiseAPI: Successfully uninstalled ${tool}@${version}`);
    } else {
      console.error(`❌ MiseAPI: Failed to uninstall ${tool}@${version}:`, result.stderr);
    }

    return {
      success,
      stdout: result.stdout,
      stderr: result.stderr,
    };
  } catch (error) {
    console.error(`💥 MiseAPI: Error uninstalling ${tool}@${version}:`, error);
    throw error;
  }
}

// Plugin management
export async function listPlugins(): Promise<string[]> {
  console.log("🔌 MiseAPI: Listing plugins...");

  try {
    const { stdout, stderr } = await executeMiseCommand(["plugins", "ls"]);

    if (stderr) {
      throw new Error(`Command failed: ${stderr}`);
    }

    if (!stdout?.trim()) {
      return [];
    }

    const plugins = stdout
      .split("\n")
      .filter((line): line is string => typeof line === "string" && line.length > 0)
      .map((line) => line.trim())
      .filter((plugin): plugin is string => plugin.length > 0);

    console.log(`🔌 MiseAPI: Found ${plugins.length} plugins`);
    return plugins;
  } catch (error) {
    console.error("💥 MiseAPI: Error listing plugins:", error);
    throw error;
  }
}

export async function installPlugin(pluginName: string): Promise<CommandResult> {
  console.log(`🔌 MiseAPI: Installing plugin ${pluginName}...`);

  try {
    const result = await executeMiseCommand(["plugins", "install", pluginName]);

    const success = !result.stderr;
    if (success) {
      console.log(`✅ MiseAPI: Successfully installed plugin ${pluginName}`);
    } else {
      console.error(`❌ MiseAPI: Failed to install plugin ${pluginName}:`, result.stderr);
    }

    return {
      success,
      stdout: result.stdout,
      stderr: result.stderr,
    };
  } catch (error) {
    console.error(`💥 MiseAPI: Error installing plugin ${pluginName}:`, error);
    throw error;
  }
}

// Registry integration (experimental)
export async function listRegistry(): Promise<RegistryTool[]> {
  console.log("🌐 MiseAPI: Listing registry tools...");

  try {
    const { stdout, stderr } = await executeMiseCommand(["registry"]);

    if (stderr) {
      console.warn("🌐 MiseAPI: Registry command failed (experimental feature):", stderr);
      return [];
    }

    if (!stdout?.trim()) {
      return [];
    }

    // Parse text output format: "tool_name    backend:source"
    const tools: RegistryTool[] = [];

    const lines = stdout
      .trim()
      .split("\n")
      .filter((line): line is string => typeof line === "string" && line.length > 0);

    for (const line of lines) {
      const parts = line.trim().split(/\s+/);
      const name = parts[0];
      const backend = parts[1] || "unknown";

      // Only include tools with valid names
      if (name) {
        tools.push({
          name,
          backend,
          shortName: name,
          fullName: backend,
        });
      }
    }

    console.log(`🌐 MiseAPI: Found ${tools.length} registry tools`);
    return tools;
  } catch (error) {
    console.error("💥 MiseAPI: Error listing registry:", error);
    return []; // Graceful fallback for experimental feature
  }
}

export async function installTool(toolName: string): Promise<CommandResult> {
  console.log(`🔧 MiseAPI: Installing tool ${toolName}...`);

  try {
    // For registry tools, we use 'use' command with '@latest'
    // This automatically installs if not present
    const result = await executeMiseCommand(["use", "--global", `${toolName}@latest`]);

    const success = !result.stderr;
    if (success) {
      console.log(`✅ MiseAPI: Successfully installed tool ${toolName}`);
    } else {
      console.error(`❌ MiseAPI: Failed to install tool ${toolName}:`, result.stderr);
    }

    return {
      success,
      stdout: result.stdout,
      stderr: result.stderr,
    };
  } catch (error) {
    console.error(`💥 MiseAPI: Error installing tool ${toolName}:`, error);
    throw error;
  }
}
