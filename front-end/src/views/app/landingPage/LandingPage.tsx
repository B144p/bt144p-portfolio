"use client";

import { FC } from "react";
import { Separator } from "@/components/ui/separator";
import { EBreakpoints } from "../../../utils/breakpoint";
import headerImg from "../../../assets/BG-1a2329.png";
import { BugIcon } from "../../../components/icons/BugIcon";
import AboutMeSection from "./about/AboutMeSection";
import StatsSection from "./stats/StatsSection";
import ProjectSection from "./project/ProjectSection";
import { Meteors } from "../../../components/Meteors";
import { useBreakpoint } from "../../../components/BreakpointComp";

const SECTION_CLASSNAME =
  "min-h-[75vh] w-[min(100%_-_2rem,1000px)] leading-normal bg-background content-center";

const SectionDivider: FC = () => (
  <div className="mx-auto flex w-[min(100%_-_2rem,1000px)] items-center gap-4">
    <Separator className="h-1 flex-1 rounded-full bg-primary-text" />
    <BugIcon className="text-primary-text" />
    <Separator className="h-1 flex-1 rounded-full bg-primary-text" />
  </div>
);

const LandingPage: FC = () => {
  const isMobile = useBreakpoint("<=", EBreakpoints.sm);

  return (
    <div>
      <Meteors number={isMobile ? 30 : 100} />
      <section
        id="home"
        className="min-h-[90vh] w-screen bg-cover bg-center bg-no-repeat shadow-[inset_0_-7.5rem_7.5rem_0_var(--background)] max-md:bg-position-[30%_50%]"
        style={{ backgroundImage: `url(${headerImg.src})` }}
      >
        <div className="hero-text"></div>
        <div className="hero-img"></div>
      </section>
      <div className="flex flex-col items-center">
        <section id="about" className={SECTION_CLASSNAME}>
          <AboutMeSection />
        </section>
        <SectionDivider />
        <section id="stats" className={SECTION_CLASSNAME}>
          <StatsSection />
        </section>
        <SectionDivider />
        <section id="project" className={SECTION_CLASSNAME}>
          <ProjectSection />
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
