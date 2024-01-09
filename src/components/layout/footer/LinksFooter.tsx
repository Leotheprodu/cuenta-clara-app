import { HomeIcon } from "@/icons/HomeIcon";
import { ClientsIcon } from "@/icons/ClientsIcon";
import { internalLinks } from "@/components/Utils/internalLinks";
import { AddInvoiceIcon } from "@/icons/AddInvoiceIcon";

export const LinksFooter = [
  {
    href: `${internalLinks("add-invoice")}0`,
    icon: <AddInvoiceIcon />,
    text: "Crear",
  },
  {
    href: internalLinks("clients"),
    icon: <ClientsIcon />,
    text: "Clientes",
  },
];
