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
