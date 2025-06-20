import { Button, buttonVariants } from "@geniehq/ui/components/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@geniehq/ui/components/navigation-menu";
import { Github } from "lucide-react";
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
              <NavigationMenuLink href="/#features" className={buttonVariants({ variant: "link" })}>
                Features
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/#about-us" className={buttonVariants({ variant: "link" })}>
                About Us
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/#faq" className={buttonVariants({ variant: "link" })}>
                FAQ
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink 
                href="https://github.com/IhsenBouallegue/genie-hq" 
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "link" })}
              >
                <Github className="w-4 h-4 mr-1" />
                GitHub
              </NavigationMenuLink>
            </NavigationMenuItem>
            <Button className="md:hidden" disabled>
              Download
            </Button>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
      <SubscribeDialog />
    </header>
  );
}
