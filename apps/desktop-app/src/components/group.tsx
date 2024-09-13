export default function Group({
  label,
  children,
}: { label: string; children: React.ReactNode | React.ReactNode[] }) {
  return (
    <fieldset className="flex flex-col flex-wrap justify-center my-4 gap-3 border rounded-lg md:p-6">
      <legend className="-ml-1 px-1 text-sm font-medium">{label}</legend>
      {children}
    </fieldset>
  );
}
