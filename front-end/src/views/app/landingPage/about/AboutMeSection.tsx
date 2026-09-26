"use client";

import { fromUnix } from "../../../../utils/date";
import { FC } from "react";
import reactLogo from "../../../../assets/react.svg";
import { Separator } from "@/components/ui/separator";
import { SkeletonLines } from "@/components/SkeletonLines";
import { Timeline } from "@/components/ui/timeline";
import { colors } from "../../../../utils/colors";
import { useAboutMe } from "@/features/about-me/client";
import { useEducation } from "@/features/education/client";
import { useExperience } from "@/features/experience/client";

const AboutMeSection: FC = () => {
  const { data: aboutMe, isPending: aboutMeLoading } = useAboutMe();
  const { data: education = [], isPending: educationLoading } = useEducation();
  const { data: experience = [], isPending: experienceLoading } = useExperience();

  return (
    <div className="text-primary-text">
      <div id="about-me" className="mb-8 flex justify-center">
        <div className="mx-auto w-[95.8333%]">
          <h1 className="m-4 text-center text-[2rem]">About Me</h1>
          {aboutMeLoading ? (
            <SkeletonLines rows={3} className="space-y-2" />
          ) : (
            <div className="text-base">
              {aboutMe?.intro && <p className="indent-8">{aboutMe.intro}</p>}
              {aboutMe?.bio && <p className="indent-8">{aboutMe.bio}</p>}
              {aboutMe?.mission && <p className="indent-8">{aboutMe.mission}</p>}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <div id="education" className="w-full md:w-[45.8333%]">
          <h2 className="mt-0">Education</h2>
          {educationLoading ? (
            <SkeletonLines rows={4} className="space-y-2" />
          ) : (
            <Timeline
              items={education.map((edu) => ({
                color: colors.primaryText,
                children: (
                  <div>
                    <b className="m-0 text-base">
                      {fromUnix(edu.startDate).format("YYYY")} -{" "}
                      {edu.endDate ? fromUnix(edu.endDate).format("YYYY") : "Present"}
                    </b>
                    <div className="flex justify-center">
                      <div className="flex w-1/6 items-center justify-center">
                        <img src={reactLogo.src} alt="" />
                      </div>
                      <div className="w-5/6">
                        <h2 className="m-0">
                          {edu.title}
                          {edu.descriptions.length > 0 && (
                            <ul className="block text-base font-normal">
                              {edu.descriptions.map((desc) => (
                                <li key={desc.id}>{desc.description}</li>
                              ))}
                            </ul>
                          )}
                        </h2>
                      </div>
                    </div>
                  </div>
                ),
              }))}
            />
          )}
        </div>

        <Separator
          orientation="vertical"
          className="hidden w-1 self-stretch rounded-full bg-primary-text md:block"
        />

        <div id="experience" className="w-full md:w-[45.8333%]">
          <h2 className="mt-0">Experience</h2>
          {experienceLoading ? (
            <SkeletonLines rows={4} className="space-y-2" />
          ) : (
            <Timeline
              items={experience.map((exp) => ({
                color: colors.primaryText,
                children: (
                  <div>
                    <b className="m-0 text-base">
                      {fromUnix(exp.startDate).format("MMM YYYY")} -{" "}
                      {exp.endDate
                        ? (() => {
                            const start = fromUnix(exp.startDate);
                            const end = fromUnix(exp.endDate);
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
                    <div className="flex justify-center">
                      <div className="flex w-1/6 items-center justify-center">
                        <img src={reactLogo.src} alt="" />
                      </div>
                      <div className="w-5/6">
                        <h2 className="m-0">{exp.company}</h2>
                        <h3 className="m-0">
                          <ul className="pl-8">
                            <li>
                              Role: <span className="text-base font-normal">{exp.role}</span>
                            </li>
                            {exp.responsibilities.length > 0 && (
                              <li>
                                Responsibilities:
                                <ul className="block pl-6 text-base font-normal">
                                  {exp.responsibilities.map((r) => (
                                    <li key={r.id}>{r.description}</li>
                                  ))}
                                </ul>
                              </li>
                            )}
                          </ul>
                        </h3>
                      </div>
                    </div>
                  </div>
                ),
              }))}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutMeSection;
