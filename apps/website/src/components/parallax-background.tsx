"use client";

import { parallaxIcons } from "@/lib/store/data";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

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
    parallaxIcons.map(() => ({
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

  const iconSize: Record<number, number> = {
    1: 16,
    2: 14,
    3: 12,
    4: 10,
    5: 8,
    6: 6,
  };

  const iconPadding: Record<number, number> = {
    1: 3,
    2: 3,
    3: 3,
    4: 2,
    5: 2,
    6: 2,
  };

  return (
    <div
      className={`absolute h-[100vh] w-full -z-10 overflow-hidden top-${window.innerWidth <= 768 ? 32 : 12}`}
    >
      {parallaxIcons
        .slice(0, window.innerWidth <= 768 ? 10 : parallaxIcons.length)
        .map((icon, index) => {
          const parallaxShiftX = useTransform(
            springX,
            (value) => value * (1 / icon.depth) * 0.2,
          );
          const parallaxShiftY = useTransform(
            springY,
            (value) => value * (1 / icon.depth) * 0.2,
          );

          return (
            <motion.div
              key={icon.id}
              style={{
                x: parallaxShiftX,
                y: parallaxShiftY,
                left: `${positions[index]?.left}%`,
                top: `${positions[index]?.top}%`,
              }}
              className={`absolute size-${iconSize[icon.depth]} backdrop-blur-[2px] rounded-lg p-${iconPadding[icon.depth]} bg-gray-200/20`}
            >
              {React.createElement(icon.icon, {
                className: "text-zinc-400 m-auto w-full h-full",
              })}
            </motion.div>
          );
        })}
    </div>
  );
}
