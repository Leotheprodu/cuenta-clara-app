import whiteListPathsJson from "./paths-redirect-session-whitelist.json";
import countryCodesJson from "./country-codes.json";
import paymentMethodsJson from "./payment-methods.json";

/* ----------------------------------Basic Constants------------------------------------ */
const appName = "Yehu";
const appDescription = `${appName}, Tu negocio en tus manos`;
const billingPrice = 0.035;
const businessConfigInfo = {
  userId: 9,
  businessId: 1,
  whatsapp: "63017707",
};

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
type TypeOfProductsAndServices = {
  [key: string]: {
    name: string;
    nombre: string;
  };
};
const typeOfProductsAndServices: TypeOfProductsAndServices = {
  product: { name: "Product", nombre: "Producto" },
  service: { name: "Service", nombre: "Servicio" },
};

const typeOfRoles = {
  admin: {
    id: 1,
    name: "admin",
  },
  verified: {
    id: 2,
    name: "verified",
  },
  unverified: {
    id: 3,
    name: "unverified",
  },
  vip: {
    id: 4,
    name: "vip",
  },
};

const paymentMethod = {
  cash: {
    id: paymentMethods[0].id,
    name: paymentMethods[0].name,
  },
  sinpeMovil: {
    id: paymentMethods[1].id,
    name: paymentMethods[1].name,
  },
  bankTransfer: {
    id: paymentMethods[2].id,
    name: paymentMethods[2].name,
  },
  paypal: {
    id: paymentMethods[3].id,
    name: paymentMethods[3].name,
  },
  creditCard: {
    id: paymentMethods[4].id,
    name: paymentMethods[4].name,
  },
};
const invoicesStatus = {
  paid: "paid",
  pending: "pending",
  cancelled: "cancelled",
  inReview: "inReview",
  inProcess: "inProcess",
};
const clientStatusInvoice = {
  paid: "Pagada",
  pending: "Pendiente",
  cancelled: "Cancelada",
  inReview: "En revisión",
  inProcess: "En proceso",
};
const paymentStatus = {
  completed: { id: 2, name: "Completado" },
  pending: { id: 1, name: "Pendiente" },
  cancelled: { id: 3, name: "Cancelado" },
};
const ramdomSaludo = [
  "Hola",
  "Hey",
  "Excelente",
  "En buena hora",
  "Muy bien",
  "Genial",
  "Perfecto",
  "Buenas Noticias",
];

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
        unit: "",
        type: "",
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
        name: "pending",
      },
    },
  ],
};
const transactionsInvoiceDashboard: TransactionsInvoiceDashboard = {
  id: 0,
  status: "pending",
  total_amount: 0.0,
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
        name: "pending",
      },
    },
  ],
};
const ClientDashboardInitialData: ClientDashboardData = {
  client: {
    id: 0,
    username: "",
    email: "",
    cellphone: null,
    active: false,
    country: "",
    user_id: null,
  },
  balances: [
    {
      id: 0,
      amount: "0.00",
      users_business: {
        id: 0,
        name: "",
        user_payment_methods: [
          {
            id: 0,
            payment_method_full_name: "",
            payment_method_cellphone: "",
            payment_method_iban: "",
            payment_method_email: "",
            payment_method_description: "",
            payment_method: {
              id: 0,
              name: "",
            },
          },
        ],
        user: {
          id: 0,
          username: "",
          email: "",
          cellphone: "",
          country: "",
        },
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

const initialStateTransactionForm = {
  date: "",
  amount: 0,
  description: "",
  parent_user_id: 0,
  client_id: 0,
  payment_method_id: 0,
  invoice_id: 0,
  status_id: 0,
};
const paymentMethodsDefault: PaymentInfo = {
  id: 0,
  payment_method_full_name: "",
  payment_method_cellphone: "",
  payment_method_iban: "",
  payment_method_email: "",
  payment_method_description: "",
  payment_method: {
    id: 0,
    name: "",
  },
  users_business: {
    id: 0,
    name: "",
    user_id: 0,
  },
};
const balanceTypesDefault: BalanceTypes = {
  id: 0,
  name: "",
  price: 0,
  balance: 0,
  extra: 0,
};
const DataRechargesBalanceByClientDefault: DataRechargesBalanceByClientProps = {
  id: 0,
  amount: 0,
  balance_amount: 0,
  status: "pending",
  createdAt: "",
  updatedAt: "",
  balances_type: {
    id: 0,
    name: "",
  },
  client: {
    id: 0,
    username: "",
    cellphone: "",
    token: "",
    email: "",
  },
  balance: {
    id: 0,
    amount: "",
  },
  user_payment_method: {
    id: 0,
    payment_method_full_name: "",
    payment_method_cellphone: "",
    payment_method_iban: "",
    payment_method_email: "",
    payment_method_description: "",
    payment_method: {
      id: 0,
      name: "",
    },
  },
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
  paymentMethod,
  paymentMethods,
  clientStatusInvoice,
  invoicesStatus,
  paymentStatus,
  initialStateTransactionForm,
  ramdomSaludo,
  businessConfigInfo,
  paymentMethodsDefault,
  balanceTypesDefault,
  typeOfRoles,
  DataRechargesBalanceByClientDefault,
  ClientDashboardInitialData,
  typeOfProductsAndServices,
  transactionsInvoiceDashboard,
};
