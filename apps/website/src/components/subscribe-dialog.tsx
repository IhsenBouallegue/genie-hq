"use client";

import { Button } from "@geniehq/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@geniehq/ui/components/ui/dialog";
import { EmailForm } from "./email-form";

export function SubscribeDialog({
  disabled,
  children = <Button disabled={disabled}>Download GenieHQ Installer</Button>,
}: { disabled?: boolean; children?: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Be the first to the party!</DialogTitle>
          <DialogDescription>
            We are still working hard on GenieHQ. But we will let you know as
            soon as we are ready.
          </DialogDescription>
        </DialogHeader>
        <EmailForm origin="setup-tool" />
      </DialogContent>
    </Dialog>
  );
}
