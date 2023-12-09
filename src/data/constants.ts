import whiteListPathsJson from "./paths-redirect-session-whitelist.json";
import countryCodesJson from "./country-codes.json";
import paymentMethodsJson from "./payment-methods.json";

/* ----------------------------------Basic Constants------------------------------------ */
const appName = "Yehu";
const appDescription = `${appName}, Tu negocio en tus manos`;
const billingPrice = 0.03;
/* ----------------------------------JSON files------------------------------------ */
const whiteListPaths: string[] = whiteListPathsJson;
const countryCodes: {
  country: string;
  code: string;
  currency: string;
  langCountry: string;
}[] = countryCodesJson;
const paymentMethods: { id: number; name: string }[] = paymentMethodsJson;
/* ----------------------------------Dictionaries---------------------------------------------- */
const invoicesStatus = {
  paid: "paid",
  pending: "pending",
  cancelled: "cancelled",
  inReview: "inReview",
};

/* ----------------------------------Default Initial Data------------------------------------ */
/**
 * @description Constante que contiene el objeto de cliente por defecto
 * @usedIn useFiltersClients.tsx
 */
const clientDefault: ClientProps = {
  id: 0,
  username: "Nombre de Cliente",
  email: "correo@correo.com",
  cellphone: "7777777",
  token: "token",
  user_id: null,
  active: true,
  country: "Costa Rica",
  createdAt: "",
  updatedAt: "",
  parent_user_id: 0,
  detail: "",
  balances: [
    {
      id: 0,
      amount: "0.00",
      users_business: {
        id: 0,
        name: "",
      },
    },
  ],
};
const BusinessDefault = {
  id: 0,
  name: "Su negocio",
  default: false,
  user_id: 0,
};
const invoiceDefault: Invoice = {
  id: 0,
  total_amount: 0.0,
  status: "pending",
  date: "",
  users_business: {
    id: 0,
    name: "",
  },
  client: {
    id: 0,
    username: "",
  },
  invoice_details: [
    {
      id: 0,
      quantity: "0.00",
      description: "",
      unit_price: "0.00",
      subtotal: "0.00",
      code: "",
      products_and_service: {
        id: 0,
        name: "",
      },
    },
  ],
  transactions: [
    {
      id: "",
      amount: "0.00",
      description: "",
      date: "",
      payment_method: {
        id: 0,
        name: "",
      },
      payment_status: {
        id: 0,
        name: "",
      },
    },
  ],
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
const clientStatusInvoice = {
  paid: "Pagada",
  pending: "Pendiente",
  cancelled: "Cancelada",
  inReview: "En revisión",
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
  clientDefault,
  BusinessDefault,
  domain,
  baseUrl,
  productsAndServicesDefault,
  initialStateInvoiceDetail,
  invoiceDefault,
  billingPrice,
  paymentMethods,
  clientStatusInvoice,
  invoicesStatus,
};
