"use client";

import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const icons = [
  {
    src: "/discord.svg",
    depth: 0.1,
  },
  {
    src: "/adobephotoshop.svg",
    depth: 0.2,
  },
  {
    src: "/adobeillustrator.svg",
    depth: 0.3,
  },
  {
    src: "/figma.svg",
    depth: 0.4,
  },
  {
    src: "/git.svg",
    depth: 0.5,
  },
  {
    src: "/vlcmediaplayer.svg",
    depth: 0.6,
  },
  {
    src: "/notion.svg",
    depth: 0.7,
  },
  {
    src: "/zoom.svg",
    depth: 0.8,
  },
  {
    src: "/jupyter.svg",
    depth: 0.9,
  },
  {
    src: "/slack.svg",
    depth: 1,
  },
  {
    src: "/spotify.svg",
    depth: 1.1,
  },
  {
    src: "/postman.svg",
    depth: 1.2,
  },
  {
    src: "/python.svg",
    depth: 1.3,
  },
  {
    src: "/firefox.svg",
    depth: 1.9,
  },
  {
    src: "/figma.svg",
    depth: 2,
  },
  {
    src: "/figma.svg",
    depth: 2.1,
  },
  {
    src: "/figma.svg",
    depth: 2.2,
  },
];

export default function ParallaxBackground() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const parallaxShiftX = useTransform(x, [-200, 200], [-50, 50]);
  const parallaxShiftY = useTransform(y, [-200, 200], [-50, 50]);

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        x.set(offsetX - rect.width / 2);
        y.set(offsetY - rect.height / 2);
      }}
    >
      {icons.map((icon, index) => (
        <motion.img
          key={icon.src}
          src={icon.src}
          alt={`Icon ${index}`}
          style={{
            x: parallaxShiftX,
            y: parallaxShiftY,
          }}
          className="absolute w-12 h-12"
        />
      ))}
    </div>
  );
}
