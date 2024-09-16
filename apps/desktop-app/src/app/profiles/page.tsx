"use client";

import { useGenieStore } from "@/providers/genie-store-provider";
import { Button } from "@geniehq/ui/components/button";
import { Input } from "@geniehq/ui/components/input";
import { Search, SortAsc, SortDesc, XCircle } from "lucide-react";
import { useState } from "react";
import ProfileFullCard from "./profile-full-card";

export default function Page() {
  const profiles = useGenieStore((state) => state.profiles);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const profilesArray = Object.values(profiles);

  const filteredAndSortedProfiles = profilesArray
    .filter((profile) =>
      profile.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      }
      return b.title.localeCompare(a.title);
    });

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
        {filteredAndSortedProfiles.map((profile) => (
          <ProfileFullCard key={profile.id} profile={profile} />
        ))}
      </div>

      {filteredAndSortedProfiles.length === 0 && (
        <div className="text-center py-8">
          <XCircle className="w-12 h-12 mx-auto text-muted-foreground" />
          <p className="mt-2 text-lg font-medium">No profiles found</p>
        </div>
      )}
    </div>
  );
}
