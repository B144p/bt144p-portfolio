import "server-only";
import type { QueryClient } from "@tanstack/react-query";
import { backendGet } from "@/lib/backend";
import { frontendVersionKeys } from "../keys";
import type { IFrontendVersionList } from "../types";

export const getFrontendVersion = () => backendGet<IFrontendVersionList>("/v1/frontend-version");

export function prefetchFrontendVersion(queryClient: QueryClient): Promise<void> {
  return queryClient.prefetchQuery({
    queryKey: frontendVersionKeys.all,
    queryFn: getFrontendVersion,
  });
}
