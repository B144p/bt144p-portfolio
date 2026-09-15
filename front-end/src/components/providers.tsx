"use client";

import "@ant-design/v5-patch-for-react-19";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/app/store";

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
