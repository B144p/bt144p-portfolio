import { HTMLAttributeAnchorTarget } from "react";

export const numberIntFormat = (value: number = 0) => {
  return Intl.NumberFormat("en-EN", {
    maximumFractionDigits: 0,
  }).format(value);
};

export const numberFloatFormat = (value: number = 0, decimal: number = 2) => {
  return Intl.NumberFormat("en-EN", {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  }).format(value);
};

export const getDataFromCache = (storageName: string) => {
  const cachedData = localStorage.getItem(storageName);
  if (cachedData) {
    const parsedData = JSON.parse(cachedData);
    const expirationTime = new Date(parsedData.expirationTime);
    const currentDate = new Date();
    // expire date is UTC
    if (expirationTime > currentDate) {
      return parsedData.data;
    } else {
      localStorage.removeItem(storageName);
    }
  }
  return null;
};

export const storeCacheData = (
  data: Record<string, any>,
  storageName: string,
  expireHour: number = 1
) => {
  const expirationTime = new Date();
  expirationTime.setHours(expirationTime.getHours() + expireHour);
  localStorage.setItem(storageName, JSON.stringify({ data, expirationTime }));
};

export const openNewTabURL = (
  url: string,
  target: HTMLAttributeAnchorTarget = "_blank"
) => {
  window.open(url, target)?.focus();
};

export const copyTextClipboard = (text: string) =>
  navigator.clipboard.writeText(text);
