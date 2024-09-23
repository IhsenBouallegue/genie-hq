import { Button } from "@geniehq/ui/components/button";
import { Card, CardHeader, CardTitle, CardContent } from "@geniehq/ui/components/card";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@geniehq/ui/components/tooltip";
import { AlertTriangleIcon, ClockIcon, CloudIcon, CodeIcon } from "lucide-react";

interface UpcomingFeaturesWidgetProps {
  enabled: boolean;
}

export function UpcomingFeaturesWidget({ enabled }: UpcomingFeaturesWidgetProps) {
  return (
    <Card
      className={`transition-opacity duration-300 ${enabled ? "opacity-100" : "opacity-50 pointer-events-none"}`}
    >
      <CardHeader>
        <CardTitle>Upcoming Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="justify-start w-full">
                  <CloudIcon className="mr-2 h-4 w-4" />
                  Cloud Sync
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming Soon</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="justify-start w-full">
                  <CodeIcon className="mr-2 h-4 w-4" />
                  Custom Scripts
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming Soon</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="justify-start w-full">
                  <AlertTriangleIcon className="mr-2 h-4 w-4" />
                  Security Advisor
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming Soon</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="justify-start w-full">
                  <ClockIcon className="mr-2 h-4 w-4" />
                  Scheduled Tasks
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming Soon</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
