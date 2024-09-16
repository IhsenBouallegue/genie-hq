"use client";

import { isAppSupportedByOS } from "@/lib/app-logic";
import { useSort } from "@/lib/sorting"; // Import the sorting hook
import { useGenieStore } from "@/providers/genie-store-provider";
import { Button } from "@geniehq/ui/components/button";
import { Input } from "@geniehq/ui/components/input";
import type { Application } from "@geniehq/ui/lib/store/types";
import { Search, SortAsc, SortDesc, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import ApplicationFullCard from "./application-full-card";

export default function Page() {
  const applicationsDetails = useGenieStore((state) => state.applications);
  const currentOS = useGenieStore((state) => state.currentOS);
  const isSupported = useMemo(
    () => (app: Application) => isAppSupportedByOS(app, currentOS),
    [currentOS],
  );
  const [searchTerm, setSearchTerm] = useState("");
  // Use the generalized useSort hook with default sorting by title
  const {
    sortedItems: sortedApplications,
    sortConfigs,
    updateSort,
  } = useSort(Object.values(applicationsDetails), [{ key: isSupported, direction: "desc" }]);

  // Filter the applications based on the search term
  const filteredApplications = sortedApplications.filter((app) =>
    app.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">Applications</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search applications..."
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
        {filteredApplications.map((app) => (
          <ApplicationFullCard key={app.title} app={app} />
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-8">
          <XCircle className="w-12 h-12 mx-auto text-muted-foreground" />
          <p className="mt-2 text-lg font-medium">No applications found</p>
        </div>
      )}
    </div>
  );
}
