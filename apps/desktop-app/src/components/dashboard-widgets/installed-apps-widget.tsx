import { Card, CardContent, CardHeader, CardTitle } from "@geniehq/ui/components/card";
import { Progress } from "@geniehq/ui/components/progress";
import { AppWindowIcon } from "lucide-react";

interface InstalledAppsWidgetProps {
  enabled: boolean;
  installedApps: number;
  updatesAvailable: number;
}

export function InstalledAppsWidget({
  enabled,
  installedApps,
  updatesAvailable,
}: InstalledAppsWidgetProps) {
  return (
    <Card
      className={`transition-opacity duration-300 ${enabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}
    >
      <CardHeader>
        <CardTitle>Installed Apps</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <AppWindowIcon className="h-4 w-4 text-muted-foreground mr-2" />
          <div>
            <div className="text-2xl font-bold">{installedApps}</div>
            <p className="text-xs text-muted-foreground">{updatesAvailable} updates available</p>
          </div>
        </div>
        <Progress value={(updatesAvailable / installedApps) * 100} className="mt-2" />
      </CardContent>
    </Card>
  );
}
