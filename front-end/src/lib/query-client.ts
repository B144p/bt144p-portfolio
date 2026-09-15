import { isServer, QueryClient } from "@tanstack/react-query";

// Portfolio content doesn't change within a visit, so cached data never goes
// stale in-session.
function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

// The server needs a fresh client per request (no cross-request state
// leakage); the browser needs exactly one shared client.
export function getQueryClient(): QueryClient {
  if (isServer) return makeQueryClient();
  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
}
