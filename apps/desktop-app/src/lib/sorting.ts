import { useMemo, useState } from "react";

export type SortDirection = "asc" | "desc";

interface SortConfig<T> {
  key: keyof T | ((item: T) => string | number | boolean); // Can be a property key or a computed function
  direction: SortDirection; // The direction of the sort (ascending or descending)
}

// Utility hook for sorting lists based on multiple properties or computed values
export function useSort<T>(items: T[], initialSortConfigs?: SortConfig<T>[]) {
  const [sortConfigs, setSortConfigs] = useState<SortConfig<T>[]>(
    initialSortConfigs || [],
  );

  const sortedItems = useMemo(() => {
    if (!items || sortConfigs.length === 0) return items;

    const sortedArray = [...items].sort((a, b) => {
      for (const config of sortConfigs) {
        const { key, direction } = config;

        const aValue = typeof key === "function" ? key(a) : a[key]; // Handle computed values
        const bValue = typeof key === "function" ? key(b) : b[key];

        // Handle string comparison
        if (typeof aValue === "string" && typeof bValue === "string") {
          const result = aValue.localeCompare(bValue);
          if (result !== 0) {
            return direction === "asc" ? result : -result;
          }
        }

        // Handle number, boolean, and other primitive comparisons
        if (typeof aValue === "number" || typeof aValue === "boolean") {
          const result = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
          if (result !== 0) {
            return direction === "asc" ? result : -result;
          }
        }

        // If values are the same, move to the next sorting configuration
      }

      return 0; // If all values are the same
    });

    return sortedArray;
  }, [items, sortConfigs]);

  // Function to update or add sorting configuration
  const updateSort = (
    key: keyof T | ((item: T) => string | number | boolean),
    direction?: SortDirection,
  ) => {
    setSortConfigs((prevConfigs) => {
      const existingConfigIndex = prevConfigs.findIndex(
        (config) => config.key === key,
      );

      // If the property is already in the sorting configurations, update the direction
      if (existingConfigIndex !== -1) {
        const updatedConfigs = [...prevConfigs];
        updatedConfigs[existingConfigIndex] = {
          key,
          direction:
            direction ||
            (updatedConfigs[existingConfigIndex]?.direction === "asc"
              ? "desc"
              : "asc"),
        };
        return updatedConfigs;
      }
      // We can reenable this line if we want to allow sorting by multiple properties which is a bit confusing
      //return [...prevConfigs, { key, direction: direction || "asc" }];
      return [{ key, direction: direction || "asc" }];
    });
  };

  return { sortedItems, sortConfigs, updateSort };
}
