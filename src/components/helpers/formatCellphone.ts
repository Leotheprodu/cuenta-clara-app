export const formatCellphone = (cellphone: string) => {
    const firstPart = cellphone.slice(0, 4); // Obtener los primeros 5 caracteres
    const secondPart = cellphone.slice(5); // Obtener los caracteres restantes

    const formattedCellphone = `+506 ${firstPart} ${secondPart}`;

    return formattedCellphone;
};
