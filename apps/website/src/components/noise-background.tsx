import type { ReactNode } from "react";

interface NoiseBackgroundProps {
  children: ReactNode;
}

export function NoiseBackground({ children }: NoiseBackgroundProps) {
  return (
    <div className="  bg-gradient-to-b from-primary/10  to-zinc-900/15">
      <div
        style={{
          backgroundImage: "url('/noise.png')", // Path to the noise image
          backgroundSize: "200px 200px", // Repeat the image at its native resolution (200x200)
          backgroundRepeat: "repeat", // Repeat the noise image
          backgroundBlendMode: "overlay", // Blend the noise with your background color
        }}
      >
        {children}
      </div>
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
          baseFrequency="0.5" /* Adjust base frequency for noise density */
          numOctaves="1"
          stitchTiles="stitch"
        />
        {/* Convert noise to grayscale using feColorMatrix */}
        <feColorMatrix type="saturate" values="0" /* 0 saturation to make the noise grayscale */ />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}
