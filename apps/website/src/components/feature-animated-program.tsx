"use client";

import {
  SiAffinitydesigner,
  SiFirefox,
  SiGooglechrome,
  SiPycharm,
  SiUnity,
  SiVisualstudiocode,
} from "@icons-pack/react-simple-icons";
import { useRef } from "react";

import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { Circle } from "./circle";
import GenieHQLogo from "./geniehq-logo";

export function FeatureAnimatedProgram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative flex w-full items-center justify-center overflow-hidden rounded-lg border  p-6 md:shadow-xl"
      ref={containerRef}
    >
      <div className="flex size-full flex-col max-w-lg items-stretch justify-between gap-6">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <SiPycharm className="text-black" />
          </Circle>
          <Circle ref={div5Ref}>
            <SiGooglechrome className="text-black" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <SiVisualstudiocode className="text-black" />
          </Circle>
          <Circle ref={div4Ref} className="size-16">
            <GenieHQLogo className="text-black" />
          </Circle>
          <Circle ref={div6Ref}>
            <SiFirefox className="text-black" />
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <SiAffinitydesigner className="text-black" />
          </Circle>
          <Circle ref={div7Ref}>
            <SiUnity className="text-black" />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        duration={6}
        delay={0.1}
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
        reverse
      />
      <AnimatedBeam
        duration={6}
        delay={0.2}
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div4Ref}
        reverse
      />
      <AnimatedBeam
        duration={6}
        delay={0.3}
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
        reverse
      />
      <AnimatedBeam
        duration={6}
        delay={0.6}
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div4Ref}
        curvature={-75}
        endYOffset={-10}
      />
      <AnimatedBeam
        duration={6}
        delay={0.5}
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        duration={6}
        delay={0.4}
        containerRef={containerRef}
        fromRef={div7Ref}
        toRef={div4Ref}
        curvature={75}
        endYOffset={10}
      />
    </div>
  );
}
