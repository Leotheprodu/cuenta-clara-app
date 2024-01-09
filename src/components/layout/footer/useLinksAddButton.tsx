import { AddTransactionIcon } from "@/icons/AddTransactionIcon";
import { AddClientIcon } from "@/icons/AddClientIcon";
import { internalLinks } from "@/components/Utils/internalLinks";
import { $AppState } from "@/stores/generalConfig";
import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";

export const useLinksAddButton = () => {
  const appState = useStore($AppState);
  const [links, setLinks] = useState([
    {
      href: "",
      icon: <AddTransactionIcon />,
      title: "",
      description: "",
      needClient_id: true,
      pagesIncluded: [""],
      delay: 0.2,
    },
  ]);
  useEffect(() => {
    setLinks([
      {
        href: `${internalLinks("client-invoices")}${appState.client_id}`,
        icon: <AddTransactionIcon />,
        title: "Ver Facturas",
        description: `Ir a la sección de facturas de ${appState.client_name}`,
        needClient_id: true,
        pagesIncluded: ["add-invoice"],
        delay: 0.2,
      },
      {
        href: internalLinks("create-client"),
        icon: <AddClientIcon />,
        title: "Crear Cliente",
        description: "Agregar un nuevo cliente",
        needClient_id: false,
        pagesIncluded: ["clients"],
        delay: 0.2,
      },
      {
        href: `${internalLinks("add-invoice")}${appState.client_id}`,
        icon: <AddTransactionIcon />,
        title: "Crear Facturas",
        description: `Agregar una nueva factura a ${appState.client_name}`,
        needClient_id: true,
        pagesIncluded: ["client-invoices"],
        delay: 0.2,
      },
    ]);
  }, [appState]);

  return {
    links,
  };
};
