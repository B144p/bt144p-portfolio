import { queryOptions, useQuery } from "@tanstack/react-query";
import { frontendVersionKeys } from "../keys";
import type { IFrontendVersionList } from "../types";

export type { IFrontendVersion, IFrontendVersionList } from "../types";
export { FRONTEND_VERSION_KEY } from "../keys";

// Runs only when the server prefetch didn't already hydrate this key.
// Always goes through this app's own route handler, never port-server.
async function fetchFrontendVersion(): Promise<IFrontendVersionList> {
  const res = await fetch("/api/frontend-version");
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} /frontend-version`);
  return res.json() as Promise<IFrontendVersionList>;
}

export const frontendVersionQuery = queryOptions({
  queryKey: frontendVersionKeys.all,
  queryFn: fetchFrontendVersion,
});

export function useFrontendVersion() {
  return useQuery(frontendVersionQuery);
}
