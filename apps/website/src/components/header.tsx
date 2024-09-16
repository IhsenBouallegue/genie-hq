import { DownloadIcon } from "lucide-react";

import { Button, buttonVariants } from "@geniehq/ui/components/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@geniehq/ui/components/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { SubscribeDialog } from "./subscribe-dialog";

export default function Header() {
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6 max-w-screen-lg m-auto">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <Image src="/geniehq_logo.svg" alt="GenieHQ" width={32} height={32} />
        <span className="text-lg font-semibold">GenieHQ</span>
      </Link>
      <nav className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/#features" legacyBehavior passHref>
                <NavigationMenuLink className={buttonVariants({ variant: "link" })}>
                  Features
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/#about-us" legacyBehavior passHref>
                <NavigationMenuLink className={buttonVariants({ variant: "link" })}>
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/#faq" legacyBehavior passHref>
                <NavigationMenuLink className={buttonVariants({ variant: "link" })}>
                  FAQ
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <Button className="md:hidden" disabled>
              Download
            </Button>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      <SubscribeDialog>
        <Button className="hidden md:flex">
          <DownloadIcon className="h-4 w-4 mr-2" />
          Download
        </Button>
      </SubscribeDialog>
    </header>
  );
}
