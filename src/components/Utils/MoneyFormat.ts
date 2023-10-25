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
