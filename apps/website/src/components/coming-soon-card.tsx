import type { ApplicationId, Category } from "@/lib/store/types";
import { useStore } from "@/lib/store/useStore";
import React, { type ComponentType } from "react";
import SelectableComingSoonCard from "./selectable-coming-soon-card";

interface Application {
  id: ApplicationId;
  title: string;
  icon: string;
  category: Category;
}

export default function ComingSoonCard({
  id,
  title,
  icon,
  ...rest
}: Application) {
  const toggleApplication = useStore((state) => state.toggleApplication);

  return (
    <SelectableComingSoonCard
      id={id}
      title={"Coming soon"}
      icon={icon}
      isSelected={false}
      onToggle={() => {}}
      enableHover={false}
      enableBorder={false}
      {...rest}
    />
  );
}
