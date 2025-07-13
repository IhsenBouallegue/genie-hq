import { Badge } from "@geniehq/ui/components/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@geniehq/ui/components/card";

interface RecentActivityWidgetProps {
  enabled: boolean;
  recentActivity: Array<{ type: string; app: string }>;
}

export function RecentActivityWidget({ enabled, recentActivity }: RecentActivityWidgetProps) {
  return (
    <Card
      className={`transition-opacity duration-300 ${enabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}
    >
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {recentActivity.map((activity) => (
            <div key={activity.app} className="flex items-center">
              <Badge variant="secondary" className="mr-2">
                {activity.type}
              </Badge>
              <span>{activity.app}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
