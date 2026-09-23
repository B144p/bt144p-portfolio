import { HTMLAttributeAnchorTarget } from "react";

export const numberFloatFormat = (value: number = 0, decimal: number = 2) => {
  return Intl.NumberFormat("en-EN", {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  }).format(value);
};

export const openNewTabURL = (
  url: string,
  target: HTMLAttributeAnchorTarget = "_blank"
) => {
  window.open(url, target)?.focus();
};

export const copyTextClipboard = (text: string) =>
  navigator.clipboard.writeText(text);
