import { buttonVariants } from "@geniehq/ui/components/button";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-background border-t py-8 md:py-12 mt-28">
      <div className="container flex flex-col items-center justify-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Link className={buttonVariants({ variant: "link" })} href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className={buttonVariants({ variant: "link" })} href="/impressum">
            Impressum
          </Link>
          <Link
            className={buttonVariants({ variant: "link" })}
            href="https://github.com/IhsenBouallegue/genie-hq"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="w-4 h-4 mr-1" />
            GitHub
          </Link>
          <Link
            className={buttonVariants({ variant: "link" })}
            href="https://github.com/IhsenBouallegue/genie-hq/releases"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            Releases
          </Link>
        </div>
        <p className="text-sm text-muted-foreground text-center">
          &copy; 2024 GenieHQ. All rights reserved. Open source software for automating device
          setup.
        </p>
      </div>
    </footer>
  );
}
export default Footer;
