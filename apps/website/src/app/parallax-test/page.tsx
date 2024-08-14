"use client";

import AboutUs from "@/components/abouts-us";
import ParallaxBackground from "@/components/parallax-background";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-24 items-center ">
      <ParallaxBackground />
      <div>
        <h1>Parallax Test</h1>
        <p>
          This is a test page for the parallax effect. Scroll down to see the
          effect in action.
        </p>
      </div>
    </main>
  );
}
