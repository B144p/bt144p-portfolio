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
