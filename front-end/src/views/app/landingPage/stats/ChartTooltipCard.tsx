import { FC } from "react";

// Shared hover card for the recharts tooltips (name, hours · percent).
export const ChartTooltipCard: FC<{ name: string; detail: string }> = ({ name, detail }) => (
  <div className="rounded-lg border border-green-dark/50 bg-nav-background px-3 py-1.5 text-xs shadow-lg">
    <span className="text-bright-text">{name}</span>
    <span className="ml-2 text-primary-text tabular-nums">{detail}</span>
  </div>
);
