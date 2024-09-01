"use client"

import SetupConfiguratorAccordion from "@/components/setup-configurator";
import { Button } from "@geniehq/ui/components/button";
import { Command } from "@tauri-apps/plugin-shell";
import Image from "next/image";
import type React from "react";
export default function Home() {
  // Function to determine the correct install command based on the OS
  const getInstallCommand = (): string[] => {
    const platform = window.navigator.platform;

    switch (platform) {
      case "Linux x86_64":
        return ["-c", "sudo apt-get install -y packageName"];
      case "MacIntel":
        return ["-c", "brew install packageName"];
      case "Win32":
        return ["-c", "scoop install 7zip"];
      default:
        throw new Error("Unsupported platform");
    }
  };

  // Function to handle the installation process
  const handleInstall = async () => {
    try {
      const args = getInstallCommand(); // Get the command arguments based on the OS
      const command = Command.create("exec-sh", args); // Use the shell command defined in main.json

      const output = await command.execute(); // Execute the command and capture the output

      console.log("Install Output:", output.stdout);

      if (output.code === 0) {
        alert("Installation successful");
      } else {
        alert(`Installation failed: ${output.stderr}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error running install command:", error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h1>Install Application</h1>
      <Image src="/next.svg" alt="App Icon" width={100} height={100} />
      <Button onClick={handleInstall}>Install Package</Button>
      <SetupConfiguratorAccordion />
    </div>
  );
}
