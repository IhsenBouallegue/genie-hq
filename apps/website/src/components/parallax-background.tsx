"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const icons = [
  { src: "/discord.svg", depth: 0.1 },
  { src: "/adobephotoshop.svg", depth: 0.4 },
  { src: "/adobeillustrator.svg", depth: 0.6 },
  { src: "/figma.svg", depth: 0.8 },
  { src: "/git.svg", depth: 1.0 },
  { src: "/vlcmediaplayer.svg", depth: 1.2 },
  { src: "/notion.svg", depth: 1.5 },
  { src: "/zoom.svg", depth: 1.8 },
  { src: "/jupyter.svg", depth: 2.0 },
  { src: "/slack.svg", depth: 2.2 },
  { src: "/spotify.svg", depth: 2.5 },
  { src: "/postman.svg", depth: 2.8 },
  { src: "/python.svg", depth: 3.0 },
  { src: "/firefox.svg", depth: 3.5 },
  { src: "/figma.svg", depth: 4.0 },
  { src: "/figma.svg", depth: 4.5 },
  { src: "/figma.svg", depth: 5.0 },
];

export default function ParallaxBackground() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [positions, setPositions] = useState(
    icons.map(() => ({
      left: Math.random() * 80 + 10,
      top: Math.random() * 80 + 10,
    })),
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.body.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      x.set(offsetX - rect.width / 2);
      y.set(offsetY - rect.height / 2);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y]);

  return (
    <div className="parallax-background relative w-full h-full overflow-hidden">
      {icons.map((icon, index) => {
        const parallaxShiftX = useTransform(x, (value) => value * icon.depth);
        const parallaxShiftY = useTransform(y, (value) => value * icon.depth);

        return (
          <motion.img
            key={`${icon.src}-${index}`}
            src={icon.src}
            alt={`Icon ${index}`}
            style={{
              x: parallaxShiftX,
              y: parallaxShiftY,
              left: `${positions[index]?.left}%`,
              top: `${positions[index]?.top}%`,
            }}
            className="absolute w-12 h-12"
          />
        );
      })}
    </div>
  );
}
