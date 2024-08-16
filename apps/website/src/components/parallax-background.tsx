"use client";

import { parallaxIcons } from "@/lib/store/data";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function ParallaxBackground() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
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
      const { beta, gamma } = e;
      const sensitivity = 25;

      if (beta !== null && gamma !== null) {
        const motionX = gamma * sensitivity;
        const motionY = beta * sensitivity;

        x.set(motionX);
        y.set(motionY);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleDeviceOrientation);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener(
          "deviceorientation",
          handleDeviceOrientation,
        );
      }
    };
  }, [x, y]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Call initially in case the page loads on mobile

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  // Calculate the displayed icons but always keep the hook structure consistent
  const displayedIcons = isMobile ? parallaxIcons.slice(0, 5) : parallaxIcons;

  return (
    <div className={"absolute h-[100vh] w-full -z-10 overflow-hidden"}>
      {parallaxIcons.map((icon, index) => {
        const parallaxShiftX = useTransform(
          springX,
          (value) => value * (1 / icon.depth) * 0.2,
        );
        const parallaxShiftY = useTransform(
          springY,
          (value) => value * (1 / icon.depth) * 0.2,
        );

        // Check if the icon is supposed to be displayed
        if (index >= displayedIcons.length) return null;

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
