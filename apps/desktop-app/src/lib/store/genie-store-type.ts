import type { ApplicationsSlice } from "@/lib/store/_slices/applications-slice";
import type { HydrationSlice } from "@/lib/store/_slices/hydration-slice";
import type { InstallationSlice } from "@/lib/store/_slices/installation-slice";
import type { OSSlice } from "@/lib/store/_slices/os-slice";
import type { PackageManagerSlice } from "@/lib/store/_slices/package-manager-slice";
import type { ProfilesSlice } from "@/lib/store/_slices/profiles-slice";

export interface GenieStore
  extends ProfilesSlice,
    ApplicationsSlice,
    PackageManagerSlice,
    OSSlice,
    HydrationSlice,
    InstallationSlice {}
