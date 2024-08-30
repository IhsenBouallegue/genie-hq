import React from "react";
import type { Application } from "#lib/store/types";
import { useStore } from "#lib/store/useStore";
import SelectableCard from "./selectable-card";

export default function ApplicationCard({
  id,
  title,
  icon,
  ...rest
}: Application) {
  const toggleApplication = useStore((state) => state.toggleApplication);
  const isSelected = useStore((state) =>
    state.selectedApplicationIds.includes(id),
  );

  return (
    <SelectableCard
      id={id}
      title={title}
      icon={icon}
      isSelected={isSelected}
      onToggle={toggleApplication}
      enableHover={false}
      enableBorder={false}
      {...rest}
    />
  );
}
