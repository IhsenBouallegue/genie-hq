import { Card, CardContent, CardHeader, CardTitle } from "@geniehq/ui/components/card";
import { PackageIcon } from "lucide-react";

interface PackageManagersWidgetProps {
  enabled: boolean;
  packageManagers: string[];
}

export function PackageManagersWidget({ enabled, packageManagers }: PackageManagersWidgetProps) {
  return (
    <Card
      className={`transition-opacity duration-300 ${enabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}
    >
      <CardHeader>
        <CardTitle>Package Managers</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <PackageIcon className="h-4 w-4 text-muted-foreground mr-2" />
          <div>
            <div className="text-2xl font-bold">{packageManagers.length}</div>
            <p className="text-xs text-muted-foreground">{packageManagers.join(", ")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
