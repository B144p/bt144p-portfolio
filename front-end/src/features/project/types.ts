export interface IProjectTag {
  id: string;
  projectId: string;
  tag: string;
}

export interface IProjectSource {
  id: string;
  projectId: string;
  title: string;
  url: string;
}

export type TProjectStatus = "IN_PROGRESS" | "ACTIVE" | "HOLD" | "PLANNING";

export interface IProject {
  id: string;
  title: string;
  description: string;
  preview?: string;
  logo?: string;
  status: TProjectStatus;
  order: number;
  sources: IProjectSource[];
  tags: IProjectTag[];
}
