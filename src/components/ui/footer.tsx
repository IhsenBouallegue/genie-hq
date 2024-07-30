import Link from "next/link";
import { buttonVariants } from "./button";

function Footer() {
  return (
    <footer className="bg-background border-t py-8 md:py-12 mt-28">
      <div className="container flex flex-col items-center justify-center gap-6">
        <Link
          className={buttonVariants({ variant: "link" })}
          href="/privacy-policy"
        >
          Privacy Policy
        </Link>
        <p className="text-sm text-muted-foreground">
          &copy; 2024 GenieHQ. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
export default Footer;
