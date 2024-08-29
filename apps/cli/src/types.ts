// types.ts

// Enum for supported package managers
export enum PackageManager {
  APT = "apt",
  BREW = "brew",
  NPM = "npm",
  YARN = "yarn",
  PIP = "pip",
}

// Enum for the status of an operation
export enum OperationStatus {
  SUCCESS = "success",
  FAILURE = "failure",
}

// Type for an individual application to be installed
export type App = {
  name: string;
  manager: PackageManager;
};

// Type for a profile containing multiple applications
export type Profile = {
  name: string;
  description: string;
  apps: App[];
};

// Type for an HTTP response from the client
export type HttpResponse = {
  status: OperationStatus;
  message: string;
};
