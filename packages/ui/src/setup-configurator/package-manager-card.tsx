import { iconLookup } from "#lib/store/icons";
import type { PackageManager, PackageManagerInfo } from "#lib/store/types";
import SelectableCard from "./selectable-card";

export default function PackageManagerCard({
  name,
  icon,
  onToggle,
  selectedPackageManager,
  ...rest
}: Pick<PackageManagerInfo, "icon" | "name"> & {
  onToggle: (id: string) => void;
  selectedPackageManager: PackageManager[];
}) {
  const isSelected = selectedPackageManager.includes(name);
  const Icon = iconLookup[icon];
  return (
    <SelectableCard
      id={name}
      title={name}
      icon={Icon}
      isSelected={isSelected}
      onToggle={onToggle}
      enableHover={false}
      enableBorder={false}
      {...rest}
    />
  );
}
