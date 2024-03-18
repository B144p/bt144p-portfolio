import { Col, Row } from "antd";
import { FC } from "react";
import { styled } from "styled-components";
import { colors } from "../../../../utils/colors";

type Props = {};

const ProjectSectionStyled = styled.div``;

const ProjectSection: FC<Props> = () => {
  const projectList = [
    { name: "Playground-React", path: "https://playground-react-ts.vercel.app/", target: "_blank" },
    { name: "React-Workshop", path: "#about" },
    { name: "Poke-Dex", path: "#about" },
    { name: "Portfolio V.1", path: "#about" },
  ];

  return (
    <ProjectSectionStyled>
      <h1>Projects</h1>
      <Row justify="center" gutter={[8, 8]}>
        {projectList.map((project) => {
          return (
            <Col span={6} key={project.name}>
              <div
                style={{
                  width: "100%",
                  height: 100,
                  border: "5px solid white",
                  borderRadius: "1rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <a
                  href={project.path}
                  target={project.target ?? '_self'}
                  style={{
                    color: colors.primaryText,
                    width: '100%',
                    height: '100%',
                  }}
                >
                  <b>{project.name}</b>
                </a>
              </div>
            </Col>
          );
        })}
      </Row>
    </ProjectSectionStyled>
  );
};

export default ProjectSection;
