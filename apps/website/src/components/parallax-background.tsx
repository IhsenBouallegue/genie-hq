"use client";

import { parallaxImages } from "@/lib/store/data";
import useDeviceOrientation from "@/lib/use-device-orientation"; // Import the device orientation hook
import useMousePosition from "@/lib/use-mouse-position";
import { cn } from "@/lib/utils";
import { motion, useAnimationFrame, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ParallaxBackground() {
  const [isMobile, setIsMobile] = useState(false); // State to track if the device is mobile

  // Use appropriate hook based on the device
  const mousePosition = useMousePosition();
  const deviceOrientation = useDeviceOrientation();

  const container = useRef<HTMLDivElement>(null);
  const parallaxRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Adjust spring settings for smooth motion
  const springConfig = { stiffness: 40, damping: 20 };

  // Initialize spring values for x and y movement
  const springX = useSpring(0, springConfig);
  const springY = useSpring(0, springConfig);

  // Check if the device is mobile based on the screen width or pointer type
  useEffect(() => {
    const checkIfMobile = () => {
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkIfMobile(); // Initial check
    window.addEventListener("resize", checkIfMobile); // Re-check on resize

    return () => {
      window.removeEventListener("resize", checkIfMobile); // Cleanup on unmount
    };
  }, []);

  useAnimationFrame(() => {
    const rect = container.current?.getBoundingClientRect();

    if (rect) {
      let offsetX = 0;
      let offsetY = 0;

      // Use device orientation on mobile, otherwise use mouse position for desktop
      if (isMobile) {
        offsetX = deviceOrientation.x;
        offsetY = deviceOrientation.y;
      } else if (mousePosition.x !== null && mousePosition.y !== null) {
        offsetX = mousePosition.x - rect.width / 2;
        offsetY = mousePosition.y - rect.height / 2;
      }

      // Update spring values based on the detected device input
      springX.set(offsetX);
      springY.set(offsetY);
    }

    // Apply the spring values to each parallax element
    parallaxImages.forEach((image, index) => {
      const depthFactor = (1 / image.depth) * 0.2;
      const element = parallaxRefs.current[index];

      if (element) {
        element.style.transform = `translate(${springX.get() * depthFactor}px, ${springY.get() * depthFactor}px)`;
      }
    });
  });

  return (
    <div
      className={cn(
        "absolute h-[100vh] w-full -z-10 overflow-x-clip overflow-y-visible md:w-full",
      )}
      ref={container}
    >
      {parallaxImages.map((image, index) => (
        <motion.div
          key={image.id}
          ref={(el) => {
            if (el) {
              parallaxRefs.current[index] = el; // Store ref for each parallax element
            }
          }}
          className={cn(
            "absolute h-full w-full opacity-70 origin-center",
            image.depth === 2 && "blur-[1px]",
            image.depth === 3 && "blur-[1.5px]",
            image.depth === 4 && "blur-[2px]",
            image.depth === 5 && "blur-[2.5px]",
          )}
        >
          <Image
            src={image.iconSrc}
            alt=" "
            className="w-full h-full object-cover"
            fill
          />
        </motion.div>
      ))}
    </div>
  );
}
