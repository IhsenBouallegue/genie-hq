import { ChevronRightIcon } from "lucide-react";
import { AnimatedSubscribeButton } from "./magicui/animated-subscribe-button";
import { Input } from "./ui/input";

export function EmailForm() {
  return (
    <div className="flex flex-col gap-4">
      <Input type="email" placeholder="Enter your email" className="w-full" />
      <AnimatedSubscribeButton
        className="w-full flex-1"
        buttonColor="#333333"
        buttonTextColor="#ffffff"
        subscribeStatus={false}
        initialText={
          <span className="group inline-flex items-center">
            Subscribe
            <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        }
        changeText={
          <span className="group inline-flex items-center">Subscribed</span>
        }
      />
    </div>
  );
}
