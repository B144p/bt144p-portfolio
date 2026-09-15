import { queryOptions, useQuery } from "@tanstack/react-query";
import { experienceKeys } from "../keys";
import type { IExperience } from "../types";

export type { IExperienceResponsibility, IExperience } from "../types";

// Runs only when the server prefetch didn't already hydrate this key.
// Always goes through this app's own route handler, never port-server.
async function fetchExperience(): Promise<IExperience[]> {
  const res = await fetch("/api/experience");
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} /experience`);
  return res.json() as Promise<IExperience[]>;
}

export const experienceQuery = queryOptions({
  queryKey: experienceKeys.all,
  queryFn: fetchExperience,
});

export function useExperience() {
  return useQuery(experienceQuery);
}
