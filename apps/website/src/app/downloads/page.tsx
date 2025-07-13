import { Downloads } from "@/components/downloads";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Download GenieHQ - Cross-Platform Device Setup Automation Tool",
  description:
    "Download GenieHQ for Windows, macOS, or Linux. Automate your device setup with our cross-platform tool that installs all your essential apps and configurations in minutes. Open source and free to use.",
  keywords: [
    "GenieHQ download",
    "device setup automation",
    "Windows setup tool",
    "macOS setup automation",
    "Linux setup tool",
    "cross-platform automation",
    "open source setup tool",
    "app installation automation",
  ],
  openGraph: {
    title: "Download GenieHQ - Cross-Platform Device Setup Automation Tool",
    description:
      "Download GenieHQ for Windows, macOS, or Linux. Automate your device setup with our cross-platform tool that installs all your essential apps and configurations in minutes.",
    type: "website",
    url: "https://geniehq.xyz/downloads",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "GenieHQ - Device Setup Automation Tool",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Download GenieHQ - Cross-Platform Device Setup Automation Tool",
    description:
      "Download GenieHQ for Windows, macOS, or Linux. Automate your device setup with our cross-platform tool.",
    images: ["/preview.png"],
  },
  alternates: {
    canonical: "https://geniehq.xyz/downloads",
  },
};

export default function DownloadsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Downloads />

      {/* Additional SEO content */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h2>About GenieHQ Downloads</h2>
          <p>
            GenieHQ is an open-source cross-platform tool designed to automate the tedious process
            of setting up new devices. Whether you're setting up a new Windows PC, macOS machine, or
            Linux system, GenieHQ can install all your essential applications and configure your
            environment in minutes instead of hours.
          </p>

          <h3>Supported Platforms</h3>
          <ul>
            <li>
              <strong>Windows:</strong> x64 and ARM64 architectures with automatic installer
            </li>
            <li>
              <strong>macOS:</strong> Intel and Apple Silicon (M1/M2) support
            </li>
            <li>
              <strong>Linux:</strong> x64 and ARM64 with AppImage distribution
            </li>
          </ul>

          <h3>Features</h3>
          <ul>
            <li>Cross-platform compatibility</li>
            <li>Automated app installation</li>
            <li>Configuration management</li>
            <li>Open source and transparent</li>
            <li>Community-driven development</li>
            <li>Regular updates and releases</li>
          </ul>

          <h3>Getting Started</h3>
          <p>
            Download the appropriate version for your operating system above. After installation,
            GenieHQ will guide you through the setup process, allowing you to select which
            applications and configurations you want to install on your system.
          </p>

          <h3>Open Source</h3>
          <p>
            GenieHQ is completely open source, with all code available on GitHub. This means you can
            review the code, contribute improvements, or even modify it for your own needs. Visit
            our
            <a
              href="https://github.com/IhsenBouallegue/genie-hq"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </a>{" "}
            to explore the source code, report issues, or contribute to the project.
          </p>
        </div>
      </section>
    </main>
  );
}
