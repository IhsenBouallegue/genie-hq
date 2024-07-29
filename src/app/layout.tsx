import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/ui/footer";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const metadataTitle = "Genie HQ";
const metadataDescription = "Automate Your Setup, Enjoy Your Device";

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  openGraph: {
    type: "website",
    url: "https://geniehq.xyz",
    title: metadataTitle,
    description: metadataDescription,
    siteName: "Genie HQ",
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
        <body className={cn(inter.className, "relative w-full")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
