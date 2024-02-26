import { FC, useEffect, useState } from "react";

type Props = {
  mode: ">" | "<" | ">=" | "<=";
  breakpoint: number;
  // children: JSX.Element;
};

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    let resizeTimer: number;
    const handleResize = () => {
      // avoid excessive re-renders
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 100);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowWidth;
};

export const breakpointCheck = ({ mode, breakpoint }: Props) => {
  const windowWidth = useWindowWidth();
  return eval(windowWidth + mode + breakpoint);
};

const BreakpointComp: FC<Props & { children: React.ReactNode }> = ({
  mode,
  breakpoint,
  children,
}) => {
  const windowWidth = useWindowWidth();
  return eval(windowWidth + mode + breakpoint) ? children : null;
};

export default BreakpointComp;
