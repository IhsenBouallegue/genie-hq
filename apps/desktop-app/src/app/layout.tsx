"use client";

import { AppShell } from "@/components/app-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { useStore } from "@/lib/store/useStore";
import "@geniehq/ui/globals.css";
import { cn } from "@geniehq/ui/lib/utils";
import { Inter } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setCurrentOS = useStore((state) => state.setCurrentOS);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setCurrentOS();
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "relative w-full")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
