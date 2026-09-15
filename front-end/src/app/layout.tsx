import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Providers } from "@/components/providers";
import BaseLayout from "@/layouts/BaseLayout";
import StyledComponentsRegistry from "@/lib/registry";
import "../index.scss";

export const metadata: Metadata = {
  title: "BT-144p: Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <StyledComponentsRegistry>
            <Providers>
              <BaseLayout>{children}</BaseLayout>
            </Providers>
          </StyledComponentsRegistry>
        </AntdRegistry>
      </body>
    </html>
  );
}
