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

export function SubscribeDialog({ disabled }: { disabled?: boolean }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled}>Download GenieHQ Installer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Be the first to the party!</DialogTitle>
          <DialogDescription>
            We are still working hard on GenieHQ. But we will let you know as
            soon as we are ready.
          </DialogDescription>
        </DialogHeader>
        <EmailForm />
      </DialogContent>
    </Dialog>
  );
}
