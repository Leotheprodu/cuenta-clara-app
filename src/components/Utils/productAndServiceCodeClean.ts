/**
 @description Function that cleans the product and service code, to get the code that is used in the system

*/
export function productAndServiceCodeClean(code: string) {
    const match = code.match(/\d-\d-(.+)/);
    if (match) {
        return match[1];
    } else {
        return ""; // Manejo de casos donde no se encuentra un valor válido
    }
}
