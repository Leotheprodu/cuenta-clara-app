export const cellphoneFormat = (cellphone: string) => {
    return `${
        cellphone.toString().slice(-8, -4) +
        " " +
        cellphone.toString().slice(-4)
    }`;
};
