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
