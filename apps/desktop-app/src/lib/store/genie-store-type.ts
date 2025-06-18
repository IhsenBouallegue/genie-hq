import type { ApplicationsSlice } from "@/lib/store/_slices/applications-slice";
import type { HydrationSlice } from "@/lib/store/_slices/hydration-slice";
import type { InstallationSlice } from "@/lib/store/_slices/installation-slice";
import type { MiseEnvironmentSlice } from "@/lib/store/_slices/mise-environment-slice";
import type { OSSlice } from "@/lib/store/_slices/os-slice";
import type { PackageManagerSlice } from "@/lib/store/_slices/package-manager-slice";
import type { ProfilesSlice } from "@/lib/store/_slices/profiles-slice";

export type GenieStore = ApplicationsSlice &
  HydrationSlice &
  InstallationSlice &
  OSSlice &
  PackageManagerSlice &
  ProfilesSlice &
  MiseEnvironmentSlice;
