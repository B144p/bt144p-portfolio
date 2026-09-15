import "server-only";
import type { QueryClient } from "@tanstack/react-query";
import { backendGet } from "@/lib/backend";
import { projectKeys } from "../keys";
import type { IProject } from "../types";

export const getProjects = () => backendGet<IProject[]>("/v1/project");

export function prefetchProjects(queryClient: QueryClient): Promise<void> {
  return queryClient.prefetchQuery({
    queryKey: projectKeys.all,
    queryFn: getProjects,
  });
}
