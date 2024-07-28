import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronRightIcon, ClockIcon } from "lucide-react";
import { AnimatedSubscribeButton } from "./magicui/animated-subscribe-button";
import { NeonGradientCard } from "./magicui/neon-gradient-card";
import { BackgroundBeams } from "./ui/background-beams";

export default function Hero() {
  return (
    <section className="h-[40rem] w-full rounded-md relative flex flex-col items-center justify-center antialiased">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-8 max-w-xl">
          <div className="flex items-center justify-center gap-2 bg-primary/20 px-4 py-2 rounded-full text-primary font-medium text-sm backdrop-blur-sm">
            <ClockIcon className="w-4 h-4" />
            <span>Launching in 23 days</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Streamline Your Device Setup with Our App Installer
          </h1>
          <p className="text-lg md:text-xl">
            Say goodbye to the hassle of manually installing apps on your new
            devices. Genie does it all for you, making the setup process a
            breeze.
          </p>
          <div className="flex gap-4">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Early Access
            </Button>
            <Button variant="outline" className="text-primary">
              Learn More
            </Button>
          </div>
        </div>
        <div className="w-full max-w-md">
          <NeonGradientCard className="bg-black">
            <Card className="bg-transparent border-0">
              <CardHeader>
                <CardTitle>Get Early Access</CardTitle>
                <CardDescription>
                  Sign up to be notified when our app installer launches. We
                  won't email you about anything else.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full"
                  />
                  <AnimatedSubscribeButton
                    className="w-full flex-1"
                    buttonColor="#333333"
                    buttonTextColor="#ffffff"
                    subscribeStatus={false}
                    initialText={
                      <span className="group inline-flex items-center">
                        Subscribe{" "}
                        <ChevronRightIcon className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    }
                    changeText={
                      <span className="group inline-flex items-center">
                        Subscribed{" "}
                      </span>
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </NeonGradientCard>
        </div>
      </div>
      <BackgroundBeams />
    </section>
  );
}
