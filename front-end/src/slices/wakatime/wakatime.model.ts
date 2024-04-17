import { Moment } from "moment";

export type IWakaOsSource = {
  data: {
    color: string;
    decimal: string;
    digital: string;
    hours: number;
    minutes: number;
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }[];
};

export type IWakaLanguageSource = {
  data: {
    color: string;
    decimal: string;
    digital: string;
    hours: number;
    minutes: number;
    name: string;
    percent: number;
    text: string;
    total_seconds: number;
  }[];
};

export type IWakaActivitySource = {
  data: {
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
};

export type IContribution = {
  date: string;
  total: number;
  categories: {
    name: string;
    total: number;
  }[];
};

export type IWakaContributionSource = {
  days: IContribution[];
  status: string;
  is_up_to_date: boolean;
  is_up_to_date_pending_future: boolean;
  is_stuck: boolean;
  is_already_updating: boolean;
  range: string;
  percent_calculated: number;
  writes_only: boolean;
  user_id: string;
  is_including_today: boolean;
  human_readable_range: string;
};
