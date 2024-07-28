import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ClockIcon } from "lucide-react";
import { EmailForm } from "./email-form";
import GridPattern from "./magicui/grid-pattern";
import { NeonGradientCard } from "./magicui/neon-gradient-card";

export default function Hero() {
  return (
    <section className="h-[80vh] w-full rounded-md relative flex flex-col items-center justify-center antialiased p-8">
      <GridPattern
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%]  skew-y-12",
          "bg-gradient-to-br from-primary/10 to-primary/5",
        )}
      />
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
                <EmailForm />
              </CardContent>
            </Card>
          </NeonGradientCard>
        </div>
      </div>
    </section>
  );
}
