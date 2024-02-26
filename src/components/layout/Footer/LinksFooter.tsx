import { ClientsIcon } from "@/icons/ClientsIcon";
import { internalLinks } from "@/components/Utils/internalLinks";
import { AddInvoiceIcon } from "@/icons/AddInvoiceIcon";

export const LinksFooter = [
  {
    href: `${internalLinks("add-invoice")}0`,
    icon: <AddInvoiceIcon />,
    text: "Crear",
    exclude: ["ClientSideDashboard"],
    isLoggedInRequired: true,
    page: "add-invoice",
  },
  {
    href: internalLinks("clients"),
    icon: <ClientsIcon />,
    text: "Clientes",
    exclude: ["ClientSideDashboard"],
    isLoggedInRequired: true,
    page: "clients",
  },
];
