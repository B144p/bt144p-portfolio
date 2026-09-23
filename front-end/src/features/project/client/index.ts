import { queryOptions, useQuery } from "@tanstack/react-query";
import { projectKeys } from "../keys";
import type { IProject } from "../types";

export type { IProjectTag, IProjectSource, TProjectStatus, IProject } from "../types";

// Runs only when the server prefetch didn't already hydrate this key.
// Always goes through this app's own route handler, never port-server.
async function fetchProjects(): Promise<IProject[]> {
  const res = await fetch("/api/project");
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} /project`);
  return res.json() as Promise<IProject[]>;
}

export const projectQuery = queryOptions({
  queryKey: projectKeys.all,
  queryFn: fetchProjects,
});

export function useProjects() {
  return useQuery(projectQuery);
}
