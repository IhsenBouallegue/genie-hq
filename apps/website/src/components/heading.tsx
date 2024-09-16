import type { ReactNode } from "react";

export default function Heading({ children }: { children: ReactNode }) {
  return <h2 className="text-3xl sm:text-5xl mb-6 font-bold text-center">{children}</h2>;
}
