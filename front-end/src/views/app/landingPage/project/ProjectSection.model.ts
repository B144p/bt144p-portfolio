import { HTMLAttributeAnchorTarget } from "react";

export type TProjectList = {
  name: string;
  detail: string;
  tag: string[];
  path: string;
  target: HTMLAttributeAnchorTarget;
  upcoming?: boolean;
};
