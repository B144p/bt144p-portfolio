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
