"use client";

import { FC } from "react";
import { EBreakpoints } from "../../../utils/breakpoint";
import headerImg from "../../../assets/BG-1a2329.png";
import AboutMeSection from "./about/AboutMeSection";
import StatsSection from "./stats/StatsSection";
import ProjectSection from "./project/ProjectSection";
import { Meteors } from "../../../components/Meteors";
import { useBreakpoint } from "../../../components/BreakpointComp";

const SECTION_CLASSNAME =
  "glass-panel min-h-[75vh] w-[min(100%_-_2rem,1000px)] scroll-mt-20 px-3 py-6 sm:px-8 sm:py-8 leading-normal content-center";

const LandingPage: FC = () => {
  const isMobile = useBreakpoint("<=", EBreakpoints.sm);

  return (
    // min-w-0 w-full: this is a flex item of BaseLayout's wrapper; without it
    // any wide descendant sets the page's minimum width.
    <div className="w-full min-w-0">
      <Meteors number={isMobile ? 30 : 100} />
      <section id="home" className="relative min-h-[90vh] w-screen">
        {/* Fades to transparent (not to a color) so the page's hex texture
            shows through the bottom edge. */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center bg-no-repeat mask-[linear-gradient(to_bottom,black_65%,transparent)] max-md:bg-position-[30%_50%]"
          style={{ backgroundImage: `url(${headerImg.src})` }}
        />
        <div className="hero-text"></div>
        <div className="hero-img"></div>
      </section>
      <div className="flex flex-col items-center gap-8">
        <section id="about" className={SECTION_CLASSNAME}>
          <AboutMeSection />
        </section>
        <section id="stats" className={SECTION_CLASSNAME}>
          <StatsSection />
        </section>
        <section id="project" className={SECTION_CLASSNAME}>
          <ProjectSection />
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
