"use client";

import { DatabaseIcon } from "lucide-react";
import { useRef } from "react";
import { Circle } from "./circle";
import GenieHQLogo from "./geniehq-logo";
import { AnimatedBeam } from "./magicui/animated-beam";

export default function FeatureAccountSync() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden rounded-lg border p-6 md:shadow-xl"
      ref={containerRef}
    >
      <div className="flex h-full w-full flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row justify-between">
          <Circle ref={div1Ref}>
            <GenieHQLogo className="text-black" />
          </Circle>
          <Circle ref={div5Ref}>
            <DatabaseIcon className="text-black" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={div1Ref} toRef={div5Ref} />
      <AnimatedBeam
        delay={2}
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div5Ref}
        reverse
      />
    </div>
  );
}
