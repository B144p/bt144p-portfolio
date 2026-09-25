import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TimelineItem = {
  color?: string;
  children: ReactNode;
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
};

// Replaces antd's Timeline. The connecting "tail" line is colored per-item
// (matching each dot) instead of a global override, so there's no need to
// reach into another component's internal class names to theme it.
export function Timeline({ items, className }: TimelineProps) {
  return (
    <ul className={cn("flex flex-col", className)} data-slot="timeline">
      {items.map((item, idx) => (
        <li key={idx} className="relative flex gap-4 pb-6 last:pb-0">
          <div className="flex flex-col items-center">
            <span
              className="mt-1.5 size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {idx < items.length - 1 && (
              <span
                aria-hidden
                className="mt-1 w-px flex-1"
                style={{ backgroundColor: item.color }}
              />
            )}
          </div>
          <div className="min-w-0 flex-1">{item.children}</div>
        </li>
      ))}
    </ul>
  );
}
