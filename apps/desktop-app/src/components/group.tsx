import { cn } from "@geniehq/ui/lib/utils";

export default function Group({
  label,
  children,
  className,
  ...rest
}: {
  label: string;
  children: React.ReactNode | React.ReactNode[];
} & React.HTMLAttributes<HTMLFieldSetElement>) {
  return (
    <fieldset
      className={cn(
        "flex flex-col flex-wrap justify-center gap-3 border rounded-lg md:p-6",
        className,
      )}
      {...rest}
    >
      <legend className="-ml-1 px-1 text-sm font-medium">{label}</legend>
      {children}
    </fieldset>
  );
}
