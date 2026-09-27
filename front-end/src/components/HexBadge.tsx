import { FC } from "react";
import { cn } from "@/lib/utils";
import { BugIcon } from "./icons/BugIcon";

// Bug inside a hexagon (same shape as the tab icon): the site's recurring
// marker. Callers set size and placement via className (e.g. "size-16").
export const HexBadge: FC<{ className?: string }> = ({ className }) => (
  <div aria-hidden className={cn("grid place-items-center", className)}>
    <svg viewBox="0 0 64 64" className="size-full [grid-area:1/1]">
      <path
        d="M32 3 57 17.5v29L32 61 7 46.5v-29Z"
        className="fill-nav-background stroke-green-light"
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </svg>
    <BugIcon className="size-[40%] text-bright-text [grid-area:1/1]" />
  </div>
);
