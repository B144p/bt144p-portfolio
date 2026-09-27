"use client";

import { FC, ReactNode, useMemo } from "react";
import { SkeletonLines } from "@/components/SkeletonLines";
import { useStatistic, type IStatistic } from "@/features/statistic/client";
import { ContributionChart } from "./ContributionChart";
import { formatDay, formatHours } from "./format";
import { GaugeRow } from "./GaugeRow";
import { LanguageRadar } from "./LanguageRadar";
import { OsDonut, type OsSlice } from "./OsDonut";

/** A radar with more axes is noise; the list shows the same top slice. */
const TOP_LANGUAGES = 6;
/** Validated categorical slots (globals.css); anything beyond folds into "Other". */
const OS_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];

const CARD_CLASSNAME = "rounded-xl border border-green-dark/30 bg-nav-background/40 p-4 sm:p-6";

const StatTile: FC<{ label: string; value: ReactNode }> = ({ label, value }) => (
  <div className={CARD_CLASSNAME}>
    <p className="text-xs text-secondary-text">{label}</p>
    <p className="mt-1 text-xl text-bright-text tabular-nums">{value}</p>
  </div>
);

const toOsSlices = (operatingSystems: IStatistic["operatingSystems"]): OsSlice[] => {
  const sorted = [...operatingSystems].sort((a, b) => b.totalSeconds - a.totalSeconds);
  const slices: OsSlice[] = sorted.slice(0, OS_COLORS.length).map((os, i) => ({
    os: os.os,
    totalSeconds: os.totalSeconds,
    percent: os.percent,
    color: OS_COLORS[i],
  }));
  const rest = sorted.slice(OS_COLORS.length);
  if (rest.length) {
    slices.push({
      os: "Other",
      totalSeconds: rest.reduce((sum, os) => sum + os.totalSeconds, 0),
      percent: rest.reduce((sum, os) => sum + os.percent, 0),
      color: "var(--chart-other)",
    });
  }
  return slices;
};

const StatsSection: FC = () => {
  const { data: statistic, isPending: loading } = useStatistic();

  const topLanguages = useMemo(
    () =>
      statistic
        ? [...statistic.languages]
            .sort((a, b) => b.totalSeconds - a.totalSeconds)
            .slice(0, TOP_LANGUAGES)
        : [],
    [statistic],
  );
  const osSlices = useMemo(
    () => (statistic ? toOsSlices(statistic.operatingSystems) : []),
    [statistic],
  );

  if (loading || !statistic) {
    return (
      <div>
        <h1 className="mb-6 text-center text-[2rem]">Statistics</h1>
        <SkeletonLines rows={10} />
      </div>
    );
  }

  const days = Math.max(1, Math.round((statistic.endDate - statistic.startDate) / 86400));
  const lastContribution = statistic.contributions.at(-1)?.date;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-2 text-center text-[2rem]">Statistics</h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Total time" value={formatHours(statistic.totalSeconds)} />
        <StatTile label="Daily average" value={formatHours(statistic.totalSeconds / days)} />
        <StatTile label="Top language" value={topLanguages[0]?.language ?? "-"} />
        <StatTile
          label="Range"
          value={
            <span className="text-base">
              {formatDay(statistic.startDate)} – {formatDay(statistic.endDate)}
            </span>
          }
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className={CARD_CLASSNAME}>
          <h2 className="text-xl text-bright-text">Languages</h2>
          <LanguageRadar languages={topLanguages} />
          <div className="flex flex-col gap-3">
            {topLanguages.map((lang) => (
              <GaugeRow
                key={lang.id}
                label={lang.language}
                totalSeconds={lang.totalSeconds}
                percent={lang.percent}
                color="var(--green-lighter)"
                scale="sqrt"
              />
            ))}
          </div>
        </div>

        <div className={CARD_CLASSNAME}>
          <h2 className="text-xl text-bright-text">Operating systems</h2>
          <OsDonut slices={osSlices} />
          <div className="flex flex-col gap-3">
            {osSlices.map((slice) => (
              <GaugeRow
                key={slice.os}
                label={slice.os}
                totalSeconds={slice.totalSeconds}
                percent={slice.percent}
                color={slice.color}
                dot
              />
            ))}
          </div>
        </div>
      </div>

      <div className={CARD_CLASSNAME}>
        <ContributionChart
          contributions={statistic.contributions}
          until={lastContribution ?? statistic.endDate}
        />
      </div>
    </div>
  );
};

export default StatsSection;
