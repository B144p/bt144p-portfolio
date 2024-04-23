import { Col, Row } from "antd";
import { FC } from "react";
import { styled } from "styled-components";
import ProjectCard from "../../../../components/ProjectCard";
import { openNewTabURL } from "../../../../utils/functions";
import { TProjectList } from "./ProjectSection.model";

type Props = {};

const ProjectSectionStyled = styled.div``;

const ProjectSection: FC<Props> = () => {
  const projectList: TProjectList[] = [
    {
      name: "Playground-React",
      detail: "React-TS",
      tag: ["React", "Typescript", "Sprites-sheet", "SCSS"],
      path: "https://playground-react-ts.vercel.app/",
      target: "_blank",
    },
    {
      name: "React-Workshop",
      detail: "React-JS Lab",
      tag: ["Javascript"],
      path: "#about",
      target: "_self",
    },
    {
      name: "Poke-Dex",
      detail: "Pokemon dex with UI",
      tag: ["React", "Typescript", "Antd", "GraphQL", "Poke-API"],
      path: "#about",
      target: "_self",
    },
    {
      name: "Portfolio V.1",
      detail: "Start line of web-developer.",
      tag: ["React", "MERN-Stack", "Python", "Selenium"],
      path: "https://test-webport-b144p.netlify.app/",
      target: "_blank",
    },
  ];

  return (
    <ProjectSectionStyled>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2rem",
        }}
      >
        Projects
      </h1>
      <Row
        justify={{
          xs: "center",
          sm: "start",
        }}
        style={{
          margin: "2rem",
          marginTop: 0,
        }}
        gutter={[16, 16]}
      >
        {projectList.map((project) => (
          <Col
            xs={20}
            sm={8}
            md={6}
            key={project.name}
            onClick={() =>
              openNewTabURL(project.path, project.target ?? "_self")
            }
          >
            <ProjectCard
              title={project.name}
              detail={project.name}
              tagList={project.tag}
            />
          </Col>
        ))}
      </Row>
    </ProjectSectionStyled>
  );
};

export default ProjectSection;
