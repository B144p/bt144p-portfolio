"use client";

import { FC } from "react";
import { Cell, Pie, PieChart } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { ChartTooltipCard } from "./ChartTooltipCard";
import { formatHours, formatPercent } from "./format";

export type OsSlice = { os: string; totalSeconds: number; percent: number; color: string };

const chartConfig = { percent: { label: "Share" } };

const OsTooltip: FC<{ active?: boolean; payload?: Array<{ payload: OsSlice }> }> = ({
  active,
  payload,
}) => {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <ChartTooltipCard
      name={p.os}
      detail={`${formatHours(p.totalSeconds)} · ${formatPercent(p.percent)}`}
    />
  );
};

export const OsDonut: FC<{ slices: OsSlice[] }> = ({ slices }) => (
  <div className="relative mx-auto aspect-square max-h-72 w-full min-w-0">
    <ChartContainer config={chartConfig} className="h-full w-full">
      <PieChart>
        <ChartTooltip content={<OsTooltip />} cursor={false} />
        <Pie
          data={slices}
          dataKey="percent"
          nameKey="os"
          startAngle={90}
          endAngle={-270}
          innerRadius="58%"
          outerRadius="80%"
          paddingAngle={2}
          cornerRadius={4}
          minAngle={3}
          stroke="none"
        >
          {slices.map((slice) => (
            <Cell key={slice.os} fill={slice.color} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-2xl text-bright-text">
      OS
    </span>
  </div>
);
