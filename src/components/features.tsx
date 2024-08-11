import { SiApple, SiLinux, SiWindows11 } from "@icons-pack/react-simple-icons";
import {
  CheckSquareIcon,
  LayoutIcon,
  MonitorSmartphoneIcon,
  Settings2Icon,
  UserRound,
} from "lucide-react";
import { Circle } from "./circle";
import FeatureAccountSync from "./feature-accounts-sync";
import { FeatureAnimatedProgram } from "./feature-animated-program";
import Heading from "./heading";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

export function Features() {
  return (
    <section id="features">
      <Heading>Discover GenieHQ</Heading>
      <BentoGrid className="max-w-6xl mx-auto p-6">
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
    title: "Effortless Setup",
    description:
      "Experience the simplicity of setting up your device with Genie HQ. Automatically install essential programs and applications tailored to your needs.",
    header: <FeatureAnimatedProgram />,
    className: "md:col-span-2",
    icon: <CheckSquareIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Cross-Platform Compatibility",
    description:
      "Windows, macOS, and Linux, doesn't matter. We got you covered.",
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
    className: "md:col-span-1",
    icon: <MonitorSmartphoneIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Account Sync",
    description:
      "Sync your Genie HQ account across multiple devices for a consistent and up-to-date setup.",
    header: <FeatureAccountSync />,
    className: "md:col-span-1",
    icon: <LayoutIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Personalized Profile",
    description:
      "Discover the beauty of a personalized setup. Genie HQ installs applications based on your role, whether you're a developer, designer, or casual user.",
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
    className: "md:col-span-2",
    icon: <Settings2Icon className="h-4 w-4 text-neutral-500" />,
  },
];
