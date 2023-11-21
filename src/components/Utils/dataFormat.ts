export const moneyFormat = (
  value: number,
  currency: string = "USD",
  langCountry: string = "en-US"
) => {
  const formatter = new Intl.NumberFormat(langCountry, {
    style: "currency",
    currency,
  });

  return formatter.format(value);
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
};

export const formatDate = (date: string) => {
  const dateParts = date.split("-");
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];
  return `${day}-${month}-${year}`;
};
