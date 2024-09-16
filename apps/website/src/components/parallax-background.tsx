"use client";

import { parallaxImages } from "@/lib/store/data";
import useMousePosition from "@/lib/use-mouse-position"; // Import the mouse position hook
import { cn } from "@/lib/utils";
import { motion, useAnimationFrame, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function ParallaxBackground() {
  const [isMobile, setIsMobile] = useState(false); // State to track if the device is mobile

  // Use the mouse position hook for desktop
  const mousePosition = useMousePosition();

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

  // Only apply parallax animation on desktop
  useAnimationFrame(() => {
    if (!isMobile) {
      const rect = container.current?.getBoundingClientRect();

      if (rect && mousePosition.x !== null && mousePosition.y !== null) {
        const offsetX = mousePosition.x - rect.width / 2;
        const offsetY = mousePosition.y - rect.height / 2;

        // Update spring values based on the mouse position
        springX.set(offsetX);
        springY.set(offsetY);

        // Apply the spring values to each parallax element
        parallaxImages.forEach((image, index) => {
          const depthFactor = (1 / image.depth) * 0.2;
          const element = parallaxRefs.current[index];

          if (element) {
            element.style.transform = `translate(${springX.get() * depthFactor}px, ${springY.get() * depthFactor}px)`;
          }
        });
      }
    }
  });

  return (
    <div
      className={cn("absolute h-[100vh] w-full -z-10 overflow-x-clip overflow-y-visible md:w-full")}
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
          <Image src={image.iconSrc} alt=" " className="w-full h-full object-cover" fill />
        </motion.div>
      ))}
    </div>
  );
}
