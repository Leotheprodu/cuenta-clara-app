import whiteListPathsJson from "./paths-redirect-session-whitelist.json";
import countryCodesJson from "./country-codes.json";

/* ----------------------------------Basic Constants------------------------------------ */
const appName = "Billeo";
const appDescription = `Con ${appName}, controla las cuentas de tus clientes, facturacion de tu negocio, y mucho mas.`;
/* ----------------------------------JSON files------------------------------------ */
const whiteListPaths: string[] = whiteListPathsJson;
const countryCodes: { country: string; code: string }[] = countryCodesJson;

/* ----------------------------------Default Initial Data------------------------------------ */
/**
 * @description Constante que contiene el objeto de cliente por defecto
 * @usedIn useFiltersClients.tsx
 */
const clienteDefault = {
    id: 0,
    username: "Nombre de Cliente",
    email: "correo@correo.com",
    cellphone: 7777777,
    token: "token",
    user_id: null,
    active: true,
    country: "Costa Rica",
};

/* ----------------------------------URLs------------------------------------ */
/**
 * @description Constante que tiene el dominio de la página, para poder enviar links correctamente.
 */
const domain = process.env.NEXT_PUBLIC_DOMAIN;
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export {
    appName,
    appDescription,
    whiteListPaths,
    countryCodes,
    clienteDefault,
    domain,
    baseUrl,
};
