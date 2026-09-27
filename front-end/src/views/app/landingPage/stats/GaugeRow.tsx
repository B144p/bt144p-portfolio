import { FC } from "react";
import { formatHours, formatPercent } from "./format";

type Props = {
  label: string;
  totalSeconds: number;
  percent: number;
  /** CSS color for the bar (and the identity dot, when `dot` is set) */
  color: string;
  /** Show a color dot before the label: the legend for a categorical chart */
  dot?: boolean;
  /** Stretch small shares so a long tail stays visible (bar only; the % text stays exact) */
  scale?: "linear" | "sqrt";
};

// Label + hours + percent over a thin bar. Doubles as the chart's legend and
// its readable table view: every value a chart shows is also written here.
export const GaugeRow: FC<Props> = ({
  label,
  totalSeconds,
  percent,
  color,
  dot = false,
  scale = "linear",
}) => {
  const width = scale === "sqrt" ? Math.sqrt(percent / 100) * 100 : percent;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline gap-2 text-sm">
        {dot && (
          <span
            aria-hidden
            className="size-2.5 shrink-0 self-center rounded-full"
            style={{ background: color }}
          />
        )}
        <span className="truncate text-bright-text">{label}</span>
        <span className="flex-1" />
        <span className="shrink-0 text-primary-text tabular-nums">{formatHours(totalSeconds)}</span>
        <span className="w-[6ch] shrink-0 text-right text-secondary-text tabular-nums">
          {formatPercent(percent)}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
        className="h-1.5 w-full overflow-hidden rounded-full bg-nav-background"
      >
        <div className="h-full rounded-full" style={{ width: `${width}%`, background: color }} />
      </div>
    </div>
  );
};
