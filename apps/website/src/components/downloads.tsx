import { Button } from "@geniehq/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@geniehq/ui/components/card";
import { SiApple, SiLinux, SiWindows11 } from "@icons-pack/react-simple-icons";
import { Download, ExternalLink } from "lucide-react";
import Heading from "./heading";

interface DownloadLink {
  platform: string;
  architecture: string;
  icon: React.ReactNode;
  url: string;
  filename: string;
  available: boolean;
}

const APP_VERSION = "0.1.0";
const GITHUB_REPO = "IhsenBouallegue/genie-hq";

const downloadLinks: DownloadLink[] = [
  {
    platform: "Windows",
    architecture: "x64",
    icon: <SiWindows11 className="w-6 h-6" />,
    url: `https://github.com/${GITHUB_REPO}/releases/download/app-v${APP_VERSION}/GenieHQ_${APP_VERSION}_x64-setup.exe`,
    filename: `GenieHQ_${APP_VERSION}_x64-setup.exe`,
    available: true,
  },
  {
    platform: "Windows",
    architecture: "ARM64",
    icon: <SiWindows11 className="w-6 h-6" />,
    url: `https://github.com/${GITHUB_REPO}/releases/download/app-v${APP_VERSION}/GenieHQ_${APP_VERSION}_arm64-setup.exe`,
    filename: `GenieHQ_${APP_VERSION}_arm64-setup.exe`,
    available: false, // Not yet available in workflow
  },
  {
    platform: "macOS",
    architecture: "Intel",
    icon: <SiApple className="w-6 h-6" />,
    url: `https://github.com/${GITHUB_REPO}/releases/download/app-v${APP_VERSION}/GenieHQ_${APP_VERSION}_x64.dmg`,
    filename: `GenieHQ_${APP_VERSION}_x64.dmg`,
    available: false, // Not yet available in workflow
  },
  {
    platform: "macOS",
    architecture: "Apple Silicon",
    icon: <SiApple className="w-6 h-6" />,
    url: `https://github.com/${GITHUB_REPO}/releases/download/app-v${APP_VERSION}/GenieHQ_${APP_VERSION}_aarch64.dmg`,
    filename: `GenieHQ_${APP_VERSION}_aarch64.dmg`,
    available: false, // Not yet available in workflow
  },
  {
    platform: "Linux",
    architecture: "x64",
    icon: <SiLinux className="w-6 h-6" />,
    url: `https://github.com/${GITHUB_REPO}/releases/download/app-v${APP_VERSION}/GenieHQ_${APP_VERSION}_amd64.AppImage`,
    filename: `GenieHQ_${APP_VERSION}_amd64.AppImage`,
    available: false, // Not yet available in workflow
  },
  {
    platform: "Linux",
    architecture: "ARM64",
    icon: <SiLinux className="w-6 h-6" />,
    url: `https://github.com/${GITHUB_REPO}/releases/download/app-v${APP_VERSION}/GenieHQ_${APP_VERSION}_arm64.AppImage`,
    filename: `GenieHQ_${APP_VERSION}_arm64.AppImage`,
    available: false, // Not yet available in workflow
  },
];

export function Downloads() {
  const availableDownloads = downloadLinks.filter((link) => link.available);
  const comingSoonDownloads = downloadLinks.filter((link) => !link.available);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16" id="downloads">
      <Heading>Download GenieHQ</Heading>
      <div className="space-y-8">
        {/* Available Downloads */}
        {availableDownloads.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">Available Now</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableDownloads.map((link) => (
                <DownloadCard key={link.filename} link={link} />
              ))}
            </div>
          </div>
        )}

        {/* Coming Soon Downloads */}
        {comingSoonDownloads.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6">Coming Soon</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {comingSoonDownloads.map((link) => (
                <DownloadCard key={link.filename} link={link} />
              ))}
            </div>
          </div>
        )}

        {/* GitHub Release Link */}
        <div className="text-center pt-8">
          <Button variant="outline" asChild>
            <a
              href={`https://github.com/${GITHUB_REPO}/releases`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              View All Releases on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

interface DownloadCardProps {
  link: DownloadLink;
}

function DownloadCard({ link }: DownloadCardProps) {
  return (
    <Card
      className={`transition-all duration-200 ${!link.available ? "opacity-60" : "hover:shadow-lg"}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {link.icon}
          <div>
            <CardTitle className="text-lg">{link.platform}</CardTitle>
            <CardDescription>{link.architecture}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {link.available ? (
          <Button className="w-full" asChild>
            <a href={link.url} download={link.filename} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </a>
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            Coming Soon
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
