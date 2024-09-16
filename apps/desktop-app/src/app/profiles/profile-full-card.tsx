import { TagWithTooltip } from "@/components/tag-with-tooltip";
import { getSupportedPackageManagers } from "@/lib/pm-logic";
import { isProfileSupported } from "@/lib/profile-logic";
import { useGenieStore } from "@/providers/genie-store-provider";
import { Badge } from "@geniehq/ui/components/badge";
import { Button } from "@geniehq/ui/components/button";
import type { Profile } from "@geniehq/ui/lib/store/types";
import { Selectable } from "@geniehq/ui/setup-configurator/selectable-card";
import { User, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfileFullCard({
  profile,
}: {
  profile: Profile;
}) {
  const [isSupported, setIsSupported] = useState(false);
  const applications = useGenieStore((state) => state.applications);
  const currentOS = useGenieStore((state) => state.currentOS);
  const packageManagers = useGenieStore((state) => state.packageManagers);

  useEffect(() => {
    if (currentOS === null) return;
    const supportedPackageManagers = getSupportedPackageManagers(
      Object.values(packageManagers),
    ).map((pm) => pm.name);
    setIsSupported(isProfileSupported(profile, applications, currentOS, supportedPackageManagers));
  }, [applications, currentOS, packageManagers, profile]);
  return (
    <Selectable
      key={profile.id}
      id={profile.id}
      enableHover={isSupported}
      className={`${isSupported ? "" : "opacity-60 cursor-default saturate-50 blur-[0.8px] pointer-events-none"} `}
    >
      <div className="flex justify-between items-start mb-2 w-full">
        <div className="flex items-center gap-2">
          {profile.image ? (
            <Image
              src={profile.image}
              alt={profile.title}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <User className="w-6 h-6 text-primary" />
          )}
          <h2 className="text-xl font-semibold">{profile.title}</h2>
        </div>
        <div>
          {isSupported && (
            <Button size="sm" variant="ghost">
              Install
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        <Badge>Applications: {profile.relevantApplications.length}</Badge>
        {!isSupported && (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Not Supported
          </Badge>
        )}
      </div>
    </Selectable>
  );
}
