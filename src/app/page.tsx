import AboutUs from "@/components/abouts-us";
import Faq from "@/components/faq";
import { Features } from "@/components/features";
import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-12 items-center ">
      <Hero />
      <Features />
      <Faq />
      <AboutUs />
    </main>
  );
}
