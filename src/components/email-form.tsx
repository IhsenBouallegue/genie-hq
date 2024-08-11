"use client";

import { cn } from "@/lib/utils";
import { track } from "@vercel/analytics/react";
import confetti from "canvas-confetti";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AnimatedSubscribeButton from "./magicui/animated-subscribe-button";
import { buttonVariants } from "./ui/button";
import { Input } from "./ui/input";

const startConfetti = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};

export function EmailForm({ origin }: { origin: "hero" | "setup-tool" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "default" | "loading" | "success" | "failed"
  >("default");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    track("subscribed", { email, origin });
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // const data = await response.json();

      if (response.ok) {
        setTimeout(() => {
          setStatus("success");
          startConfetti();
          setEmail("");
        }, 300);
      } else {
        setStatus("failed");
      }
    } catch (error) {
      setStatus("failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Enter your email"
          className="w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <AnimatedSubscribeButton
          status={status}
          className="w-full flex-1"
          defaultText={
            <span className="group inline-flex items-center">
              Subscribe
              <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          }
          successText={
            <span className="group inline-flex items-center">Subscribed</span>
          }
          loadingText={
            <span className="group inline-flex items-center">Loading...</span>
          }
          failedText={
            <span className="group inline-flex items-center">Failed</span>
          }
        />
        <p className="text-sm text-muted-foreground">
          By subscribing, you agree to our{" "}
          <Link
            className={cn(buttonVariants({ variant: "link" }), "px-0")}
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
