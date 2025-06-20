"use client";

import { MotionShineBorder } from "@/components/magicui/shine-border";
import useMousePosition from "@/lib/use-mouse-position";
import { Button } from "@geniehq/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@geniehq/ui/components/card";
import { motion, useAnimationFrame, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EmailForm } from "./email-form";

async function getLatestRelease() {
  const res = await fetch("https://api.github.com/repos/IhsenBouallegue/genie-hq/releases/latest");
  const data = await res.json();
  const date = new Date(data.published_at);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
// get version from release
async function getVersion() {
  const res = await fetch("https://api.github.com/repos/IhsenBouallegue/genie-hq/releases/latest");
  const data = await res.json();
  return data.tag_name.replace("app-v", "");
}

export default function Hero() {
  const [latestRelease, setLatestRelease] = useState("");
  const [version, setVersion] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const mousePosition = useMousePosition();
  const container = useRef<HTMLDivElement>(null);
  const springConfig = { stiffness: 40, damping: 20 };
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  useEffect(() => {
    // Fetch data
    getLatestRelease().then(setLatestRelease);
    getVersion().then(setVersion);

    // Check if mobile
    const checkIfMobile = () => {
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useAnimationFrame(() => {
    if (!isMobile) {
      const rect = container.current?.getBoundingClientRect();

      if (rect && mousePosition.x !== null && mousePosition.y !== null) {
        const offsetX = mousePosition.x - rect.width / 2;
        const offsetY = mousePosition.y - rect.height / 2;

        springX.set(offsetX * 0.1); // Reduced movement for subtle effect
        springY.set(offsetY * 0.1);
      }
    }
  });

  return (
    <section
      ref={container}
      className="md:min-h-[70vh] w-full flex rounded-md relative justify-center antialiased p-8 overflow-hidden"
    >
      {/* Floating Genie Background */}
      <motion.div
        className="absolute w-96 h-96 pointer-events-none left-[40%] top-30 -translate-x-1/2"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          scale: [1, 1.05, 1],
          x: [0, 10, 0],
        }}
        transition={{
          scale: {
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
          x: {
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          },
        }}
      >
        <Image
          src="/genie_1.png"
          alt="Floating Genie"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "contain",
          }}
          className="select-none opacity-70"
        />
      </motion.div>

      <div className="max-w-screen-xl px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-36 relative z-10">
        <div className="space-y-8 max-w-xl">
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary/50 to-secondary/30 px-6 py-3 rounded-full text-white font-semibold text-sm backdrop-blur-sm border border-primary/50 shadow-lg">
            <span className="flex items-center gap-2">
              <span className="animate-pulse">✨</span>
              <span>Now Available - v{version}</span>
              <span className="text-xs opacity-90">•</span>
              <span className="text-xs opacity-90">Released {latestRelease}</span>
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Transform Your Device Setup Experience
          </h1>
          <p className="text-lg md:text-xl opacity-80 leading-relaxed">
            Say goodbye to hours of manual app installations. GenieHQ automates your entire device
            setup process, installing all your essential apps and configurations in minutes, not
            hours.
          </p>
          <div className="flex gap-4">
            <Button asChild className="px-8 py-3 text-base">
              <Link href="#downloads" className="flex items-center gap-2">
                Download Now
              </Link>
            </Button>
            <Button variant="outline" className="text-primary px-8 py-3 text-base" asChild>
              <Link href="#features">See How It Works</Link>
            </Button>
          </div>
        </div>
        <div className="w-full max-w-lg">
          <MotionShineBorder className="p-0" color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
            <Card className="border-0 py-2 px-4">
              <CardHeader>
                <CardTitle className="text-3xl flex items-center gap-2">
                  <span>📬</span>
                  Stay in the Loop
                </CardTitle>
                <CardDescription className="pt-2 text-base">
                  Be the first to know about new features, platform releases, and exclusive updates.
                  Join our community of early adopters.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <EmailForm origin="hero" />
              </CardContent>
            </Card>
          </MotionShineBorder>
        </div>
      </div>
    </section>
  );
}
