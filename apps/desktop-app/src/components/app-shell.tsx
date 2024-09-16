"use client";

import Header from "./header";
import Sidebar from "./sidebar";

export function AppShell({
  children,
}: Readonly<{ children: React.ReactNode | React.ReactNode[] }>) {
  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <Sidebar />
      </div>
      <div>
        <Header />
        <div className="h-[calc(100vh-3.5rem)] lg:h-[calc(100vh-60px)] overflow-y-scroll">
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
