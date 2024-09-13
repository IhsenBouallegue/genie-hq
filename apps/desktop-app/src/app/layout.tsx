"use client";

import { AppShell } from "@/components/app-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@geniehq/ui/lib/utils";
import { Inter } from "next/font/google";
import "@geniehq/ui/globals.css";
import { HydrationBoundary } from "./store-hydrations";

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
          <HydrationBoundary>
            <AppShell>{children}</AppShell>
          </HydrationBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
