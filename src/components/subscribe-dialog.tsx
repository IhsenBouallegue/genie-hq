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

export function SubscribeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">Download GenieHQ Installer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get Early Access</DialogTitle>
          <DialogDescription>
            Sign up to be notified when our app installer launches. We won't
            email you about anything else.
          </DialogDescription>
        </DialogHeader>
        <EmailForm />
      </DialogContent>
    </Dialog>
  );
}
