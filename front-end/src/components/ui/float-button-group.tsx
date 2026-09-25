"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type FloatButtonItem = {
  key: string;
  icon: ReactNode;
  onClick: () => void;
};

type FloatButtonGroupProps = {
  trigger: ReactNode;
  items: FloatButtonItem[];
  className?: string;
};

// Replaces antd's FloatButton.Group (trigger="click"). No shadcn equivalent
// exists; a plain button stack avoids the menu-role a11y semantics a
// DropdownMenu/Popover would add for what's just a cluster of buttons.
export function FloatButtonGroup({ trigger, items, className }: FloatButtonGroupProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("fixed right-6 bottom-6 z-50 flex flex-col-reverse items-center gap-3", className)}>
      <Button
        type="button"
        size="icon"
        className="rounded-full shadow-lg"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {trigger}
      </Button>
      {open && (
        <div className="flex flex-col items-center gap-3">
          {items.map((item) => (
            <Button
              key={item.key}
              type="button"
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
            >
              {item.icon}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
