"use client";

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
  Bell,
  Home,
  Package2,
  PackageOpenIcon,
  Users2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

export function AppShell({
  children,
}: Readonly<{ children: React.ReactNode | React.ReactNode[] }>) {
  const segment = useSelectedLayoutSegment();
  const [pageTitle, setPageTitle] = useState("Dashboard");

  // Update the page title based on the current route
  useEffect(() => {
    switch (segment) {
      case "dashboard":
        setPageTitle("Dashboard");
        break;
      case "package-managers":
        setPageTitle("Package Managers");
        break;
      case "apps":
        setPageTitle("Apps");
        break;
      case "profiles":
        setPageTitle("Profiles");
        break;
      default:
        setPageTitle("Dashboard");
        break;
    }
  }, [segment]);

  const getNavLinkClass = (path: string) =>
    segment === path
      ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src="/geniehq_logo.svg"
                alt="GenieHQ"
                width={32}
                height={32}
              />
              <span>GenieHQ</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link href="/dashboard" className={getNavLinkClass("dashboard")}>
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/package-managers"
                className={getNavLinkClass("package-managers")}
              >
                <ArchiveIcon className="h-4 w-4" />
                Package Managers
              </Link>
              <Link href="/apps" className={getNavLinkClass("apps")}>
                <PackageOpenIcon className="h-4 w-4" />
                Apps
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link href="/profiles" className={getNavLinkClass("profiles")}>
                <Users2Icon className="h-4 w-4" />
                Profiles
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <span className="text-xs text-muted">Coming soon</span>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
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
      </div>
      <div className="flex flex-col h-[100vh] overflow-y-scroll">
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">{pageTitle}</h1>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
