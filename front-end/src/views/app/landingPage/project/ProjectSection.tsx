import { Col, Row, Skeleton } from "antd";
import { FC } from "react";
import { styled } from "styled-components";
import ProjectCard from "../../../../components/ProjectCard";
import { openNewTabURL } from "../../../../utils/functions";
import { isProjectOpenable, PROJECT_STATUS_LABEL } from "../../../../utils/projectStatus";
import { useAppSelector } from "../../../../app/store";

type Props = {};

const ProjectSectionStyled = styled.div``;

const ProjectSection: FC<Props> = () => {
  const projects = useAppSelector((state) => state.portfolioProject.data) ?? [];
  const loading = useAppSelector((state) => state.portfolioProject.loading);

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
      {loading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <Row
          justify={{
            xs: "center",
            sm: "start",
          }}
          style={{
            margin: "2rem 0",
          }}
          gutter={[16, 16]}
        >
          {projects.map((project) => (
            <Col
              xs={22}
              sm={12}
              md={8}
              lg={6}
              key={project.id}
              onClick={() =>
                isProjectOpenable(project.status) &&
                project.preview &&
                openNewTabURL(project.preview, "_blank")
              }
            >
              <ProjectCard
                title={project.title}
                detail={project.description}
                tagList={project.tags.map((t) => t.tag)}
                statusLabel={PROJECT_STATUS_LABEL[project.status]}
                sources={project.sources ?? []}
              />
            </Col>
          ))}
        </Row>
      )}
    </ProjectSectionStyled>
  );
};

export default ProjectSection;
