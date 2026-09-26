import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import { prefetchAboutMe } from "@/features/about-me/server";
import { prefetchContacts } from "@/features/contact/server";
import { prefetchEducation } from "@/features/education/server";
import { prefetchExperience } from "@/features/experience/server";
import { prefetchFrontendVersion } from "@/features/frontend-version/server";
import { prefetchProjects } from "@/features/project/server";
import { prefetchStatistic } from "@/features/statistic/server";
import BaseLayout from "@/layouts/BaseLayout";
import { getQueryClient } from "@/lib/query-client";
import "./globals.css";

export const metadata: Metadata = {
  title: "BT-144p: Portfolio",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  // BaseLayout (footer contacts + view count) wraps every route, and the
  // landing page is the only page, so every query is prefetched here.
  const queryClient = getQueryClient();
  await Promise.all([
    prefetchAboutMe(queryClient),
    prefetchEducation(queryClient),
    prefetchExperience(queryClient),
    prefetchProjects(queryClient),
    prefetchContacts(queryClient),
    prefetchStatistic(queryClient),
    prefetchFrontendVersion(queryClient),
  ]);

  return (
    <html lang="en">
      <body>
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <BaseLayout>{children}</BaseLayout>
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
