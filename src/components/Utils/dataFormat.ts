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
