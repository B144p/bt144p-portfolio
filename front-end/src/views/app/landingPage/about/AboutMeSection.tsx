import { Col, Divider, Row, Timeline } from "antd";
import { FC } from "react";
import { styled } from "styled-components";
import BreakpointComp from "../../../../components/BreakpointComp";
import { EBreakpoints } from "../../../../utils/breakpoint";
import { colors } from "../../../../utils/colors";
import reactLogo from "../../../../assets/react.svg";

type Props = {};

const AboutMeSectionStyled = styled.div`
  * {
    color: ${colors.primaryText};
  }

  h1 {
    font-size: 2rem;
    margin: 1rem;
    text-align: center;
  }

  .about-row {
    margin-bottom: 1rem;
  }

  .header-sub-col {
    margin-top: 0;
  }

  .timeline {
    .time-range {
      font-size: 1rem;
    }

    .detail {
      font-weight: normal;
      font-size: 1rem;
    }

    .ant-timeline-item-tail {
      background-color: ${colors.primaryText};
    }

    b, h2, h3 {
      margin: 0;
    }
  }

  .timeline-logo-col {
    display: flex;
    align-items: center;
    justify-content: center;
    /* align-items: start; */
    /* margin-top: 1rem; */
  }
`;

const AboutMeSection: FC<Props> = () => {
  const aboutSectionSpan = {
    xs: 24,
    sm: 24,
    md: 11,
    style: {},
  };

  return (
    <AboutMeSectionStyled>
      <Row id="about-me" className="about-row" justify="center">
        <Col span={23} className="about-col">
          <h1>About Me</h1>
          <div style={{ textIndent: "2rem" }}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae,
            iste debitis! Odio expedita dolor modi eaque velit. At voluptatibus,
            quam dolorum laborum aperiam velit! Vel suscipit veritatis quia
            nesciunt doloribus! Quos dolorum sed placeat ab natus iure quidem
            eius eaque minima exercitationem dignissimos harum quasi, nobis
            ipsum magni
          </div>
        </Col>
        {/* <BreakpointComp mode=">=" breakpoint={EBreakpoints.md}>
          <DividerStyled orientation="center" style={{ margin: "1rem 0" }}>
            <BugFilled />
          </DividerStyled>
        </BreakpointComp> */}
      </Row>
      <Row gutter={[8, 8]} justify="center">
        <Col {...aboutSectionSpan} id="education" className="education-col">
          <h2 className="header-sub-col">Education</h2>
          <Timeline
            className="timeline"
            items={[
              {
                color: colors.primaryText,
                children: (
                  <div>
                    <b className="time-range">2012 - 2017</b>
                    <Row justify="center">
                      <Col className="timeline-logo-col" span={4}>
                        <img src={reactLogo} alt="" />
                      </Col>
                      <Col span={20}>
                        <h2>
                          Surawittayakarn School
                          <div>
                            <ul className="detail">
                              <li>Grade 7-12</li>
                            </ul>
                          </div>
                        </h2>
                      </Col>
                    </Row>
                  </div>
                ),
              },
              {
                color: colors.primaryText,
                children: (
                  <div>
                    <b className="time-range">2018 - 2022</b>
                    <Row justify="center">
                      <Col className="timeline-logo-col" span={4}>
                        <img src={reactLogo} alt="" />
                      </Col>
                      <Col span={20}>
                        <h2>
                          King Mongkut's Institute of Technology Ladkrabang
                          <div>
                            <ul className="detail">
                              <li>Bachelor of Control Engineering</li>
                              <li>3rd Class Honors in Bachelor's</li>
                            </ul>
                          </div>
                        </h2>
                      </Col>
                    </Row>
                  </div>
                ),
              },
            ]}
          />
        </Col>

        <BreakpointComp mode=">=" breakpoint={EBreakpoints.md}>
          <Col>
            <Divider
              orientation="center"
              type="vertical"
              style={{
                backgroundColor: colors.primaryText,
                height: "100%",
                width: "4px",
                borderRadius: "2px",
              }}
            />
          </Col>
        </BreakpointComp>

        <Col {...aboutSectionSpan} id="experience" className="experience-col">
          <h2 className="header-sub-col">Experience</h2>
          <Timeline
            className="timeline"
            items={[
              {
                color: colors.primaryText,
                children: (
                  <div>
                    <b className="time-range">Feb 2023 - Now</b>
                    <Row justify="center">
                      <Col className="timeline-logo-col" span={4}>
                        <img src={reactLogo} alt="" />
                      </Col>
                      <Col span={20}>
                        <h2>Swift Dynamics Co., Ltd., Thailand</h2>
                        <h3>
                          <ul style={{ paddingLeft: "2rem" }}>
                            <li>
                              Role:{" "}
                              <span className="detail">Frontend Developer</span>
                            </li>
                            <li>
                              Project:{" "}
                              <span className="detail">FM-Project</span>
                            </li>
                            <li>
                              Responsibilities :
                              <ul
                                className="detail"
                                style={{ paddingLeft: "1.5rem" }}
                              >
                                <li>
                                  Implement new features using React,
                                  Typescript, Antd.
                                </li>
                                <li>maintenance application</li>
                                <li>
                                  Analyze requirement, design and validate
                                  feature directions.
                                </li>
                                <li>
                                  Work closely with Product Owners and UX/UI
                                  Designer to reiterate design to launch quickly
                                  and respond to users feedbacks.
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </h3>
                      </Col>
                    </Row>
                  </div>
                ),
              },
            ]}
          />
        </Col>
      </Row>
    </AboutMeSectionStyled>
  );
};

export default AboutMeSection;
