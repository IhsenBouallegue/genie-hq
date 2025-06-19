import { Button } from "@geniehq/ui/components/button";
import { Download } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="md:min-h-[70vh] w-full flex rounded-md relative justify-center antialiased p-8">
      <div className="max-w-screen-xl px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-36">
        <div className="space-y-8 max-w-xl">
          <div className="flex items-center justify-center gap-2 bg-primary/20 px-4 py-2 rounded-full text-primary font-medium text-sm backdrop-blur-sm">
            <span>🚀 Now Available</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Setup your new devices easily using GenieHQ
          </h1>
          <p className="text-lg md:text-xl">
            Skip the hassle of manual app installations. Let GenieHQ handle the setup for you,
            ensuring a smooth and stress-free experience with your new devices.
          </p>
          <div className="flex gap-4">
            <Button asChild>
              <Link href="#downloads" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Now
              </Link>
            </Button>
            <Button variant="outline" className="text-primary" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="w-full max-w-lg">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
            <p className="text-muted-foreground mb-6">
              Download GenieHQ now and experience the easiest way to set up your new devices.
              Available for Windows with more platforms coming soon.
            </p>
            <Button className="w-full" asChild>
              <Link href="#downloads" className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download for Windows
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
