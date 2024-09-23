import { Card, CardContent, CardHeader, CardTitle } from "@geniehq/ui/components/card";
import { UserIcon } from "lucide-react";

interface ActiveProfileWidgetProps {
  enabled: boolean;
  activeProfile: string;
}

export function ActiveProfileWidget({ enabled, activeProfile }: ActiveProfileWidgetProps) {
  return (
    <Card
      className={`transition-opacity duration-300 ${enabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}
    >
      <CardHeader>
        <CardTitle>Active Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <UserIcon className="h-4 w-4 text-muted-foreground mr-2" />
          <div>
            <div className="text-2xl font-bold">{activeProfile}</div>
            <p className="text-xs text-muted-foreground">10 recommended apps</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
