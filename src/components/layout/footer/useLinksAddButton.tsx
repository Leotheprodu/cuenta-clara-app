import { AddTransactionIcon } from "@/icons/AddTransactionIcon";
import { AddClientIcon } from "@/icons/AddClientIcon";
import { internalLinks } from "@/components/Utils/internalLinks";
import { $AppState } from "@/stores/generalConfig";
import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { ChangeIcon } from "@/icons/ChangeIcon";
import { TransactionsIcon } from "@/icons/TransactionsIcon";
import { $user } from "@/stores/users";
import { businessConfigInfo } from "@/data/constants";

export const useLinksAddButton = () => {
  const appState = useStore($AppState);
  const client = useStore($user).client.filter(
    (item) => item.parent_user_id === businessConfigInfo.userId
  );
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
        icon: <TransactionsIcon />,
        title: "Ver Facturas",
        description: `Ir a la sección de facturas de ${appState.client_name}`,
        needClient_id: true,
        pagesIncluded: ["add-invoice"],
        delay: 0.2,
      },
      {
        href: internalLinks("create-client"),
        icon: <AddClientIcon />,
        title: "Nuevo Cliente",
        description: "Agrega un nuevo cliente",
        needClient_id: false,
        pagesIncluded: ["clients", "add-invoice"],
        delay: 0.2,
      },
      {
        href: `${internalLinks("add-invoice")}${appState.client_id}`,
        icon: <AddTransactionIcon />,
        title: "Crear Factura",
        description: `Agrega una nueva factura a ${appState.client_name}`,
        needClient_id: true,
        pagesIncluded: ["client-invoices"],
        delay: 0.2,
      },
      {
        href: `${internalLinks("recharge-client")}${client[0]?.id}`,
        icon: <ChangeIcon />,
        title: "Ir a Recargas",
        description: `Ver todas tus rechargas`,
        needClient_id: false,
        pagesIncluded: ["recharges"],
        delay: 0.2,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appState]);

  return {
    links,
  };
};
