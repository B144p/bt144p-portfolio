import { BugFilled } from "@ant-design/icons";
import { Divider } from "antd";
import { FC } from "react";
import { styled } from "styled-components";
import { EBreakpoints } from "../../../utils/breakpoint";
import { colors } from "../../../utils/colors";
import headerImg from "../../../assets/BG-1a2329.png";
import AboutMeSection from "./about/AboutMeSection";
import StatsSection from "./stats/StatsSection";
import ProjectSection from "./project/ProjectSection";
import { Meteors } from "../../../components/Meteors";
import { breakpointCheck } from "../../../components/BreakpointComp";

const HeroSection = styled.section`
  min-height: 90vh;
  width: 100vw;
  box-shadow: inset 0px -7.5rem 7.5rem 0px ${colors.background};

  background-image: url(${headerImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: ${EBreakpoints.md + "px"}) {
    background-position: 30% 50%;
  }
`;

const SectionStyled = styled.section`
  min-height: 75vh;
  width: min(100% - 2rem, 1000px);
  line-height: normal;
  background-color: ${colors.background};
  align-content: center;
`;

export const DividerStyled = styled(Divider)`
  width: min(100% - 2rem, 1000px);
  min-width: unset;

  &::before,
  &::after {
    background-color: ${colors.primaryText};
    height: 4px;
    border-radius: 2px;
  }

  .ant-divider-inner-text {
    color: ${colors.primaryText};
  }
`;

const LandingPage: FC = () => {
  return (
    <div>
      <Meteors
      number={
        breakpointCheck({ mode: "<=", breakpoint: EBreakpoints.sm })
          ? 30
          : 100
        }
      />
      <HeroSection id="home">
        <div className="hero-text"></div>
        <div className="hero-img"></div>
      </HeroSection>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <SectionStyled id="about">
          <AboutMeSection />
        </SectionStyled>
        <DividerStyled orientation="center">
          <BugFilled />
        </DividerStyled>
        <SectionStyled id="stats">
          <StatsSection />
        </SectionStyled>
        <DividerStyled orientation="center">
          <BugFilled />
        </DividerStyled>
        <SectionStyled id="project">
          <ProjectSection />
        </SectionStyled>
      </div>
    </div>
  );
};

export default LandingPage;
