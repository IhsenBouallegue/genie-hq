"use client";

import { parallaxImages } from "@/lib/store/data";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect } from "react";

export default function ParallaxBackground() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        const rect = document.body.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        x.set(offsetX - rect.width / 2);
        y.set(offsetY - rect.height / 2);
      });
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      const { beta, gamma } = e;
      const sensitivity = 20;

      if (beta !== null && gamma !== null) {
        requestAnimationFrame(() => {
          const motionX = gamma * sensitivity;
          const motionY = beta * sensitivity;

          x.set(motionX);
          y.set(motionY);
        });
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
      {parallaxImages.map((image) => {
        const parallaxShiftX = useTransform(
          x,
          (value) => value * (1 / image.depth) * 0.05,
        );
        const parallaxShiftY = useTransform(
          y,
          (value) => value * (1 / image.depth) * 0.05,
        );

        return (
          <motion.div
            key={image.id}
            style={{
              x: parallaxShiftX,
              y: parallaxShiftY,
              willChange: "transform",
            }}
            className={cn(
              "absolute w-full h-auto bg-no-repeat bg-cover saturate-0 opacity-70",
              image.depth === 2 ? "blur-[1px]" : "",
              image.depth === 3 ? "blur-[1.5px]" : "",
              image.depth === 4 ? "blur-[2px]" : "",
              image.depth === 5 ? "blur-[2.5px]" : "",
            )}
          >
            <img src={image.iconSrc} alt=" " className="w-full h-auto" />
          </motion.div>
        );
      })}
    </div>
  );
}
