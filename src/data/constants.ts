import whiteListPathsJson from "./paths-redirect-session-whitelist.json";
import countryCodesJson from "./country-codes.json";

/* ----------------------------------JSON files------------------------------------ */
export const whiteListPaths: string[] = whiteListPathsJson;
export const countryCodes: { country: string; code: string }[] =
    countryCodesJson;

/* ----------------------------------Default Initial Data------------------------------------ */
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

/* ----------------------------------URLs------------------------------------ */
/**
 * @description Constante que tiene el dominio de la página, para poder enviar links correctamente.
 */
export const domain = process.env.NEXT_PUBLIC_DOMAIN;
export const baseUrl = process.env.NEXT_PUBLIC_API_URL;
