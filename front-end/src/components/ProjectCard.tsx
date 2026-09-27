"use client";

import { Plugs } from "@phosphor-icons/react";
import React from "react";
import type { IProjectSource } from "@/features/project/client";
import { BugIcon } from "@/components/icons/BugIcon";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  detail: string;
  tagList: string[];
  statusLabel?: string | null;
  sources?: IProjectSource[];
};

const chipClassName =
  "whitespace-nowrap rounded bg-nav-background/70 px-1.5 font-[Montserrat] text-[0.75rem] leading-5 font-bold text-bright-text";

const ProjectCard: React.FC<Props> = ({
  title,
  detail,
  tagList,
  statusLabel,
  sources = [],
}) => {
  const upcoming = Boolean(statusLabel);

  return (
    <div
      className={cn(
        "group relative rounded-2xl bg-green-dark p-1.5 transition-all duration-200 ease-in-out hover:bg-green-lighter",
      )}
    >
      <div
        className={cn(
          "relative flex aspect-3/2 w-full items-center justify-center rounded-lg bg-card text-[3rem]",
          upcoming ? "cursor-not-allowed" : "cursor-pointer",
        )}
      >
        {upcoming && (
          <div className="absolute inset-0 rounded-lg backdrop-blur-sm" />
        )}
        <BugIcon />
        {statusLabel && (
          <span className="absolute text-[2rem]">{statusLabel}</span>
        )}
      </div>
      {/* items-start + shrink-0: as a stretched flex item the icon box would
          grow with a multi-line description and stop being square. */}
      <div className="mt-3 flex flex-row items-start">
        <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[0.3125rem] bg-card text-base">
          <Plugs />
        </div>
        <div className="ml-2 flex min-w-0 flex-col justify-center font-[Montserrat] text-bright-text">
          <div className="text-[0.9rem] font-bold">{title}</div>
          {/* Two lines with ellipsis (min-h reserves both, so short ones don't
              make a shorter card) keep cards the same height; the full
              text shows on hover, like the tags. No hover on touch, so
              phones always get the full text. */}
          <div
            title={detail}
            className="line-clamp-2 min-h-[3em] text-[0.7rem] leading-[1.5] group-hover:line-clamp-none max-md:line-clamp-none"
          >
            {detail}
          </div>
        </div>
      </div>
      <div
        className={cn(
          "flex w-full gap-1 overflow-auto [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar]:hidden group-hover:[&::-webkit-scrollbar]:block",
          "max-md:mt-2 max-md:flex-wrap max-md:overflow-visible",
        )}
      >
        {tagList.map((text, index) => (
          <div
            key={index}
            className={cn(
              chipClassName,
              "-mt-4 opacity-0 transition-all duration-400 group-hover:mt-2 group-hover:mb-1 group-hover:opacity-100 max-md:m-0 max-md:opacity-100",
            )}
          >
            {text}
          </div>
        ))}
      </div>
      {sources.length > 0 && (
        <div className="mt-2 flex w-full flex-wrap gap-1">
          {sources.map((source) => (
            <a
              key={source.id}
              className={cn(chipClassName, "no-underline hover:bg-green-lighter")}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              ↗ {source.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
