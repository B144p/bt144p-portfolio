"use client";

import { FC, ReactNode } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { EBreakpoints } from "../utils/breakpoint";

type Props = {
  mode: ">" | "<" | ">=" | "<=";
  breakpoint: EBreakpoints;
};

// Mirrors antd's Grid.useBreakpoint() shape: track "at least this breakpoint"
// for every breakpoint up front, then look one up per call -- this hook's
// call count must stay fixed regardless of which breakpoint is requested.
export const useBreakpointCheck = () => {
  const atLeast: Record<EBreakpoints, boolean> = {
    [EBreakpoints.sm]: useMediaQuery(`(min-width: ${EBreakpoints.sm}px)`),
    [EBreakpoints.md]: useMediaQuery(`(min-width: ${EBreakpoints.md}px)`),
    [EBreakpoints.lg]: useMediaQuery(`(min-width: ${EBreakpoints.lg}px)`),
    [EBreakpoints.xl]: useMediaQuery(`(min-width: ${EBreakpoints.xl}px)`),
    [EBreakpoints.xxl]: useMediaQuery(`(min-width: ${EBreakpoints.xxl}px)`),
  };
  return ({ mode, breakpoint }: Props): boolean =>
    mode.startsWith(">") ? atLeast[breakpoint] : !atLeast[breakpoint];
};

const BreakpointComp: FC<Props & { children: ReactNode }> = ({
  mode,
  breakpoint,
  children,
}) => {
  const breakpointCheck = useBreakpointCheck();
  return breakpointCheck({ mode, breakpoint }) ? children : null;
};

export default BreakpointComp;
