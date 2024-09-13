import { iconLookup } from "#lib/store/icons";
import type { Application, ApplicationId } from "#lib/store/types";
import SelectableCard from "./selectable-card";

export default function ApplicationCard({
  id,
  title,
  icon,
  onToggle,
  selectedApplicationIds,
  ...rest
}: Application & {
  onToggle: (id: string) => void;
  selectedApplicationIds: ApplicationId[];
}) {
  const isSelected = selectedApplicationIds.includes(id);
  const Icon = iconLookup[icon];
  return (
    <SelectableCard
      id={id}
      title={title}
      icon={Icon}
      isSelected={isSelected}
      onToggle={onToggle}
      enableHover={false}
      enableBorder={false}
      {...rest}
    />
  );
}
