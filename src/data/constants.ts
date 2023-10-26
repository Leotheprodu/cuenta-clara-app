import whiteListPathsJson from "./paths-redirect-wl.json";

export const whiteListPaths: string[] = whiteListPathsJson;

/**
 * @description Constante que contiene el objeto de cliente por defecto
 * @usedIn useFiltersClients.tsx

*/
export const clienteDefault = {
    id: 0,
    username: "Nombre de Cliente",
    email: "correo@correo.com",
    cellphone: 7777777,
    token: "token",
    user_id: null,
    activo: true,
};
