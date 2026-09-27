"use client";

import { FC } from "react";
import { SkeletonLines } from "@/components/SkeletonLines";
import ProjectCard from "../../../../components/ProjectCard";
import { openNewTabURL } from "../../../../utils/functions";
import { getProjectLink } from "../../../../utils/projectStatus";
import { useProjects } from "@/features/project/client";

const ProjectSection: FC = () => {
  const { data: projects = [], isPending: loading } = useProjects();

  return (
    <div>
      <h1 className="text-center text-[2rem]">Projects</h1>
      {loading ? (
        <SkeletonLines rows={4} className="my-8" />
      ) : (
        <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {projects.map((project) => {
            const link = getProjectLink(project);
            return (
              <div
                key={project.id}
                className="mx-auto w-11/12 sm:mx-0 sm:w-auto"
                onClick={() => link && openNewTabURL(link, "_blank")}
              >
                <ProjectCard
                  title={project.title}
                  detail={project.description}
                  tagList={project.tags.map((t) => t.tag)}
                  status={project.status}
                  clickable={Boolean(link)}
                  sources={project.sources ?? []}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectSection;
