"use client";

import { Button } from "@geniehq/ui/components/button";

interface TabNavigationProps {
  activeTab: "installed" | "registry";
  onTabChange: (tab: "installed" | "registry") => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex space-x-1 border-b">
      <Button
        variant={activeTab === "installed" ? "default" : "ghost"}
        onClick={() => onTabChange("installed")}
        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
      >
        Installed Tools
      </Button>
      <Button
        variant={activeTab === "registry" ? "default" : "ghost"}
        onClick={() => onTabChange("registry")}
        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
      >
        Tool Registry
      </Button>
    </div>
  );
}
