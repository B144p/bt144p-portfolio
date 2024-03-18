import { Moment } from "moment";

export type IWakaOsSource = {
  color: string;
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  text: string;
  total_seconds: number;
};

export type IWakaLanguageSource = {
  color: string;
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  text: string;
  total_seconds: number;
};

export type IWakaActivitySource = {
  best_day: {
    date: string;
    text: string;
    total_seconds: number;
  };
  grand_total: {
    daily_average: number;
    daily_average_including_other_language: number;
    human_readable_daily_average: string;
    human_readable_daily_average_including_other_language: string;
    human_readable_total: string;
    human_readable_total_including_other_language: string;
    total_seconds: number;
    total_seconds_including_other_language: number;
  };
  range: {
    start: Moment;
    end: Moment;
    range: string;
    days_including_holidays: number;
    days_minus_holidays: number;
    holidays: number;
  };
};
