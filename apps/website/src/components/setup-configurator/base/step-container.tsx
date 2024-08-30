export default function StepContainer({
  children,
}: { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <div className="flex flex-col flex-wrap justify-center my-4 gap-3 md:border rounded-md md:p-6">
      {children}
    </div>
  );
}
