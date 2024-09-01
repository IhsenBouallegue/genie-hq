"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@geniehq/ui/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@geniehq/ui/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "relative w-full")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
