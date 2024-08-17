"use client";

import { parallaxImages } from "@/lib/store/data";
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

  return (
    <div className="absolute h-[100vh] w-full -z-10 overflow-x-clip overflow-y-visible">
      {parallaxImages.map((image, index) => {
        const parallaxShiftX = useTransform(
          springX,
          (value) => value * (1 / image.depth) * 0.2,
        );
        const parallaxShiftY = useTransform(
          springY,
          (value) => value * (1 / image.depth) * 0.2,
        );

        return (
          <motion.div
            key={image.id}
            style={{
              x: parallaxShiftX,
              y: parallaxShiftY,
            }}
            className="absolute w-full h-auto bg-no-repeat bg-cover"
          >
            <img src={image.iconSrc} alt=" " className="w-full h-auto" />
          </motion.div>
        );
      })}
    </div>
  );
}
