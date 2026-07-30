import axios from 'axios';

export interface IAboutMe {
  id: string;
  intro: string;
  bio?: string;
  mission?: string;
}

export interface IEducationDescription {
  id: string;
  educationId: string;
  description: string;
}

export interface IEducation {
  id: string;
  title: string;
  startDate: number;
  endDate?: number;
  descriptions: IEducationDescription[];
}

export interface IExperienceResponsibility {
  id: string;
  experienceId: string;
  description: string;
}

export interface IExperience {
  id: string;
  company: string;
  role: string;
  startDate: number;
  endDate?: number;
  responsibilities: IExperienceResponsibility[];
}

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

export type TProjectStatus = 'IN_PROGRESS' | 'ACTIVE' | 'HOLD' | 'PLANNING';

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

export interface IContact {
  id: string;
  title: string;
  url: string;
}

export interface IStatLanguage {
  id: string;
  statisticsId: string;
  language: string;
  totalSeconds: number;
  humanReadable: string;
  percent: number;
}

export interface IStatOS {
  id: string;
  statisticsId: string;
  os: string;
  totalSeconds: number;
  humanReadable: string;
  percent: number;
}

export interface IStatContribution {
  id: string;
  statisticsId: string;
  date: number;
  totalSeconds: number;
}

export interface IStatistic {
  id: string;
  startDate: number;
  endDate: number;
  totalSeconds: number;
  humanReadable: string;
  lastFetch: string;
  languages: IStatLanguage[];
  operatingSystems: IStatOS[];
  contributions: IStatContribution[];
}

export const FRONTEND_VERSION_KEY =
  import.meta.env.VITE_FRONTEND_VERSION_KEY ?? 'bt144p-portfolio';

const portfolioApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'X-Frontend-Version': FRONTEND_VERSION_KEY },
});

export const fetchAboutMe = (): Promise<IAboutMe> =>
  portfolioApi.get<IAboutMe>('/v1/about-me').then((res) => res.data);

export const fetchEducation = (): Promise<IEducation[]> =>
  portfolioApi.get<IEducation[]>('/v1/education').then((res) => res.data);

export const fetchExperience = (): Promise<IExperience[]> =>
  portfolioApi.get<IExperience[]>('/v1/experience').then((res) => res.data);

export const fetchProjects = (): Promise<IProject[]> =>
  portfolioApi.get<IProject[]>('/v1/project').then((res) => res.data);

export const fetchContacts = (): Promise<IContact[]> =>
  portfolioApi.get<IContact[]>('/v1/contact').then((res) => res.data);

export const fetchStatistic = (): Promise<IStatistic> =>
  portfolioApi.get<IStatistic>('/v1/statistic').then((res) => res.data);
