"use client";

import { ActiveProfileWidget } from "@/components/dashboard-widgets/active-profile-widget";
import { InstalledAppsWidget } from "@/components/dashboard-widgets/installed-apps-widget";
import { PackageManagersWidget } from "@/components/dashboard-widgets/package-managers-widget";
import { QuickActionsWidget } from "@/components/dashboard-widgets/quick-acrtions-widget";
import { RecentActivityWidget } from "@/components/dashboard-widgets/recent-activity-widget";
import { SystemStatusWidget } from "@/components/dashboard-widgets/system-status-widget";
import { UpcomingFeaturesWidget } from "@/components/dashboard-widgets/upcoming-features-widget";
import { Button } from "@geniehq/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@geniehq/ui/components/card";
import { Switch } from "@geniehq/ui/components/switch";
import { useState } from "react";

// Mock data - in a real app, this would come from your state management system
const mockData = {
  installedApps: 18,
  updatesAvailable: 3,
  packageManagers: ["Scoop", "Winget"],
  activeProfile: "Data Scientist",
  recentActivity: [
    { type: "Installed", app: "Visual Studio Code" },
    { type: "Updated", app: "Git" },
    { type: "Installed", app: "Python (latest)" },
  ],
};

export default function Dashboard() {
  const [widgets, setWidgets] = useState({
    installedApps: false,
    packageManagers: false,
    activeProfile: false,
    quickActions: false,
    recentActivity: false,
    systemStatus: false,
    upcomingFeatures: false,
  });

  const toggleWidget = (widget: keyof typeof widgets) => {
    setWidgets((prev) => ({ ...prev, [widget]: !prev[widget] }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" disabled>
          Customize Dashboard
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <InstalledAppsWidget
          enabled={widgets.installedApps}
          installedApps={mockData.installedApps}
          updatesAvailable={mockData.updatesAvailable}
        />
        <PackageManagersWidget
          enabled={widgets.packageManagers}
          packageManagers={mockData.packageManagers}
        />
        <ActiveProfileWidget
          enabled={widgets.activeProfile}
          activeProfile={mockData.activeProfile}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <QuickActionsWidget enabled={widgets.quickActions} />
        <RecentActivityWidget
          enabled={widgets.recentActivity}
          recentActivity={mockData.recentActivity}
        />
      </div>

      <SystemStatusWidget enabled={widgets.systemStatus} />
      <UpcomingFeaturesWidget enabled={widgets.upcomingFeatures} />

      {/* <Card>
        <CardHeader>
          <CardTitle>Widget Settings</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(widgets).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
              <Switch
                checked={value}
                onCheckedChange={() => toggleWidget(key as keyof typeof widgets)}
              />
            </div>
          ))}
        </CardContent>
      </Card> */}
    </div>
  );
}
