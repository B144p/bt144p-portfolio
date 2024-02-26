import { BugFilled } from "@ant-design/icons";
import { Divider } from "antd";
import { FC } from "react";
import { styled } from "styled-components";
import { breakpoints } from "../../../utils/breakpoint";
import { colors } from "../../../utils/colors";
import headerImg from "../../../assets/BG-1a2329.png";
import AboutMeSection from "./about/AboutMeSection";
import StatsSection from "./stats/StatsSection";

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
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
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
          {/* <ul>
            <li>About</li>
            <li>Education</li>
            <li>Experience</li>
          </ul> */}
        </SectionStyled>
        {/* <SectionStyled id='experience' ></SectionStyled> */}
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
          <ul>
            <li>Poke-dex</li>
            <li>React Workshop</li>
            <li>Playground</li>
            <ul>
              <li>Stacking-ring</li>
              <li>Sprite</li>
            </ul>
            <li>Portfolio V.1</li>

            <li style={{ marginTop: "1rem" }}>Optional Project</li>
            <ul>
              <li>Todo-List Full loop</li>
              <ul>
                <li>Login</li>
                <li>Registor</li>
                <li>Verify by email</li>
                <li>Todo list</li>
              </ul>
              <li>Project-management = Jira, Clickup, Kanban</li>
              <ul>
                <li>all feature like todo but can drag card</li>
                <li>can select card for open modal</li>
              </ul>
            </ul>
          </ul>
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
