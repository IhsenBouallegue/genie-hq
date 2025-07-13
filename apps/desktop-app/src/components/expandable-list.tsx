import { ScrollArea, ScrollBar } from "@geniehq/ui/components/scroll-area";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

type Option = {
  id: string;
  label: string;
};

type Props = {
  title: string;
  description: string;
  options: Option[];
  renderOption: (option: Option) => React.ReactNode;
};

const MotionChevron = motion(ChevronDown);

export default function ExpandableListSelector({
  title,
  description,
  options = [],
  renderOption,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (options && options.length > 0 && !selectedOption && options[0]) {
      setSelectedOption(options[0]);
    }
  }, [options, selectedOption]);

  return (
    <motion.div
      className="w-full max-w-full border-2 rounded-lg overflow-hidden mb-4"
      initial={false}
      animate={controls}
      onMouseEnter={() => {
        setIsExpanded(true);
        controls.start({
          height: "auto",
          transition: { duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] },
        });
      }}
      onMouseLeave={() => {
        setIsExpanded(false);
        controls.start({
          height: "80px",
          transition: { duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] },
        });
      }}
    >
      <motion.div
        className="p-6 flex justify-between items-center"
        animate={{
          borderBottom: isExpanded ? "1px solid var(--border)" : "1px solid transparent",
        }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-2xl font-semibold text-primary origin-left"
          animate={{
            scale: isExpanded ? 0.9 : 1,
          }}
          transition={{ duration: 1, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          {title}
        </motion.h2>
        <div className="flex items-center">
          {!isExpanded && selectedOption && (
            <motion.span
              className="mr-3 text-lg"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 1 }}
            >
              {selectedOption.label}
            </motion.span>
          )}
          <MotionChevron
            size={24}
            className="text-primary"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
          />
        </div>
      </motion.div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="flex bg-slate-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="w-40 pr-6">
              <p className="text-muted-foreground">{description}</p>
            </div>
            {/* Updated Container using ScrollArea */}
            <ScrollArea className="flex-1">
              <div className="flex space-x-4 pb-4">
                {options.map((option) => (
                  <div key={option.id} className="flex-shrink-0">
                    {renderOption(option)}
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
