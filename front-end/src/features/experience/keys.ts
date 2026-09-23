// Client-safe: no import here may reach port-server (lib/backend.ts / ./server).
export const experienceKeys = {
  all: ["experience"] as const,
};
