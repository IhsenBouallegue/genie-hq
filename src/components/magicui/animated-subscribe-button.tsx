"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { buttonVariants } from "../ui/button";

interface AnimatedSubscribeButtonProps {
  status: "default" | "loading" | "success" | "failed";
  className?: string;
  defaultText: React.ReactElement | string;
  successText: React.ReactElement | string;
  loadingText: React.ReactElement | string;
  failedText: React.ReactElement | string;
}

const AnimatedSubscribeButton: React.FC<AnimatedSubscribeButtonProps> = ({
  status,
  className,
  defaultText,
  successText,
  loadingText,
  failedText,
}) => {
  return (
    <AnimatePresence mode="wait">
      {status === "default" && (
        <motion.button
          type="submit"
          className={cn(buttonVariants(), className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="default-span"
            className="relative block font-semibold"
            initial={{ x: 0 }}
            exit={{ x: 50 }}
          >
            {defaultText}
          </motion.span>
        </motion.button>
      )}
      {status === "loading" && (
        <motion.button
          type="button"
          className={cn(buttonVariants(), className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="loading-span"
            className="relative block font-semibold"
            initial={{ x: -50 }}
            animate={{
              x: [0, -2, 2, -4, 4, -6, 6, -8, 8, -10, 10, -12, 12, -14, 14, 0],
              transition: {
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              },
            }}
          >
            {loadingText}
          </motion.span>
        </motion.button>
      )}
      {status === "success" && (
        <motion.button
          type="button"
          className={cn(buttonVariants({ variant: "secondary" }), className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="success-span"
            className="relative block font-semibold"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
          >
            {successText}
          </motion.span>
        </motion.button>
      )}
      {status === "failed" && (
        <motion.button
          type="button"
          className={cn(buttonVariants({ variant: "destructive" }), className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.span
            key="failed-span"
            className="relative block font-semibold"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
          >
            {failedText}
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default AnimatedSubscribeButton;
