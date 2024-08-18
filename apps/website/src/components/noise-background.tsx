import React, { type ReactNode } from "react";

interface NoiseBackgroundProps {
  children: ReactNode;
}

export function NoiseBackground({ children }: NoiseBackgroundProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-primary/5 to-zinc-900/15">
      <NoiseSvg />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export function NoiseSvg() {
  return (
    <svg
      className="absolute inset-0 z-0 w-full h-full opacity-10"
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      role="img"
      aria-hidden="true"
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.4"
          numOctaves="1"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}
