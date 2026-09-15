import "server-only";
import type { QueryClient } from "@tanstack/react-query";
import { backendGet } from "@/lib/backend";
import { experienceKeys } from "../keys";
import type { IExperience } from "../types";

export const getExperience = () => backendGet<IExperience[]>("/v1/experience");

export function prefetchExperience(queryClient: QueryClient): Promise<void> {
  return queryClient.prefetchQuery({
    queryKey: experienceKeys.all,
    queryFn: getExperience,
  });
}
