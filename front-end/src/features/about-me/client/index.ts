import { queryOptions, useQuery } from "@tanstack/react-query";
import { aboutMeKeys } from "../keys";
import type { IAboutMe } from "../types";

export type { IAboutMe } from "../types";

// Runs only when the server prefetch didn't already hydrate this key.
// Always goes through this app's own route handler, never port-server.
async function fetchAboutMe(): Promise<IAboutMe> {
  const res = await fetch("/api/about-me");
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} /about-me`);
  return res.json() as Promise<IAboutMe>;
}

export const aboutMeQuery = queryOptions({
  queryKey: aboutMeKeys.all,
  queryFn: fetchAboutMe,
});

export function useAboutMe() {
  return useQuery(aboutMeQuery);
}
