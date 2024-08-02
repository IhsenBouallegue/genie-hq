export default function StepContainer({
  children,
}: { children: React.ReactNode | React.ReactNode[] }) {
  return (
    <div className="flex flex-col flex-wrap justify-center my-4 gap-3 border rounded-md p-4 md:p-6">
      {children}
    </div>
  );
}
