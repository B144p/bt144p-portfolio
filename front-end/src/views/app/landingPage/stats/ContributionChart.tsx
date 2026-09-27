"use client";

import { FC, useEffect, useMemo, useRef, useState } from "react";
import type { IStatContribution } from "@/features/statistic/client";
import { cn } from "@/lib/utils";
import { formatDay, formatHours, MONTHS } from "./format";

const WEEKS = 53;
const DAY = 86400;
/** Sun..Sat, sparse like GitHub */
const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

type Level = 0 | 1 | 2 | 3 | 4;
/** Sequential, one hue: more activity = brighter green on the dark surface. */
const LEVEL_COLORS: Record<Level, string> = {
  0: "var(--nav-background)",
  1: "color-mix(in oklab, var(--green-lighter) 30%, var(--nav-background))",
  2: "color-mix(in oklab, var(--green-lighter) 55%, var(--nav-background))",
  3: "color-mix(in oklab, var(--green-lighter) 80%, var(--nav-background))",
  4: "var(--green-lighter)",
};

type DayCell = { key: number; date: number; totalSeconds: number; level: Level; isFuture: boolean };

const startOfUTCDay = (unix: number) => Math.floor(unix / DAY) * DAY;

const quantile = (sortedAsc: number[], q: number) => {
  const pos = (sortedAsc.length - 1) * q;
  const base = Math.floor(pos);
  const next = sortedAsc[base + 1];
  return next === undefined
    ? sortedAsc[base]
    : sortedAsc[base] + (pos - base) * (next - sortedAsc[base]);
};

// 53×7 grid ending on the week of `anchor`, gaps filled with 0. Levels are
// quartiles of active days (not fixed hour thresholds), so the scale adapts
// to the actual data.
const buildGrid = (contributions: IStatContribution[], anchor: number) => {
  const byDay = new Map(contributions.map((c) => [startOfUTCDay(c.date), c.totalSeconds]));
  const weekday = new Date(anchor * 1000).getUTCDay();
  const gridStart = anchor - weekday * DAY - 7 * (WEEKS - 1) * DAY;

  const cells: DayCell[] = Array.from({ length: WEEKS * 7 }, (_, i) => {
    const date = gridStart + i * DAY;
    return {
      key: date,
      date,
      totalSeconds: byDay.get(date) ?? 0,
      level: 0,
      isFuture: date > anchor,
    };
  });

  const active = cells.filter((c) => c.totalSeconds > 0).map((c) => c.totalSeconds);
  active.sort((a, b) => a - b);
  if (active.length) {
    const [q25, q50, q75] = [0.25, 0.5, 0.75].map((q) => quantile(active, q));
    for (const c of cells) {
      if (c.totalSeconds <= 0) continue;
      c.level = c.totalSeconds <= q25 ? 1 : c.totalSeconds <= q50 ? 2 : c.totalSeconds <= q75 ? 3 : 4;
    }
  }

  const weeks = Array.from({ length: WEEKS }, (_, w) => cells.slice(w * 7, w * 7 + 7));
  let prevMonth = -1;
  const monthLabels = weeks.map((week) => {
    const month = new Date(week[0].date * 1000).getUTCMonth();
    if (month === prevMonth) return "";
    prevMonth = month;
    return MONTHS[month];
  });

  return { weeks, monthLabels };
};

type Props = {
  contributions: IStatContribution[];
  /** Unix seconds of the last day to show. Anchored to the data, never to
   *  "now", so the server's HTML and the browser's hydration agree. */
  until: number;
};

export const ContributionChart: FC<Props> = ({ contributions, until }) => {
  const [hovered, setHovered] = useState<DayCell | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const anchor = startOfUTCDay(until);
  const { weeks, monthLabels } = useMemo(
    () => buildGrid(contributions, anchor),
    [contributions, anchor],
  );
  const total = useMemo(
    () => contributions.reduce((sum, c) => sum + c.totalSeconds, 0),
    [contributions],
  );

  // Oldest → newest left to right; on narrow screens open at the latest week.
  // A one-shot scroll at mount can land before layout settles (fonts,
  // hydration, rotation), so keep pinning to the end on every resize until
  // the visitor scrolls the chart themselves.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let touched = false;
    const toEnd = () => {
      if (!touched) el.scrollLeft = el.scrollWidth;
    };
    const markTouched = () => {
      touched = true;
    };
    toEnd();
    const observer = new ResizeObserver(toEnd);
    observer.observe(el);
    if (el.firstElementChild) observer.observe(el.firstElementChild);
    el.addEventListener("pointerdown", markTouched, { passive: true });
    el.addEventListener("wheel", markTouched, { passive: true });
    el.addEventListener("touchstart", markTouched, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("pointerdown", markTouched);
      el.removeEventListener("wheel", markTouched);
      el.removeEventListener("touchstart", markTouched);
    };
  }, [weeks]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl text-bright-text">Contributions</h2>
        <p className="text-sm text-primary-text">{formatHours(total)} logged in the last year</p>
      </div>

      {/* contain-inline-size: the 53-week grid is ~830px wide; without this its
          width leaks into every ancestor's min-content and widens the page on
          phones instead of scrolling here. */}
      <div ref={scrollRef} className="overflow-x-auto pb-1 [contain:inline-size]">
        <div
          role="img"
          aria-label={`Daily coding activity heatmap, ${formatHours(total)} in the last year`}
          className="mx-auto flex w-max flex-col gap-1"
          onPointerLeave={() => setHovered(null)}
        >
          <div className="ml-8 grid grid-cols-[repeat(53,12px)] gap-[3px] text-[10px] text-secondary-text">
            {monthLabels.map((label, i) => (
              <span key={i} className="overflow-visible whitespace-nowrap">
                {label}
              </span>
            ))}
          </div>
          <div className="flex gap-1">
            <div className="grid w-7 grid-rows-7 gap-[3px] text-[10px] text-secondary-text">
              {WEEKDAY_LABELS.map((l, i) => (
                <span key={i} className="h-3 leading-3">
                  {l}
                </span>
              ))}
            </div>
            <div className="grid grid-flow-col grid-rows-7 gap-[3px]">
              {weeks.flat().map((cell) =>
                cell.isFuture ? (
                  <span key={cell.key} className="size-3" />
                ) : (
                  <span
                    key={cell.key}
                    onPointerEnter={() => setHovered(cell)}
                    className={cn(
                      "size-3 rounded-[3px]",
                      cell.level === 0 && "border border-green-darker/30",
                      hovered?.key === cell.key && "ring-1 ring-bright-text",
                    )}
                    style={{ background: LEVEL_COLORS[cell.level] }}
                  />
                ),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <p className="min-h-4 text-primary-text">
          {hovered ? (
            <>
              <span className="text-bright-text">{formatDay(hovered.date)}</span>
              <span className="ml-2 tabular-nums">{formatHours(hovered.totalSeconds)}</span>
            </>
          ) : (
            <span className="text-secondary-text">Hover a day for details</span>
          )}
        </p>
        <div className="flex items-center gap-1 text-secondary-text">
          <span className="mr-1">Less</span>
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <span
              key={level}
              aria-hidden
              className={cn("size-3 rounded-[3px]", level === 0 && "border border-green-darker/30")}
              style={{ background: LEVEL_COLORS[level] }}
            />
          ))}
          <span className="ml-1">More</span>
        </div>
      </div>
    </div>
  );
};
