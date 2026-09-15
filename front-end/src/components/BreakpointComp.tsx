"use client";

import { Grid } from "antd";
import { FC, ReactNode } from "react";
import { EBreakpoints } from "../utils/breakpoint";

type Props = {
  mode: ">" | "<" | ">=" | "<=";
  breakpoint: EBreakpoints;
};

const screenKey: Record<EBreakpoints, "sm" | "md" | "lg" | "xl" | "xxl"> = {
  [EBreakpoints.sm]: "sm",
  [EBreakpoints.md]: "md",
  [EBreakpoints.lg]: "lg",
  [EBreakpoints.xl]: "xl",
  [EBreakpoints.xxl]: "xxl",
};

// antd's screens map is empty until mounted (always on the server), so an
// unknown width is treated as desktop — server and first client render agree.
export const useBreakpointCheck = () => {
  const screens = Grid.useBreakpoint();
  return ({ mode, breakpoint }: Props): boolean => {
    const atLeast = screens[screenKey[breakpoint]] ?? true;
    return mode.startsWith(">") ? atLeast : !atLeast;
  };
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
