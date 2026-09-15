import "server-only";
import type { QueryClient } from "@tanstack/react-query";
import { backendGet } from "@/lib/backend";
import { educationKeys } from "../keys";
import type { IEducation } from "../types";

export const getEducation = () => backendGet<IEducation[]>("/v1/education");

export function prefetchEducation(queryClient: QueryClient): Promise<void> {
  return queryClient.prefetchQuery({
    queryKey: educationKeys.all,
    queryFn: getEducation,
  });
}
