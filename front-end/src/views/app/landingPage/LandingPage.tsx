import { BugFilled } from "@ant-design/icons";
import { Divider } from "antd";
import { FC } from "react";
import { styled } from "styled-components";
import { breakpoints } from "../../../utils/breakpoint";
import { colors } from "../../../utils/colors";
import headerImg from "../../../assets/BG-1a2329.png";
import AboutMeSection from "./about/AboutMeSection";
import StatsSection from "./stats/StatsSection";
import ProjectSection from "./project/ProjectSection";

const HeroSection = styled.section`
  min-height: 90vh;
  width: 100vw;
  box-shadow: inset 0px -2rem 1.5rem 0px ${colors.background};

  background-image: url(${headerImg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: ${breakpoints.md + "px"}) {
    background-position: 30% 50%;
  }
`;

const SectionStyled = styled.section`
  min-height: 90vh;
  width: min(100% - 2rem, 1000px);
  line-height: normal;
  background-color: ${colors.background};
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
          <ul>
            <li>Start & End date</li>
            <li>total lang</li>
            <li>lang top 6 - except JSON</li>
            <li>OS - Linux & Window</li>
          </ul>
        </SectionStyled>
        <DividerStyled orientation="center">
          <BugFilled />
        </DividerStyled>
        <SectionStyled id="project">
          <ProjectSection />
        </SectionStyled>
        <DividerStyled orientation="center">
          <BugFilled />
        </DividerStyled>
        <SectionStyled id="contact">
          <ul>
            <li>Linkedin</li>
            <li>Github</li>
            <li>Email?</li>
            <li>QRCode?</li>
          </ul>
        </SectionStyled>
      </div>
    </div>
  );
};

export default LandingPage;
