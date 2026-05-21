import { Col, Divider, Row, Skeleton, Timeline } from "antd";
import moment from "moment";
import { FC } from "react";
import { styled } from "styled-components";
import reactLogo from "../../../../assets/react.svg";
import BreakpointComp from "../../../../components/BreakpointComp";
import { EBreakpoints } from "../../../../utils/breakpoint";
import { colors } from "../../../../utils/colors";
import { useAppSelector } from "../../../../app/store";

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
    margin-bottom: 2rem;
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
      display: block;
    }

    .detail-value {
      display: unset;
    }

    .ant-timeline-item-tail {
      background-color: ${colors.primaryText};
    }

    b,
    h2,
    h3 {
      margin: 0;
    }
  }

  .timeline-logo-col {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const AboutMeSection: FC = () => {
  const aboutMe = useAppSelector((state) => state.aboutMe.data);
  const aboutMeLoading = useAppSelector((state) => state.aboutMe.loading);
  const education = useAppSelector((state) => state.education.data) ?? [];
  const educationLoading = useAppSelector((state) => state.education.loading);
  const experience = useAppSelector((state) => state.experience.data) ?? [];
  const experienceLoading = useAppSelector((state) => state.experience.loading);

  const aboutSectionSpan = { xs: 24, sm: 24, md: 11, style: {} };

  return (
    <AboutMeSectionStyled>
      <Row id="about-me" className="about-row" justify="center">
        <Col span={23} className="about-col">
          <h1>About Me</h1>
          {aboutMeLoading ? (
            <Skeleton active paragraph={{ rows: 3 }} />
          ) : (
            <div style={{ fontSize: "1rem" }}>
              {aboutMe?.intro && (
                <p style={{ textIndent: "2rem" }}>{aboutMe.intro}</p>
              )}
              {aboutMe?.bio && (
                <p style={{ textIndent: "2rem" }}>{aboutMe.bio}</p>
              )}
              {aboutMe?.mission && (
                <p style={{ textIndent: "2rem" }}>{aboutMe.mission}</p>
              )}
            </div>
          )}
        </Col>
      </Row>
      <Row gutter={[8, 8]} justify="center">
        <Col {...aboutSectionSpan} id="education" className="education-col">
          <h2 className="header-sub-col">Education</h2>
          {educationLoading ? (
            <Skeleton active />
          ) : (
            <Timeline
              className="timeline"
              items={education.map((edu) => ({
                color: colors.primaryText,
                children: (
                  <div>
                    <b className="time-range">
                      {moment.unix(edu.startDate).format("YYYY")} -{" "}
                      {edu.endDate
                        ? moment.unix(edu.endDate).format("YYYY")
                        : "Present"}
                    </b>
                    <Row justify="center">
                      <Col className="timeline-logo-col" span={4}>
                        <img src={reactLogo} alt="" />
                      </Col>
                      <Col span={20}>
                        <h2>
                          {edu.title}
                          {edu.descriptions.length > 0 && (
                            <div>
                              <ul className="detail">
                                {edu.descriptions.map((desc) => (
                                  <li key={desc.id}>{desc.description}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </h2>
                      </Col>
                    </Row>
                  </div>
                ),
              }))}
            />
          )}
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
          {experienceLoading ? (
            <Skeleton active />
          ) : (
            <Timeline
              className="timeline"
              items={experience.map((exp) => ({
                color: colors.primaryText,
                children: (
                  <div>
                    <b className="time-range">
                      {moment.unix(exp.startDate).format("MMM YYYY")} -{" "}
                      {exp.endDate
                        ? (() => {
                            const start = moment.unix(exp.startDate);
                            const end = moment.unix(exp.endDate);
                            const years = end.diff(start, "years");
                            const months = end.diff(
                              start.clone().add(years, "years"),
                              "months",
                            );
                            const remainingDays = end.diff(
                              start.clone().add(years, "years").add(months, "months"),
                              "days",
                            );
                            let y = years;
                            let m = months + (remainingDays > 0 ? 1 : 0);
                            if (m >= 12) { y += 1; m -= 12; }
                            const parts = [];
                            if (y > 0) parts.push(`${y} year${y > 1 ? "s" : ""}`);
                            if (m > 0) parts.push(`${m} month${m > 1 ? "s" : ""}`);
                            return `${end.format("MMM YYYY")}${parts.length ? ` (${parts.join(" ")})` : ""}`;
                          })()
                        : "Now"}
                    </b>
                    <Row justify="center">
                      <Col className="timeline-logo-col" span={4}>
                        <img src={reactLogo} alt="" />
                      </Col>
                      <Col span={20}>
                        <h2>{exp.company}</h2>
                        <h3>
                          <ul style={{ paddingLeft: "2rem" }}>
                            <li>
                              Role:{" "}
                              <span className="detail detail-value">
                                {exp.role}
                              </span>
                            </li>
                            {exp.responsibilities.length > 0 && (
                              <li>
                                Responsibilities:
                                <ul
                                  className="detail"
                                  style={{ paddingLeft: "1.5rem" }}
                                >
                                  {exp.responsibilities.map((r) => (
                                    <li key={r.id}>{r.description}</li>
                                  ))}
                                </ul>
                              </li>
                            )}
                          </ul>
                        </h3>
                      </Col>
                    </Row>
                  </div>
                ),
              }))}
            />
          )}
        </Col>
      </Row>
    </AboutMeSectionStyled>
  );
};

export default AboutMeSection;
