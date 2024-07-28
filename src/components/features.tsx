import {
  CheckSquareIcon,
  LayoutIcon,
  MonitorSmartphoneIcon,
  Settings2Icon,
} from "lucide-react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

export function Features() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] p-6">
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
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black" />
);
const items = [
  {
    title: "Effortless Setup",
    description:
      "Experience the simplicity of setting up your device with Genie HQ. Automatically install essential programs and applications tailored to your needs.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <CheckSquareIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Cross-Platform Compatibility",
    description:
      "Enjoy seamless installation on any device. Genie HQ supports Windows, macOS, and Linux, ensuring you have the right tools, regardless of your operating system.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <MonitorSmartphoneIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Streamlined Experience",
    description:
      "Understand the impact of a streamlined installation process. Genie HQ provides a smooth, user-friendly experience to get your device up and running quickly.",
    header: <Skeleton />,
    className: "md:col-span-1",
    icon: <LayoutIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Personalized Configuration",
    description:
      "Discover the beauty of a personalized setup. Genie HQ installs applications based on your role, whether you're a developer, designer, or casual user.",
    header: <Skeleton />,
    className: "md:col-span-2",
    icon: <Settings2Icon className="h-4 w-4 text-neutral-500" />,
  },
];
