import { isAppSupportedByOS, isAppSupportedByPackageManagers } from "@/lib/app-logic";
import { getSupportedPackageManagers } from "@/lib/pm-logic";
import { useGenieStore } from "@/providers/genie-store-provider";
import { Badge } from "@geniehq/ui/components/badge";
import { iconLookup } from "@geniehq/ui/lib/store/icons";
import type { Application, PackageManagerInfo } from "@geniehq/ui/lib/store/types";
import { Selectable } from "@geniehq/ui/setup-configurator/selectable-card";
import { Download, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function ApplicationFullCard({ app }: { app: Application }) {
  const Icon = iconLookup[app.icon];
  const [isSupportedByOS, setIsSupportedByOS] = useState(false);
  const [isSupportedByPackageManagers, setIsSupportedByPackageManagers] = useState(false);
  const [supportedPackageManagers, setSupportedPackageManagers] = useState<PackageManagerInfo[]>(
    [],
  );
  const currentOS = useGenieStore((state) => state.currentOS);
  const packageManagers = useGenieStore((state) => state.packageManagers);
  useEffect(() => {
    if (currentOS === null) return;
    setIsSupportedByOS(isAppSupportedByOS(app, currentOS));
    const supportedPMs = getSupportedPackageManagers(Object.values(packageManagers));
    setIsSupportedByPackageManagers(
      isAppSupportedByPackageManagers(
        app,
        supportedPMs.map((pm) => pm.name),
      ),
    );
    setSupportedPackageManagers(supportedPMs);
  }, [currentOS, app, packageManagers]);
  return (
    <Selectable
      key={app.id}
      id={app.id}
      enableHover={isSupportedByOS}
      className={`${isSupportedByOS ? "" : "opacity-60 cursor-default saturate-50 blur-[0.8px] pointer-events-none select-none"} `}
    >
      <div className="flex justify-between items-start mb-2 w-full">
        <div className="flex items-center gap-2">
          <Icon className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">{app.title}</h2>
        </div>
        {/* <div>
          {isSupported &&
            (pm.status === "available" ? (
              <Button
                size="sm"
                variant="ghost"
                disabled
                title="Not supported yet"
              >
                <Download className="w-4 h-4 mr-1" />
                Install
              </Button>
            ) : pm.status === "update-available" ? (
              <Button size="sm" variant="ghost">
                <RefreshCw className="w-4 h-4 mr-1" />
                Update
              </Button>
            ) : null)}
        </div> */}
      </div>
      {/* <p className="text-sm text-muted-foreground mb-2 text-left flex-grow">
        {app.description}
      </p> */}
      <div className="flex flex-wrap gap-2 mt-2">
        {/* {app.status === "installed" && (
          <Badge variant="green">
            <CheckCircle className="w-3 h-3 mr-1" />
            Installed
          </Badge>
        )} */}
        {isSupportedByOS && (
          <Badge variant="outline">
            <Download className="w-3 h-3 mr-1" />
            Available
          </Badge>
        )}
        {app.installationMethods
          .map((method) => method.packageManager)
          .map((pm) => (
            <Badge
              key={pm}
              variant={
                supportedPackageManagers.map((pm) => pm.name).includes(pm) ? "secondary" : "outline"
              }
            >
              {pm}
            </Badge>
          ))}
        {/* {pm.status === "update-available" && (
          <Badge variant="yellow">
            <RefreshCw className="w-3 h-3 mr-1" />
            Update Available
          </Badge>
        )} */}

        {/* {app.version && <Badge>v{app.version}</Badge>} */}
        {!(isSupportedByOS && isSupportedByPackageManagers) && (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Not Supported
          </Badge>
        )}
      </div>
    </Selectable>
  );
}
