// Client-safe: no import here may reach port-server (lib/backend.ts / ./server).
export const frontendVersionKeys = {
  all: ["frontend-version"] as const,
};

// Must match a FrontendVersion.key row in port-server — it identifies this
// frontend for view counting. The client also needs it, to find this site's
// own entry in the catalog for the footer view count.
export const FRONTEND_VERSION_KEY =
  process.env.NEXT_PUBLIC_FRONTEND_VERSION_KEY ?? "bt144p-portfolio";
