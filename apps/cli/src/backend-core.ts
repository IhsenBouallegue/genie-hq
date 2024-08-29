// backend-core.ts

import { execSync } from "node:child_process";
import {
  type App,
  type HttpResponse,
  OperationStatus,
  PackageManager,
  type Profile,
} from "./types";

// Example profiles (in a real scenario, this would likely come from a database or configuration file)
const profiles: Profile[] = [
  {
    name: "web-development",
    description: "Tools for web development",
    apps: [
      { name: "node", manager: PackageManager.BREW },
      { name: "yarn", manager: PackageManager.NPM },
      { name: "vscode", manager: PackageManager.BREW },
    ],
  },
  {
    name: "data-science",
    description: "Tools for data science",
    apps: [
      { name: "python", manager: PackageManager.BREW },
      { name: "pipenv", manager: PackageManager.PIP },
    ],
  },
];

export function getProfiles(): Profile[] {
  return profiles;
}

export function getProfile(name: string): Profile | undefined {
  return profiles.find((profile) => profile.name === name);
}

export function installApp(app: App): HttpResponse {
  const command = getInstallCommand(app);

  try {
    execSync(`sudo ${command}`, { stdio: "inherit" });
    return {
      status: OperationStatus.SUCCESS,
      message: `${app.name} installed successfully.`,
    };
  } catch (error) {
    return {
      status: OperationStatus.FAILURE,
      message: `Failed to install ${app.name}: ${error.message}`,
    };
  }
}

function getInstallCommand(app: App): string {
  switch (app.manager) {
    case PackageManager.APT:
      return `apt-get install -y ${app.name}`;
    case PackageManager.BREW:
      return `brew install ${app.name}`;
    case PackageManager.NPM:
      return `npm install -g ${app.name}`;
    case PackageManager.YARN:
      return `yarn global add ${app.name}`;
    case PackageManager.PIP:
      return `pip install ${app.name}`;
    default:
      throw new Error(`Unsupported package manager: ${app.manager}`);
  }
}
