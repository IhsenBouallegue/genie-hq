"use client";

import { useGenieStore } from "@/providers/genie-store-provider";
import { Button } from "@geniehq/ui/components/button";
import { Input } from "@geniehq/ui/components/input";
import { Search, SortAsc, SortDesc, XCircle } from "lucide-react";
import { useState } from "react";
import PackageManagerFullCard from "./package-manager-full-card";

export default function Page() {
  const packageManagersDetails = useGenieStore(
    (state) => state.packageManagers,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedPackageManagers, setSelectedPackageManagers] = useState<
    string[]
  >([]);

  const filteredAndSortedPackageManagers = Object.values(packageManagersDetails)
    .filter((pm) => pm.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      }
      return b.name.localeCompare(a.name);
    });

  const togglePackageManager = (id: string) => {
    setSelectedPackageManagers((prev) =>
      prev.includes(id) ? prev.filter((pmId) => pmId !== id) : [...prev, id],
    );
  };

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
        {filteredAndSortedPackageManagers.map((pm) => (
          <PackageManagerFullCard key={pm.name} pm={pm} />
        ))}
      </div>

      {filteredAndSortedPackageManagers.length === 0 && (
        <div className="text-center py-8">
          <XCircle className="w-12 h-12 mx-auto text-muted-foreground" />
          <p className="mt-2 text-lg font-medium">No package managers found</p>
        </div>
      )}
    </div>
  );
}
