import { Card, CardContent, CardHeader, CardTitle } from "@geniehq/ui/components/card";
import { Progress } from "@geniehq/ui/components/progress";

interface SystemStatusWidgetProps {
  enabled: boolean;
}

export function SystemStatusWidget({ enabled }: SystemStatusWidgetProps) {
  return (
    <Card
      className={`transition-opacity duration-300 ${enabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}
    >
      <CardHeader>
        <CardTitle>System Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <span>CPU Usage</span>
            <Progress value={30} className="w-1/2" />
          </div>
          <div className="flex items-center justify-between">
            <span>Memory Usage</span>
            <Progress value={60} className="w-1/2" />
          </div>
          <div className="flex items-center justify-between">
            <span>Disk Space</span>
            <Progress value={45} className="w-1/2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
