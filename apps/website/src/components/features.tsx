import { BentoGrid, BentoGridItem } from "@geniehq/ui/components/bento-grid";
import { SiApple, SiLinux, SiWindows11 } from "@icons-pack/react-simple-icons";
import {
  CheckSquareIcon,
  KeyIcon,
  LayoutIcon,
  LockKeyhole,
  MonitorSmartphoneIcon,
  Settings2Icon,
  ShieldCheckIcon,
  TerminalIcon,
  UserRound,
} from "lucide-react";
import { Circle } from "./circle";
import FeatureAccountSync from "./feature-accounts-sync";
import { FeatureAnimatedProgram } from "./feature-animated-program";
import Heading from "./heading";

export function Features() {
  return (
    <section className="max-w-6xl" id="features">
      <Heading>Discover GenieHQ</Heading>
      <BentoGrid className=" p-6">
        {items.map((item) => (
          <BentoGridItem
            key={item.title}
            title={item.title}
            description={item.description}
            header={item.header}
            className={item.className}
            icon={item.icon}
          />
        ))}
      </BentoGrid>
    </section>
  );
}

const items = [
  {
    title: "Security and Transparency",
    description:
      "We source all apps from official repositories, using winget, brew and scoop for transparent, secure installations.",
    header: (
      <div className="h-full flex items-center justify-center gap-8 rounded-lg border p-6 md:shadow-xl">
        <Circle>
          <ShieldCheckIcon strokeWidth={2.5} className="text-green-600" />
        </Circle>
        <Circle>
          <LockKeyhole strokeWidth={2.5} className="text-black" />
        </Circle>
      </div>
    ),
    className: "md:col-span-3",
    icon: <ShieldCheckIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "No Admin Rights",
    description:
      "Install applications without admin rights using the scoop package manager, allowing for a smoother setup process.",
    header: (
      <div className="h-full flex items-center justify-center gap-8 rounded-lg border p-6 md:shadow-xl">
        <Circle>
          <KeyIcon strokeWidth={2.5} className="text-yellow-500" />
        </Circle>
        <Circle>
          <TerminalIcon strokeWidth={2.5} className="text-black" />
        </Circle>
      </div>
    ),
    className: "md:col-span-3",
    icon: <KeyIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Effortless Setup",
    description:
      "Experience the simplicity of setting up your device with GenieHQ. Automatically install essential programs and applications tailored to your needs.",
    header: <FeatureAnimatedProgram />,
    className: "md:col-span-4",
    icon: <CheckSquareIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Cross-Platform Compatibility",
    description: "Windows, macOS, and Linux, doesn't matter. We got you covered.",
    header: (
      <div className="h-full flex items-center justify-center gap-8 rounded-lg border p-6 md:shadow-xl">
        <Circle>
          <SiApple className="text-black" />
        </Circle>
        <Circle>
          <SiWindows11 className="text-black" />
        </Circle>
        <Circle>
          <SiLinux className="text-black" />
        </Circle>
      </div>
    ),
    className: "md:col-span-2",
    icon: <MonitorSmartphoneIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Account Sync",
    description:
      "Sync your GenieHQ account across multiple devices for a consistent and up-to-date setup.",
    header: <FeatureAccountSync />,
    className: "md:col-span-2",
    icon: <LayoutIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Personalized Profile",
    description:
      "Discover the beauty of a personalized setup. GenieHQ installs applications based on your role, whether you're a developer, designer, or casual user.",
    header: (
      <div className="h-full flex items-center justify-center gap-8 rounded-lg border p-6 md:shadow-xl">
        <Circle className="bg-pink-700">
          <UserRound />
        </Circle>
        <Circle className="bg-orange-700">
          <UserRound />
        </Circle>
        <Circle className="bg-blue-700">
          <UserRound />
        </Circle>
        <Circle className="bg-purple-700">
          <UserRound />
        </Circle>
      </div>
    ),
    className: "md:col-span-4",
    icon: <Settings2Icon className="h-4 w-4 text-neutral-500" />,
  },
];
