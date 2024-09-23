import { Button } from "@geniehq/ui/components/button";
import { Card, CardHeader, CardTitle, CardContent } from "@geniehq/ui/components/card";
import {
  DownloadIcon,
  HardDriveIcon,
  RefreshCwIcon,
  ScrollTextIcon,
  SettingsIcon,
  TrashIcon,
} from "lucide-react";

interface QuickActionsWidgetProps {
  enabled: boolean;
}

export function QuickActionsWidget({ enabled }: QuickActionsWidgetProps) {
  return (
    <Card
      className={`transition-opacity duration-300 ${enabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}
    >
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <Button className="w-full justify-start" variant="outline">
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Scan for Updates
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <ScrollTextIcon className="mr-2 h-4 w-4" />
            View Installed Apps
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Install New App
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <TrashIcon className="mr-2 h-4 w-4" />
            Uninstall App
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <HardDriveIcon className="mr-2 h-4 w-4" />
            Manage Storage
          </Button>
          <Button className="w-full justify-start" variant="outline">
            <SettingsIcon className="mr-2 h-4 w-4" />
            Configure Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
