"use client";

import { CaretDown, CaretUp } from "@phosphor-icons/react";
import { FC, useState } from "react";
import { SkeletonLines } from "@/components/SkeletonLines";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProjectCard from "../../../../components/ProjectCard";
import { openNewTabURL } from "../../../../utils/functions";
import { getProjectLink } from "../../../../utils/projectStatus";
import { useProjects } from "@/features/project/client";

// Collapsed view shows two grid rows. Columns are 1 / 2 (sm) / 3 (md) /
// 4 (lg), so that is 4 / 4 / 6 / 8 cards. Done with breakpoint classes, not
// a JS width check, so it is right on first paint and on resize.

/** Class hiding card `index` while collapsed */
const collapsedCardClass = (index: number) => {
  if (index >= 8) return "hidden";
  if (index >= 6) return "hidden lg:block";
  if (index >= 4) return "hidden md:block";
  return "";
};

/** Class hiding the toggle at widths where every card already fits */
const toggleClass = (count: number) => {
  if (count > 8) return "";
  if (count > 6) return "lg:hidden";
  if (count > 4) return "md:hidden";
  return "hidden";
};

const ProjectSection: FC = () => {
  const { data: projects = [], isPending: loading } = useProjects();
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    // Collapsing from far down would leave the reader below the section.
    if (expanded) document.getElementById("project")?.scrollIntoView({ block: "start" });
    setExpanded((prev) => !prev);
  };

  return (
    <div>
      <h1 className="text-center text-[2rem]">Projects</h1>
      {loading ? (
        <SkeletonLines rows={4} className="my-8" />
      ) : (
        <>
          <div
            id="project-grid"
            className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {projects.map((project, index) => {
              const link = getProjectLink(project);
              return (
                <div
                  key={project.id}
                  className={cn(
                    "mx-auto w-11/12 sm:mx-0 sm:w-auto",
                    !expanded && collapsedCardClass(index),
                  )}
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
          <div className={cn("-mt-2 flex justify-center", toggleClass(projects.length))}>
            <Button
              variant="ghost"
              aria-expanded={expanded}
              aria-controls="project-grid"
              onClick={toggle}
              className="h-auto gap-2 rounded-full border-green-dark/50 px-5 py-2 text-sm font-normal text-primary-text hover:bg-green-light/20 hover:text-bright-text"
            >
              {expanded ? "See less" : "See more"}
              {expanded ? <CaretUp /> : <CaretDown />}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectSection;
