"use client";

import { FC } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import type { IStatLanguage } from "@/features/statistic/client";
import { ChartTooltipCard } from "./ChartTooltipCard";
import { formatHours, formatPercent } from "./format";

type Point = { language: string; value: number; seconds: number; percent: number };

const chartConfig = { value: { label: "Hours", color: "var(--green-lighter)" } };

const RadarTooltip: FC<{ active?: boolean; payload?: Array<{ payload: Point }> }> = ({
  active,
  payload,
}) => {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <ChartTooltipCard
      name={p.language}
      detail={`${formatHours(p.seconds)} · ${formatPercent(p.percent)}`}
    />
  );
};

// Expects the top languages already sorted and sliced: a radar with more than
// ~6 axes is noise, the rest belong in the list below it.
export const LanguageRadar: FC<{ languages: IStatLanguage[] }> = ({ languages }) => {
  const data: Point[] = languages.map((lang) => ({
    language: lang.language,
    // cube root keeps the long tail visible next to one dominant language
    value: Math.cbrt(lang.totalSeconds / 3600),
    seconds: lang.totalSeconds,
    percent: lang.percent,
  }));

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-72 w-full min-w-0">
      <RadarChart data={data} outerRadius="65%">
        <PolarGrid stroke="var(--green-darker)" strokeOpacity={0.6} />
        <PolarAngleAxis
          dataKey="language"
          tick={{ fill: "var(--primary-text)", fontSize: 12, fontFamily: "inherit" }}
        />
        <ChartTooltip content={<RadarTooltip />} cursor={false} />
        <Radar
          dataKey="value"
          stroke="var(--color-value)"
          strokeWidth={2}
          fill="var(--color-value)"
          fillOpacity={0.25}
          dot={{ r: 3, fill: "var(--color-value)", strokeWidth: 0 }}
        />
      </RadarChart>
    </ChartContainer>
  );
};
