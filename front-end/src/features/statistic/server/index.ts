import "server-only";
import type { QueryClient } from "@tanstack/react-query";
import { backendGet } from "@/lib/backend";
import { statisticKeys } from "../keys";
import type { IStatistic } from "../types";

export const getStatistic = () => backendGet<IStatistic>("/v1/statistic");

export function prefetchStatistic(queryClient: QueryClient): Promise<void> {
  return queryClient.prefetchQuery({
    queryKey: statisticKeys.all,
    queryFn: getStatistic,
  });
}
