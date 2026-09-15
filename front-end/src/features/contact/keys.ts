// Client-safe: no import here may reach port-server (lib/backend.ts / ./server).
export const contactKeys = {
  all: ["contact"] as const,
};
