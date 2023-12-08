import { countryCodes } from "@/data/constants";
import { $user } from "@/stores/users";

export const moneyFormat = (value: number) => {
  const userCountry = $user.value?.user.country;
  const data = countryCodes.find(
    (countryCode) => countryCode.country === userCountry
  );
  const currency: string = (data?.currency as string) || "USD";
  const langCountry: string = (data?.langCountry as string) || "en-US";

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
