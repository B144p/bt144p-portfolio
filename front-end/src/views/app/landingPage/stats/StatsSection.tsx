"use client";

import type { EChartsOption } from "echarts-for-react";
import dynamic from "next/dynamic";
import { fromUnix } from "../../../../utils/date";
import { FC, useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { SkeletonLines } from "@/components/SkeletonLines";
import { useStatistic, type IStatContribution } from "@/features/statistic/client";
import { numberFloatFormat } from "../../../../utils/functions";
import { cn } from "@/lib/utils";
import {
  configPie,
  configRadar,
  panelAttributesConfig,
  panelColorsConfig,
  totalStatItemClassName,
} from "./statsSection.model";

// Both render browser-measured canvas/SVG (echarts, react-measure) and the
// calendar lays out weeks in the local timezone, so they only render client-side.
const ReactEChart = dynamic(() => import("echarts-for-react"), { ssr: false });
const Calendar = dynamic(() => import("react-github-contribution-calendar"), {
  ssr: false,
});

const StatsSection: FC = () => {
  const { data: statistic, isPending: loading } = useStatistic();

  const formatDate = (unixSeconds: number) =>
    fromUnix(unixSeconds).format("D MMMM YYYY");

  const formatContributions = (contributions: IStatContribution[]) =>
    contributions.reduce((acc, c) => {
      if (c.totalSeconds) {
        const level = Math.ceil(c.totalSeconds / (3 * 3600));
        acc[fromUnix(c.date).format("YYYY-MM-DD")] = Math.min(level, 4);
      }
      return acc;
    }, {} as Record<string, number>);

  const contributionSource = statistic
    ? formatContributions(statistic.contributions)
    : {};

  // Anchored to the data, never to "now": a render-time clock read would
  // differ between the server's HTML and the browser's hydration.
  const contributionUntil = statistic?.contributions?.length
    ? fromUnix(statistic.contributions[statistic.contributions.length - 1].date).format("YYYY-MM-DD")
    : statistic
      ? fromUnix(statistic.endDate).format("YYYY-MM-DD")
      : undefined;

  const sortedLanguages = useMemo(
    () =>
      statistic
        ? [...statistic.languages]
            .sort((a, b) => b.totalSeconds - a.totalSeconds)
            .slice(0, 6)
        : [],
    [statistic],
  );

  const radarOptions = useMemo<EChartsOption>(() => {
    if (!sortedLanguages.length) return configRadar;
    const scale = (v: number) => Math.cbrt(v);
    const scaledMax = scale(sortedLanguages[0].percent) * 1.1;
    return {
      ...configRadar,
      radar: {
        indicator: sortedLanguages.map((lang) => ({
          name: lang.language,
          max: scaledMax,
        })),
      },
      series: [
        {
          type: "radar",
          symbol: "none",
          data: [{ value: sortedLanguages.map((lang) => scale(lang.percent)) }],
          areaStyle: { opacity: 0.375 },
        },
      ],
    };
  }, [sortedLanguages]);

  const pieOptions = useMemo<EChartsOption>(() => {
    if (!statistic?.operatingSystems?.length) return configPie;
    return {
      ...configPie,
      series: configPie.series.map((serie) => ({
        ...serie,
        data: statistic.operatingSystems.map((os) => ({
          name: os.os,
          value: os.percent,
          text: os.humanReadable,
        })),
      })),
    };
  }, [statistic]);

  return (
    <div>
      <h1 className="mb-4 ml-4 text-[2rem]">Statistics</h1>
      {loading ? (
        <SkeletonLines rows={10} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className={cn(totalStatItemClassName, "flex items-baseline gap-2")}>
              <h2 className="m-0 text-bright-text">Range :</h2>
              <p className="m-0 text-base font-semibold">
                {statistic
                  ? `${formatDate(statistic.startDate)} - ${formatDate(statistic.endDate)}`
                  : "-"}
              </p>
            </div>
            <div className={cn(totalStatItemClassName, "flex items-baseline gap-2")}>
              <h2 className="m-0 text-bright-text">Total Time :</h2>
              <p className="m-0 text-base font-semibold">
                {statistic?.humanReadable ?? "0 hrs 0 mins"}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 items-center gap-2 sm:grid-cols-2">
            <div>
              <ReactEChart style={{ width: "100%" }} option={radarOptions} />
            </div>
            <div className="space-y-2">
              {sortedLanguages.map((lang) => (
                <div key={lang.language} className="text-primary-text">
                  <span>{`${lang.language} => ${lang.humanReadable}`}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={lang.percent} className="flex-1" />
                    <span className="text-xs tabular-nums">
                      {numberFloatFormat(lang.percent) + "%"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 items-center gap-2 sm:grid-cols-2">
            <div>
              <ReactEChart style={{ width: "100%" }} option={pieOptions} />
            </div>
            <div className="space-y-2">
              {statistic?.operatingSystems.map((os) => (
                <div key={os.os} className="text-primary-text">
                  <span>{`${os.os} => ${os.humanReadable}`}</span>
                  <div className="flex items-center gap-2">
                    <Progress value={os.percent} className="flex-1" />
                    <span className="text-xs tabular-nums">
                      {numberFloatFormat(os.percent) + "%"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-[45rem] max-sm:pt-8">
              {contributionUntil && (
                <Calendar
                  values={contributionSource}
                  until={contributionUntil}
                  panelColors={panelColorsConfig}
                  panelAttributes={panelAttributesConfig}
                  weekLabelAttributes={undefined}
                  monthLabelAttributes={undefined}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StatsSection;
