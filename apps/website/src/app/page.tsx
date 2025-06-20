import AboutUs from "@/components/abouts-us";
import { Downloads } from "@/components/downloads";
import Faq from "@/components/faq";
import { Features } from "@/components/features";
import Hero from "@/components/hero";
import ParallaxBackground from "@/components/parallax-background";
import SetupConfiguratorAccordion from "@/components/setup-configurator";
import { Button } from "@geniehq/ui/components/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-24 items-center ">
      <Hero />
      <ParallaxBackground />
      <SetupConfiguratorAccordion />
      <Features />
      <Downloads />
      <div className="text-center">
        <Button asChild>
          <Link href="/downloads">View All Downloads</Link>
        </Button>
      </div>
      <Faq />
      <AboutUs />
    </main>
  );
}
