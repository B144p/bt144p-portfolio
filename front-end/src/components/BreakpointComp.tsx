"use client";

import { useMediaQuery } from "../hooks/useMediaQuery";
import { EBreakpoints } from "../utils/breakpoint";

type Mode = ">" | "<" | ">=" | "<=";

export const useBreakpoint = (mode: Mode, breakpoint: EBreakpoints): boolean => {
  const atLeast = useMediaQuery(`(min-width: ${breakpoint}px)`);
  return mode.startsWith(">") ? atLeast : !atLeast;
};
