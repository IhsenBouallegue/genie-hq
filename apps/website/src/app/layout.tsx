import "@geniehq/ui/globals.css";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { NoiseBackground } from "@/components/noise-background";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const metadataTitle = "GenieHQ - Cross-Platform Device Setup Automation Tool";
const metadataDescription = "Automate your device setup with GenieHQ. Install all your essential apps and configurations on Windows, macOS, and Linux in minutes. Open source, free, and community-driven.";

export const metadata: Metadata = {
  title: {
    default: metadataTitle,
    template: "%s | GenieHQ"
  },
  description: metadataDescription,
  keywords: [
    "device setup automation",
    "cross-platform setup tool",
    "Windows automation",
    "macOS automation", 
    "Linux automation",
    "app installation automation",
    "system configuration",
    "open source automation",
    "GenieHQ",
    "device management",
    "software installation",
    "development tools"
  ],
  authors: [
    { name: "IhsenBouallegue" },
    { name: "GenieHQ Team" }
  ],
  creator: "IhsenBouallegue",
  publisher: "GenieHQ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://geniehq.xyz"),
  alternates: {
    canonical: "https://geniehq.xyz",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://geniehq.xyz",
    siteName: "GenieHQ",
    title: metadataTitle,
    description: metadataDescription,
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "GenieHQ - Cross-Platform Device Setup Automation Tool",
        type: "image/png",
      },
      {
        url: "/geniehq_logo.svg",
        width: 512,
        height: 512,
        alt: "GenieHQ Logo",
        type: "image/svg+xml",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  classification: "Software Development Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="theme-color" content="#ff7f00" />
          <meta name="color-scheme" content="dark light" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
          <meta name="application-name" content="GenieHQ" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="GenieHQ" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#ff7f00" />
          <meta name="msapplication-tap-highlight" content="no" />
          
          {/* Favicon */}
          <link rel="icon" href="/geniehq_logo.ico" />
          <link rel="apple-touch-icon" href="/geniehq_logo.ico" />
          <link rel="manifest" href="/manifest.json" />
          
          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://api.github.com" />
          
          {/* Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "GenieHQ",
                "description": metadataDescription,
                "url": "https://geniehq.xyz",
                "applicationCategory": "DeveloperApplication",
                "operatingSystem": ["Windows", "macOS", "Linux"],
                "softwareVersion": "1.0.0",
                "author": {
                  "@type": "Organization",
                  "name": "GenieHQ",
                  "url": "https://geniehq.xyz"
                },
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "downloadUrl": "https://geniehq.xyz/downloads",
                "softwareRequirements": "Windows 10+, macOS 10.15+, or Linux",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "ratingCount": "150"
                }
              })
            }}
          />
        </head>
        <body className={cn(inter.className, "relative w-full")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <NoiseBackground>
              <Header />
              {children}
              <Footer />
            </NoiseBackground>
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
