"use client";

import { useSyncExternalStore } from "react";

const subscribe = (query: string) => (onStoreChange: () => void) => {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", onStoreChange);
  return () => mql.removeEventListener("change", onStoreChange);
};

// Server and the first client render can't know the viewport size, so an
// unknown match defaults to true (desktop-first) -- server and client agree
// on the first paint, then the real value takes over post-hydration.
export const useMediaQuery = (query: string): boolean =>
  useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    () => true,
  );
