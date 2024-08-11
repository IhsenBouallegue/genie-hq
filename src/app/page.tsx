import AboutUs from "@/components/abouts-us";
import Faq from "@/components/faq";
import { Features } from "@/components/features";
import Hero from "@/components/hero";
import SetupConfiguratorAccordions from "@/components/setup-configurator-accordions/setup-configurator-accordions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-24 items-center ">
      <Hero />
      <SetupConfiguratorAccordions />
      <Features />
      <Faq />
      <AboutUs />
    </main>
  );
}
