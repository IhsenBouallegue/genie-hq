"use client";

import { EmailForm } from "./email-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

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
