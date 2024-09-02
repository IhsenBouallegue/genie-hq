"use client";

import SetupConfiguratorAccordion from "@/components/setup-configurator";
import Image from "next/image";
export default function Home() {
  return (
    <div>
      <Image src="/next.svg" alt="App Icon" width={100} height={100} />
      <SetupConfiguratorAccordion />
    </div>
  );
}
