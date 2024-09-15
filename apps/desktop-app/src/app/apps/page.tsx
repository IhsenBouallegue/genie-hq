"use client";

import { useStore } from "@/lib/store/useStore";
import { Button } from "@geniehq/ui/components/button";
import { Input } from "@geniehq/ui/components/input";
import { Search, SortAsc, SortDesc, XCircle } from "lucide-react";
import { useState } from "react";
import ApplicationFullCard from "./application-full-card";

export default function Page() {
  const applicationsDetails = useStore((state) => state.applications);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedApplications, setSelectedApplications] = useState<string[]>(
    [],
  );

  const filteredAndSortedApplications = Object.values(applicationsDetails)
    .filter((pm) => pm.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      }
      return b.title.localeCompare(a.title);
    });

  const togglePackageManager = (id: string) => {
    setSelectedApplications((prev) =>
      prev.includes(id) ? prev.filter((pmId) => pmId !== id) : [...prev, id],
    );
  };

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
        <Button
          variant="outline"
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          className="w-full sm:w-auto"
        >
          Sort{" "}
          {sortOrder === "asc" ? (
            <SortAsc className="ml-2" />
          ) : (
            <SortDesc className="ml-2" />
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedApplications.map((app) => (
          <ApplicationFullCard key={app.title} app={app} />
        ))}
      </div>

      {filteredAndSortedApplications.length === 0 && (
        <div className="text-center py-8">
          <XCircle className="w-12 h-12 mx-auto text-muted-foreground" />
          <p className="mt-2 text-lg font-medium">No applications found</p>
        </div>
      )}
    </div>
  );
}
