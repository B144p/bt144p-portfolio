import { queryOptions, useQuery } from "@tanstack/react-query";
import { educationKeys } from "../keys";
import type { IEducation } from "../types";

export type { IEducationDescription, IEducation } from "../types";

// Runs only when the server prefetch didn't already hydrate this key.
// Always goes through this app's own route handler, never port-server.
async function fetchEducation(): Promise<IEducation[]> {
  const res = await fetch("/api/education");
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} /education`);
  return res.json() as Promise<IEducation[]>;
}

export const educationQuery = queryOptions({
  queryKey: educationKeys.all,
  queryFn: fetchEducation,
});

export function useEducation() {
  return useQuery(educationQuery);
}
