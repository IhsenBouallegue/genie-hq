import Faq from "@/components/faq";
import { Features } from "@/components/features";
import Hero from "@/components/hero";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between antialiased transform-gpu">
      <Hero />
      <Features />
      <Faq />
    </main>
  );
}
