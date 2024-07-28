import { Button } from "@/components/ui/button";
import { AppWindowIcon } from "lucide-react";

import Link from "next/link";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

export default function Header() {
	return (
		<header className="flex h-16 w-full items-center justify-between bg-background px-4 md:px-6 max-w-screen-lg m-auto">
			<Link href="#" className="flex items-center gap-2" prefetch={false}>
				<AppWindowIcon className="h-6 w-6" />
				<span className="text-lg font-semibold">Genie HQ</span>
			</Link>
			<nav className="hidden md:flex">
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<Link href="/" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									FAQ
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<NavigationMenuItem>
							<Link href="/" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									About Us
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>{" "}
						<NavigationMenuItem>
							<Link href="/" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Pricing
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
						<Button className="md:hidden" disabled>
							Download
						</Button>
					</NavigationMenuList>
				</NavigationMenu>
			</nav>
			{/* disabled download button */}
			<Button className="hidden md:flex" disabled>
				Download
			</Button>
		</header>
	);
}
