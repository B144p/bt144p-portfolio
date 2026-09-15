import { queryOptions, useQuery } from "@tanstack/react-query";
import { statisticKeys } from "../keys";
import type { IStatistic } from "../types";

export type { IStatLanguage, IStatOS, IStatContribution, IStatistic } from "../types";

// Runs only when the server prefetch didn't already hydrate this key.
// Always goes through this app's own route handler, never port-server.
async function fetchStatistic(): Promise<IStatistic> {
  const res = await fetch("/api/statistic");
  if (!res.ok) throw new Error(`LINK FAILURE // ${res.status} /statistic`);
  return res.json() as Promise<IStatistic>;
}

export const statisticQuery = queryOptions({
  queryKey: statisticKeys.all,
  queryFn: fetchStatistic,
});

export function useStatistic() {
  return useQuery(statisticQuery);
}
