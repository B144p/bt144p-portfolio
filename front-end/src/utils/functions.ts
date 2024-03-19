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
    if (expirationTime > new Date()) {
      return parsedData.data;
    } else {
      localStorage.removeItem(storageName);
    }
  }
  return null;
};

export const storeCacheData = (data: Record<string, any>, storageName: string) => {
  const expirationTime = new Date();
  // expirationTime.setDate(expirationTime.getDate() + 1);
  expirationTime.setDate(expirationTime.getHours() + 8);
  localStorage.setItem(storageName, JSON.stringify({ data, expirationTime }));
};
