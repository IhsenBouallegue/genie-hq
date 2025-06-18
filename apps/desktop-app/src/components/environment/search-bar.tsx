"use client";

import { Input } from "@geniehq/ui/components/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeTab: "installed" | "registry";
}

export function SearchBar({ searchTerm, onSearchChange, activeTab }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={`Search ${activeTab === "installed" ? "installed" : "registry"} tools...`}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-8"
      />
    </div>
  );
}
