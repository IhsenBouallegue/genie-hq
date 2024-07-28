"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, createContext, useContext, useEffect } from "react";

interface AnimatedSubscribeButtonProps {
  children: ReactNode;
  status: "initial" | "loading" | "success" | "fail";
}

interface StateContextProps {
  state: "initial" | "loading" | "success" | "fail";
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

export const AnimatedSubscribeButton: React.FC<AnimatedSubscribeButtonProps> & {
  Base: React.FC<{ children: ReactNode; className?: string }>;
  Success: React.FC<{ children: ReactNode; className?: string }>;
  Loading: React.FC<{ children: ReactNode; className?: string }>;
  Failed: React.FC<{ children: ReactNode; className?: string }>;
} = ({ children, status }) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {}, [status]);

  return (
    <StateContext.Provider value={{ state: status }}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </StateContext.Provider>
  );
};

const Base: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const { state } = useContext(StateContext)!;
  return (
    state === "initial" && (
      <motion.button
        type="submit"
        className={cn(
          "relative flex items-center justify-center rounded-md p-[10px]",
          className,
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.span
          key="initial"
          className="relative block font-semibold"
          initial={{ x: 0 }}
          exit={{ x: 50, transition: { duration: 0.1 } }}
        >
          {children}
        </motion.span>
      </motion.button>
    )
  );
};

const Success: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const { state } = useContext(StateContext)!;
  return (
    state === "success" && (
      <motion.button
        type="button"
        className={cn(
          "relative flex items-center justify-center rounded-md p-[10px] bg-white",
          className,
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.span
          key="success"
          className="relative block font-semibold"
          initial={{ x: 0 }}
          exit={{ x: 50, transition: { duration: 0.1 } }}
        >
          {children}
        </motion.span>
      </motion.button>
    )
  );
};

const Loading: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const { state } = useContext(StateContext)!;
  return (
    state === "loading" && (
      <motion.button
        type="button"
        className={cn(
          "relative flex items-center justify-center rounded-md p-[10px] bg-gray-300",
          className,
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.span
          key="loading"
          className="relative block font-semibold"
          initial={{ x: 0 }}
          exit={{ x: 50, transition: { duration: 0.1 } }}
        >
          {children}
        </motion.span>
      </motion.button>
    )
  );
};

const Failed: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const { state } = useContext(StateContext)!;
  return (
    state === "fail" && (
      <motion.button
        type="button"
        className={cn(
          "relative flex items-center justify-center rounded-md p-[10px] bg-red-600",
          className,
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.span
          key="fail"
          className="relative block font-semibold"
          initial={{ x: 0 }}
          exit={{ x: 50, transition: { duration: 0.1 } }}
        >
          {children}
        </motion.span>
      </motion.button>
    )
  );
};

AnimatedSubscribeButton.Base = Base;
AnimatedSubscribeButton.Success = Success;
AnimatedSubscribeButton.Loading = Loading;
AnimatedSubscribeButton.Failed = Failed;
