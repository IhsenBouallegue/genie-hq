"use client";

import { AppShell } from "@/components/app-shell";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@geniehq/ui/lib/utils";
import { Inter } from "next/font/google";
import "@geniehq/ui/globals.css";
import { GenieStoreProvider } from "@/providers/genie-store-provider";
import { OperatingSystem } from "@geniehq/ui/lib/store/types";
import { HydrationBoundary } from "../providers/store-hydrations";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "relative w-full")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <GenieStoreProvider os={OperatingSystem.Windows}>
            <HydrationBoundary>
              <AppShell>{children}</AppShell>
            </HydrationBoundary>
          </GenieStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
