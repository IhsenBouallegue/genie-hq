"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

const icons = [
  { src: "/discord.svg", depth: 0.05 },
  { src: "/adobephotoshop.svg", depth: 0.1 },
  { src: "/adobeillustrator.svg", depth: 0.15 },
  { src: "/figma.svg", depth: 0.2 },
  { src: "/git.svg", depth: 0.25 },
  { src: "/vlcmediaplayer.svg", depth: 0.3 },
  { src: "/notion.svg", depth: 0.35 },
  { src: "/zoom.svg", depth: 0.4 },
  { src: "/jupyter.svg", depth: 0.45 },
  { src: "/slack.svg", depth: 0.5 },
  { src: "/spotify.svg", depth: 0.55 },
  { src: "/postman.svg", depth: 0.6 },
  { src: "/python.svg", depth: 0.65 },
  { src: "/firefox.svg", depth: 0.7 },
  { src: "/figma.svg", depth: 0.75 },
  { src: "/figma.svg", depth: 0.8 },
  { src: "/figma.svg", depth: 0.85 },
];

export default function ParallaxBackground() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 40,
    damping: 20,
    mass: 0.2,
  });

  const springY = useSpring(y, {
    stiffness: 40,
    damping: 20,
    mass: 0.2,
  });

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

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      const { beta, gamma } = e; // We use beta and gamma for tilt
      // Beta is front-to-back tilt, gamma is left-to-right tilt

      const sensitivity = 25; // Control the sensitivity of the effect

      if (beta !== null && gamma !== null) {
        // Adjust the x and y values based on orientation
        const motionX = gamma * sensitivity; // Gamma controls the horizontal axis
        const motionY = beta * sensitivity; // Beta controls the vertical axis

        x.set(motionX);
        y.set(motionY);
      }
    };

    // Detect mouse movements (for desktops)
    document.addEventListener("mousemove", handleMouseMove);

    // Detect orientation (for mobile devices)
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    return () => {
      // Cleanup event listeners
      document.removeEventListener("mousemove", handleMouseMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener(
          "deviceorientation",
          handleDeviceOrientation,
        );
      }
    };
  }, [x, y]);

  return (
    <div className="absolute h-[100vh] w-full -z-10 overflow-hidden">
      {icons.map((icon, index) => {
        const parallaxShiftX = useTransform(
          springX,
          (value) => value * icon.depth * 0.2,
        );
        const parallaxShiftY = useTransform(
          springY,
          (value) => value * icon.depth * 0.2,
        );

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
