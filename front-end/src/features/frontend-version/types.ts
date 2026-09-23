export interface IFrontendVersion {
  id: string;
  key: string;
  url: string;
  title: string;
  description?: string | null;
  thumbnail?: string | null;
  show: boolean;
  order: number;
  views: number;
}

export interface IFrontendVersionList {
  totalViews: number;
  versions: IFrontendVersion[];
}
