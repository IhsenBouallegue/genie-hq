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

  return (
    <SelectableCard
      id={id}
      title={title}
      icon={icon}
      isSelected={isSelected}
      onToggle={onToggle}
      enableHover={false}
      enableBorder={false}
      {...rest}
    />
  );
}
