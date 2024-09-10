import { Badge } from "@geniehq/ui/components/badge";
import { Button } from "@geniehq/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@geniehq/ui/components/card";
import {
  ArchiveIcon,
  LayoutDashboardIcon,
  PackageOpenIcon,
  Users2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [activePage, setActivePage] = useState("/");

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboardIcon, href: "/" },
    {
      name: "Package Managers",
      icon: ArchiveIcon,
      href: "/package-managers",
    },
    { name: "Apps", icon: PackageOpenIcon, href: "/apps", badge: 6 },
    { name: "Profiles", icon: Users2Icon, href: "/profiles" },
  ];

  const getNavLinkClass = (path: string) =>
    activePage === path
      ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";

  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      {/* Header */}
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold"
          onClick={() => setActivePage("/")}
        >
          <Image src="/geniehq_logo.svg" height={32} width={32} alt="GenieHQ" />
          <span>GenieHQ</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1">
        <nav className="grid gap-2 items-start px-2 text-sm font-medium lg:px-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={getNavLinkClass(item.href)}
              onClick={() => setActivePage(item.href)}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
              {item.badge && (
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto p-4">
        <Card x-chunk="dashboard-02-chunk-0">
          <CardHeader className="p-2 pt-0 md:p-4">
            <span className="text-xs text-muted">Coming soon</span>
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support team.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
            <Button size="sm" className="w-full" disabled>
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
