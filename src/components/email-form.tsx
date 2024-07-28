"use client";

import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { AnimatedSubscribeButton } from "./magicui/animated-subscribe-button";
import { Input } from "./ui/input";

export function EmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "initial" | "loading" | "success" | "fail"
  >("initial");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("fail");
        setMessage(data.error ? data.error[0].message : "Failed to subscribe");
      }
    } catch (error) {
      setStatus("fail");
      setMessage("Failed to subscribe");
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
        <AnimatedSubscribeButton status={status}>
          <AnimatedSubscribeButton.Base className="w-full flex-1 bg-blue-500 text-white">
            <span className="group inline-flex items-center">
              Subscribe
              <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </AnimatedSubscribeButton.Base>
          <AnimatedSubscribeButton.Success className="w-full flex-1 bg-green-500 text-white">
            <span className="group inline-flex items-center">Subscribed</span>
          </AnimatedSubscribeButton.Success>
          <AnimatedSubscribeButton.Loading className="w-full flex-1 bg-gray-500 text-white">
            <span className="group inline-flex items-center">Loading...</span>
          </AnimatedSubscribeButton.Loading>
          <AnimatedSubscribeButton.Failed className="w-full flex-1 bg-red-500 text-white">
            <span className="group inline-flex items-center">Failed</span>
          </AnimatedSubscribeButton.Failed>
        </AnimatedSubscribeButton>
      </form>
    </div>
  );
}
