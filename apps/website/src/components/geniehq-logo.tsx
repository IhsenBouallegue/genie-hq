import { cn } from "@/lib/utils";
import type { ClassValue } from "clsx";
import React from "react";

export default function GenieHQLogo({ className }: { className?: ClassValue }) {
  return (
    <svg
      className={cn(className)}
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit="2"
      clipRule="evenodd"
      viewBox="0 0 1024 1024"
      role="graphics-symbol"
    >
      <path
        className={cn(className)}
        fillRule="nonzero"
        d="M4926 8205c-9-49-91-205-157-300-73-106-149-173-349-306-96-65-206-143-245-176-137-115-218-255-257-443-26-127-21-346 11-464 77-279 286-511 598-662 107-52 128-56 58-12-156 97-278 319-262 475 13 122 82 204 311 371 262 190 406 320 472 423 39 62 38 45 0-28-20-38-67-102-105-144l-70-76 102-60c56-33 169-96 251-139 180-95 251-156 284-247 54-142-4-342-137-477-70-72-64-73 32-8 218 148 381 364 438 583 29 112 29 280 0 390-61 228-183 390-466 622-304 249-396 367-471 612-30 100-32 102-38 66z"
        transform="matrix(.39381 0 0 -.39381 -1422.42 3276.17)"
      />
    </svg>
  );
}
