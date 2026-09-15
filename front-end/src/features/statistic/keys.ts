// Client-safe: no import here may reach port-server (lib/backend.ts / ./server).
export const statisticKeys = {
  all: ["statistic"] as const,
};
