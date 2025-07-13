"use client";

import { Button } from "@geniehq/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@geniehq/ui/components/dialog";
import { EmailForm } from "./email-form";

export function SubscribeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="hidden md:flex">Subscribe to Newsletter</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Stay Updated with GenieHQ</DialogTitle>
          <DialogDescription>
            Get notified about new features, platform releases, and when GenieHQ becomes available
            on your preferred platform.
          </DialogDescription>
        </DialogHeader>
        <EmailForm origin="setup-tool" />
      </DialogContent>
    </Dialog>
  );
}
