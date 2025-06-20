"use client";

import { Badge } from "@geniehq/ui/components/badge";
import { Button } from "@geniehq/ui/components/button";
import { MotionCard } from "@geniehq/ui/components/card";
import { ScrollArea, ScrollBar } from "@geniehq/ui/components/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@geniehq/ui/components/tabs";
import { SiApple, SiLinux, SiWindows11 } from "@icons-pack/react-simple-icons";
import { AlertCircle, CheckCircle, Download, ExternalLink, XCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Heading from "./heading";

interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  body: string;
  assets: Array<{
    name: string;
    browser_download_url: string;
    size: number;
    download_count: number;
  }>;
}

interface DownloadLink {
  platform: string;
  architecture: string;
  icon: React.ReactNode;
  filename: string;
  available: boolean;
  size?: string;
  downloadCount?: number;
  url?: string;
}

const GITHUB_REPO = "IhsenBouallegue/genie-hq";

function detectPlatform(): string {
  if (typeof window === "undefined") return "unknown";

  const userAgent = window.navigator.userAgent.toLowerCase();
  if (userAgent.includes("win")) return "windows";
  if (userAgent.includes("mac")) return "macos";
  if (userAgent.includes("linux")) return "linux";
  return "unknown";
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
}

function getPlatformIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case "windows":
      return <SiWindows11 className="w-6 h-6" />;
    case "macos":
      return <SiApple className="w-6 h-6" />;
    case "linux":
      return <SiLinux className="w-6 h-6" />;
    default:
      return <Download className="w-6 h-6" />;
  }
}

export function Downloads() {
  const [release, setRelease] = useState<GitHubRelease | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userPlatform, setUserPlatform] = useState<string>("unknown");

  useEffect(() => {
    // Detect user platform
    const platform = detectPlatform();
    setUserPlatform(platform);

    // Fetch release data
    const fetchRelease = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/releases/latest`);
        if (!response.ok) throw new Error("Failed to fetch release data");
        const data = await response.json();
        setRelease(data);
      } catch (err) {
        setError("Failed to load release information");
        console.error("Error fetching release:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelease();
  }, []);

  const getDownloadLinks = (): DownloadLink[] => {
    if (!release) return [];

    const links: DownloadLink[] = [];
    const version = release.tag_name.replace("app-v", "");

    // Windows builds
    const windowsX64Asset = release.assets.find((asset) => asset.name.includes("x64-setup.exe"));
    links.push({
      platform: "Windows",
      architecture: "x64",
      icon: getPlatformIcon("windows"),
      filename: `GenieHQ_${version}_x64-setup.exe`,
      available: !!windowsX64Asset,
      size: windowsX64Asset?.size ? formatFileSize(windowsX64Asset.size) : undefined,
      downloadCount: windowsX64Asset?.download_count,
      url: windowsX64Asset?.browser_download_url,
    });

    const windowsArm64Asset = release.assets.find((asset) =>
      asset.name.includes("arm64-setup.exe"),
    );
    links.push({
      platform: "Windows",
      architecture: "ARM64",
      icon: getPlatformIcon("windows"),
      filename: `GenieHQ_${version}_arm64-setup.exe`,
      available: !!windowsArm64Asset,
      size: windowsArm64Asset?.size ? formatFileSize(windowsArm64Asset.size) : undefined,
      downloadCount: windowsArm64Asset?.download_count,
      url: windowsArm64Asset?.browser_download_url,
    });

    // macOS builds
    const macosX64Asset = release.assets.find((asset) => asset.name.includes("x64.dmg"));
    links.push({
      platform: "macOS",
      architecture: "Intel",
      icon: getPlatformIcon("macos"),
      filename: `GenieHQ_${version}_x64.dmg`,
      available: !!macosX64Asset,
      size: macosX64Asset?.size ? formatFileSize(macosX64Asset.size) : undefined,
      downloadCount: macosX64Asset?.download_count,
      url: macosX64Asset?.browser_download_url,
    });

    const macosAarch64Asset = release.assets.find((asset) => asset.name.includes("aarch64.dmg"));
    links.push({
      platform: "macOS",
      architecture: "Apple Silicon",
      icon: getPlatformIcon("macos"),
      filename: `GenieHQ_${version}_aarch64.dmg`,
      available: !!macosAarch64Asset,
      size: macosAarch64Asset?.size ? formatFileSize(macosAarch64Asset.size) : undefined,
      downloadCount: macosAarch64Asset?.download_count,
      url: macosAarch64Asset?.browser_download_url,
    });

    // Linux builds
    const linuxAmd64Asset = release.assets.find((asset) => asset.name.includes("amd64.AppImage"));
    links.push({
      platform: "Linux",
      architecture: "x64",
      icon: getPlatformIcon("linux"),
      filename: `GenieHQ_${version}_amd64.AppImage`,
      available: !!linuxAmd64Asset,
      size: linuxAmd64Asset?.size ? formatFileSize(linuxAmd64Asset.size) : undefined,
      downloadCount: linuxAmd64Asset?.download_count,
      url: linuxAmd64Asset?.browser_download_url,
    });

    const linuxArm64Asset = release.assets.find((asset) => asset.name.includes("arm64.AppImage"));
    links.push({
      platform: "Linux",
      architecture: "ARM64",
      icon: getPlatformIcon("linux"),
      filename: `GenieHQ_${version}_arm64.AppImage`,
      available: !!linuxArm64Asset,
      size: linuxArm64Asset?.size ? formatFileSize(linuxArm64Asset.size) : undefined,
      downloadCount: linuxArm64Asset?.download_count,
      url: linuxArm64Asset?.browser_download_url,
    });

    return links;
  };

  const downloadLinks = getDownloadLinks();
  const windowsDownloads = downloadLinks.filter((link) => link.platform === "Windows");
  const macosDownloads = downloadLinks.filter((link) => link.platform === "macOS");
  const linuxDownloads = downloadLinks.filter((link) => link.platform === "Linux");

  // Determine default tab based on user platform
  const getDefaultTab = () => {
    switch (userPlatform) {
      case "windows":
        return "windows";
      case "macos":
        return "macos";
      case "linux":
        return "linux";
      default:
        return "windows";
    }
  };

  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16" id="downloads" aria-label="Download GenieHQ">
        <Heading>Download GenieHQ</Heading>
        <div className="flex items-center justify-center py-12 mt-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" aria-label="Loading downloads" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-16" id="downloads" aria-label="Download GenieHQ">
        <Heading>Download GenieHQ</Heading>
        <div className="flex items-center justify-center py-12 mt-12">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" aria-hidden="true" />
            <p className="text-lg text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="downloads" 
      className="flex flex-col justify-center items-center p-6 max-w-6xl"
      aria-label="Download GenieHQ - Cross-platform device setup automation tool"
    >
      <Heading>Download GenieHQ</Heading>
      
      {/* SEO-friendly description */}
      <div className="text-center mb-8 max-w-2xl">
        <p className="text-muted-foreground">
          Download GenieHQ for Windows, macOS, or Linux. Automate your device setup with our cross-platform 
          tool that installs all your essential apps and configurations in minutes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
        {/* Left: Image */}
        <div className="relative w-full min-h-80 h-full">
          <Image
            src="/genie_3.png"
            alt="GenieHQ mascot - magical genie character representing automated device setup"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain", transform: "scaleX(-1)" }}
            priority
          />
        </div>
        
        {/* Right: Content */}
        <MotionCard className="shadow-lg md:w-[600px] md:max-w-fit bg-transparent border-none">
          {/* Header Section with Version and Disclaimer */}
          <div className="mb-6 space-y-3">
            {/* Release Info */}
            {release && (
              <div className="flex items-center justify-between bg-primary/10 rounded-full pr-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full text-primary font-medium text-xs">
                  <CheckCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Latest: {release.tag_name.replace("app-v", "")}</span>
                  <span>•</span>
                  <span>{new Date(release.published_at).toLocaleDateString()}</span>
                </div>
                <Link
                  href={`https://github.com/${GITHUB_REPO}/releases`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  aria-label="View all GenieHQ releases on GitHub"
                >
                  View All Releases
                  <ExternalLink className="size-3" aria-hidden="true" />
                </Link>
              </div>
            )}

            {/* Disclaimer */}
            <div className="text-xs text-muted-foreground bg-muted/60 border border-muted rounded px-3 py-2">
              GenieHQ is in early access/beta. Features and platform support are still in progress.
              Use at your own risk.
            </div>
          </div>

          {/* Platform Tabs */}
          <Tabs defaultValue={getDefaultTab()} className="w-full">
            <ScrollArea>
              <TabsList className="mb-3 w-full flex justify-center" role="tablist" aria-label="Select your operating system">
                <TabsTrigger value="windows" className="group flex-1" role="tab" aria-selected={getDefaultTab() === "windows"}>
                  <SiWindows11 className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                  Windows
                  {userPlatform === "windows" && (
                    <Badge
                      className="ml-2 transition-opacity group-data-[state=inactive]:opacity-50"
                      variant="secondary"
                    >
                      You
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="macos" className="group flex-1" role="tab" aria-selected={getDefaultTab() === "macos"}>
                  <SiApple className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                  macOS
                  {userPlatform === "macos" && (
                    <Badge
                      className="bg-primary/15 ms-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
                      variant="secondary"
                    >
                      You
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="linux" className="group flex-1" role="tab" aria-selected={getDefaultTab() === "linux"}>
                  <SiLinux className="-ms-0.5 me-1.5 opacity-60" size={16} aria-hidden="true" />
                  Linux
                  {userPlatform === "linux" && (
                    <Badge
                      className="bg-primary/15 ms-1.5 min-w-5 px-1 transition-opacity group-data-[state=inactive]:opacity-50"
                      variant="secondary"
                    >
                      You
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <TabsContent value="windows" className="pt-1" role="tabpanel" aria-label="Windows downloads">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {windowsDownloads.map((link) => (
                  <DownloadCard key={link.filename} link={link} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="macos" className="pt-1" role="tabpanel" aria-label="macOS downloads">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {macosDownloads.map((link) => (
                  <DownloadCard key={link.filename} link={link} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="linux" className="pt-1" role="tabpanel" aria-label="Linux downloads">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {linuxDownloads.map((link) => (
                  <DownloadCard key={link.filename} link={link} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </MotionCard>
      </div>

      {/* Additional SEO content */}
      <div className="mt-12 text-center max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Why Choose GenieHQ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
          <div>
            <h3 className="font-medium text-foreground mb-2">Cross-Platform</h3>
            <p>Works seamlessly on Windows, macOS, and Linux with native performance.</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Open Source</h3>
            <p>Transparent, community-driven development with full source code available on GitHub.</p>
          </div>
          <div>
            <h3 className="font-medium text-foreground mb-2">Fast Setup</h3>
            <p>Automate your entire device setup process in minutes instead of hours.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

interface DownloadCardProps {
  link: DownloadLink;
}

function DownloadCard({ link }: DownloadCardProps) {
  const cardContent = (
    <div
      className={`rounded-xl border bg-muted/60 p-4 flex flex-col gap-2 transition-all duration-200 ${
        !link.available
          ? "opacity-60 cursor-default saturate-50 blur-[0.5px] pointer-events-none select-none"
          : "hover:border-primary hover:bg-muted/80 cursor-pointer"
      }`}
    >
      <div className="flex justify-between items-start mb-2 w-full">
        <div className="flex items-center gap-2">
          {link.icon}
          <div>
            <div className="text-base font-semibold text-foreground">
              {link.platform}
              <span className="ml-2 text-xs text-muted-foreground font-normal">
                {link.architecture}
              </span>
            </div>
            {link.size && <div className="text-xs text-muted-foreground">{link.size}</div>}
          </div>
        </div>
        <div className="mt-1">
          <Download className="w-5 h-5 text-primary/80" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-1">
        {!link.available && (
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <XCircleIcon className="w-3 h-3" /> Not available
          </div>
        )}
      </div>
    </div>
  );

  if (link.available && link.url) {
    return (
      <a href={link.url} download={link.filename} className="block group" tabIndex={0}>
        {cardContent}
      </a>
    );
  }
  return cardContent;
}
