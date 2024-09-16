"use client";

import { getSupportedPackageManagers } from "@/lib/pm-logic";
import { isProfileSupported } from "@/lib/profile-logic";
import { useSort } from "@/lib/sorting"; // Import the sorting hook
import { useGenieStore } from "@/providers/genie-store-provider";
import { Button } from "@geniehq/ui/components/button";
import { Input } from "@geniehq/ui/components/input";
import type { Profile } from "@geniehq/ui/lib/store/types";
import { Search, SortAsc, SortDesc, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import ProfileFullCard from "./profile-full-card";

export default function Page() {
  const profiles = useGenieStore((state) => state.profiles);
  const applications = useGenieStore((state) => state.applications);
  const currentOS = useGenieStore((state) => state.currentOS);
  const supportedPackageManagers = useGenieStore((state) => state.supportedPackageManagers);

  const [searchTerm, setSearchTerm] = useState("");
  const isSupported = useMemo(
    () => (profile: Profile) =>
      isProfileSupported(profile, applications, currentOS, supportedPackageManagers()),
    [applications, currentOS, supportedPackageManagers],
  );
  // Use the generalized useSort hook with default sorting by title
  const {
    sortedItems: sortedProfiles,
    sortConfigs,
    updateSort,
  } = useSort(Object.values(profiles), [{ key: isSupported, direction: "desc" }]);

  // Filter the profiles based on the search term
  const filteredProfiles = sortedProfiles.filter((profile) =>
    profile.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Profiles</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        <Button variant="outline" onClick={() => updateSort(isSupported)}>
          Sort by Support{" "}
          {sortConfigs.find((config) => config.key === isSupported)?.direction === "asc" ? (
            <SortAsc className="ml-2" />
          ) : (
            <SortDesc className="ml-2" />
          )}
        </Button>

        <Button variant="outline" onClick={() => updateSort("title")}>
          Sort by Name{" "}
          {sortConfigs.find((config) => config.key === "title")?.direction === "asc" ? (
            <SortAsc className="ml-2" />
          ) : (
            <SortDesc className="ml-2" />
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProfiles.map((profile) => (
          <ProfileFullCard key={profile.id} profile={profile} />
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="text-center py-8">
          <XCircle className="w-12 h-12 mx-auto text-muted-foreground" />
          <p className="mt-2 text-lg font-medium">No profiles found</p>
        </div>
      )}
    </div>
  );
}
