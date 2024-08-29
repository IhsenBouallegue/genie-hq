"use client";
import { startConfetti } from "@/lib/confetti";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@geniehq/ui/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

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
              x: [
                0, -0.3, 0.3, -0.6, 0.6, -0.9, 0.9, -1.2, 1.2, -1.5, 1.5, -1.8,
                1.8, -2.1, 2.1, -2.4, 2.4, -2.7, 2.7, -3, 3, -3.3, 3.3, -3.6,
                3.6, -3.9, 3.9, -4.2, 4.2, -4.5, 4.5, -4.8, 4.8, -5.1, 5.1,
                -5.4, 5.4, -5.7, 5.7, -6, 6, -6.3, 6.3, -6.6, 6.6, -6.9, 6.9,
                -7.2, 7.2, -7.5, 7.5, -7.8, 7.8, -8.1, 8.1, -8.4, 8.4, -8.7,
                8.7, -9, 9, -9.3, 9.3, -9.6, 9.6, -9.9, 9.9, -10.2, 10.2, -10.5,
                10.5,
              ],
              transition: {
                duration: 4.69,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                repeatType: "mirror",
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
          onClick={() => {
            startConfetti();
          }}
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
