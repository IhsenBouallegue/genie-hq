import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import { NoiseBackground } from "@/components/noise-background";

const inter = Inter({ subsets: ["latin"] });
const metadataTitle = "GenieHQ";
const metadataDescription = "Automate Your Setup, Enjoy Your Device";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  metadataBase: new URL("https://geniehq.xyz"),
  openGraph: {
    type: "website",
    url: "https://geniehq.xyz",
    title: metadataTitle,
    description: metadataDescription,
    siteName: "GenieHQ",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
      },
    ],
  },
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
