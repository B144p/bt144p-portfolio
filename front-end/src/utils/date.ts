import moment from "moment";

// Portfolio timestamps are authored in Asia/Bangkok (no DST, always +07:00).
// Formatting in a fixed offset instead of the runtime's local zone keeps the
// server-rendered HTML identical to what every visitor's browser hydrates.
const SITE_UTC_OFFSET_MINUTES = 7 * 60;

export const fromUnix = (unixSeconds: number) =>
  moment.unix(unixSeconds).utcOffset(SITE_UTC_OFFSET_MINUTES);
