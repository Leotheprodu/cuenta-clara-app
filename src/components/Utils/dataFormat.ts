import { countryCodes } from "@/data/constants";
import { $user } from "@/stores/users";

export const moneyFormat = (value: number) => {
  const userCountry = $user.value?.user.country;
  const data = countryCodes.find(
    (countryCode) => countryCode.country === userCountry
  );
  const currency: string = (data?.currency as string) || "CRC";
  const langCountry: string = (data?.langCountry as string) || "es-CR";

  const formatter = new Intl.NumberFormat(langCountry, {
    style: "currency",
    currency,
  });
  return formatter.format(value);
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("es-CR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
};

export const formatDate = (date: string) => {
  const dateObject = new Date(date);

  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Los meses van de 0 a 11, por eso se suma 1
  const year = dateObject.getFullYear();
  return `${day}-${month}-${year}`;
};
