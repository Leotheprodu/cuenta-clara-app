import whiteListPathsJson from "./paths-redirect-session-whitelist.json";
import countryCodesJson from "./country-codes.json";

/* ----------------------------------Basic Constants------------------------------------ */
const appName = "Monni";
const appDescription = `${appName}, Facilita tu vida, una app para administrar saldos, pagos, recibos de dinero de manera sencilla.`;
const BalanceControlPrice = 0.05;
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
const BusinessDefault = {
  id: 0,
  name: "Su negocio",
  default: false,
  user_id: 0,
};
const invoiceDefault = {
  id: 0,
  parent_user_id: 0,
  client_id: 0,
  total_amount: 0,
  paid: false,
  business_id: 0,
  date: "",
};
// constante que contiene los datos por defecto de los productos y servicios
const productsAndServicesDefault: DataProductsAndServicesProps = {
  id: null,
  user_id: null,
  name: "",
  description: "",
  unit: "",
  unit_price: 0,
  default: false,
  business_id: null,
  code: "",
  type: "",
};
// Datos iniciales para los detalles de la factura
const initialStateInvoiceDetail: InitialStateInvoiceDetailProps = {
  code: "",
  quantity: 0,
  unit_price: 0,
  subtotal: 0,
  description: "",
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
  BusinessDefault,
  domain,
  baseUrl,
  productsAndServicesDefault,
  initialStateInvoiceDetail,
  invoiceDefault,
  BalanceControlPrice,
};
