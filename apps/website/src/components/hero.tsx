import { Button } from "@geniehq/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@geniehq/ui/components/card";
import { ClockIcon } from "lucide-react";
import Link from "next/link";
import { EmailForm } from "./email-form";
import { MotionShineBorder } from "./magicui/shine-border";
export default function Hero() {
  const today = new Date();
  const launchDate = new Date("2024-08-30");
  // Calculate the difference in days
  const differenceInTime = launchDate.getTime() - today.getTime();
  const differenceInDays = (differenceInTime / (1000 * 3600 * 24)).toFixed(0);

  return (
    <section className="md:min-h-[70vh] w-full flex rounded-md relative justify-center antialiased p-8">
      {/* <GridPattern
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] skew-y-12",
          "blur-sm",
          "-z-20",
        )}
      /> */}
      <div className="max-w-screen-xl px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-36">
        <div className="space-y-8 max-w-xl">
          <div className="flex items-center justify-center gap-2 bg-primary/20 px-4 py-2 rounded-full text-primary font-medium text-sm backdrop-blur-sm">
            <ClockIcon className="w-4 h-4" />

            <span>Launching in {differenceInDays} days</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Setup your new devices easily using GenieHQ
          </h1>
          <p className="text-lg md:text-xl">
            Skip the hassle of manual app installations. Let GenieHQ handle the setup for you,
            ensuring a smooth and stress-free experience with your new devices.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" className="text-primary" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="w-full max-w-lg">
          <MotionShineBorder className="p-0" color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}>
            <Card className="border-0 py-2 px-4">
              <CardHeader>
                <CardTitle className="text-3xl">Get Early Access</CardTitle>
                <CardDescription className="pt-2">
                  Sign up to be notified when our app installer launches. We won't email you about
                  anything else.
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
