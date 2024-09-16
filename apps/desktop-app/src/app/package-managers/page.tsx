"use client";

import { useSort } from "@/lib/sorting"; // The generalized sorting hook
import { useGenieStore } from "@/providers/genie-store-provider"; // Access Genie Store
import { Button } from "@geniehq/ui/components/button";
import { Input } from "@geniehq/ui/components/input";
import type { PackageManagerInfo } from "@geniehq/ui/lib/store/types";
import { Search, SortAsc, SortDesc, XCircle } from "lucide-react";
import { useState } from "react";
import PackageManagerFullCard from "./package-manager-full-card";

// Function to compute isSupported based on status

const isSupported = (pm: PackageManagerInfo) => pm.status !== "unsupported";
export default function Page() {
  const packageManagersDetails = useGenieStore((state) => state.packageManagers);
  const [searchTerm, setSearchTerm] = useState("");

  // Use the generalized useSort hook with default sorting by name
  const {
    sortedItems: sortedPackageManagers,
    sortConfigs,
    updateSort,
  } = useSort<PackageManagerInfo>(Object.values(packageManagersDetails), [
    { key: isSupported, direction: "desc" },
  ]);

  // Filter the package managers based on the search term
  const filteredPackageManagers = sortedPackageManagers.filter((pm) =>
    pm.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Package Managers</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search package managers..."
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
        {/* Buttons to toggle sorting by different criteria */}
        <Button variant="outline" onClick={() => updateSort("name")}>
          Sort by Name{" "}
          {sortConfigs.find((config) => config.key === "name")?.direction === "asc" ? (
            <SortAsc className="ml-2" />
          ) : (
            <SortDesc className="ml-2" />
          )}
        </Button>
      </div>

      {/* Display sorted and filtered package managers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPackageManagers.map((pm) => (
          <PackageManagerFullCard key={pm.name} pm={pm} />
        ))}
      </div>

      {filteredPackageManagers.length === 0 && (
        <div className="text-center py-8">
          <XCircle className="w-12 h-12 mx-auto text-muted-foreground" />
          <p className="mt-2 text-lg font-medium">No package managers found</p>
        </div>
      )}
    </div>
  );
}
