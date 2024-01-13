import { internalLinks } from "@/components/Utils/internalLinks";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { LogoutIcon } from "@/icons/LogoutIcon";
import { LoginIcon } from "@/icons/LoginIcon";
import { ClientsIcon } from "@/icons/ClientsIcon";
import { TransactionsIcon } from "@/icons/TransactionsIcon";
import { useEffect, useState } from "react";

export const useLinksHeader = () => {
  const user = useStore($user);
  const [data, setData] = useState([
    {
      link: {
        href: "",
        icon: <LogoutIcon />,
        text: "",
        exclude: [""],
        isLoggedInRequired: true,
      },

      delay: 0,
    },
  ]);

  useEffect(() => {
    setData([
      {
        link: {
          href: internalLinks("users"),
          icon: user.isLoggedIn === true ? <LogoutIcon /> : <LoginIcon />,
          text: user.isLoggedIn === true ? "Cerrar sesion" : "Iniciar sesion",
          exclude: [],
          isLoggedInRequired: false,
        },

        delay: 0.1,
      },
      {
        link: {
          href: internalLinks("clients"),
          icon: <ClientsIcon />,
          text: "Clientes",
          exclude: [],
          isLoggedInRequired: true,
        },

        delay: 0.2,
      },
      {
        link: {
          href: internalLinks("recharges"),
          icon: <TransactionsIcon />,
          text: "Recargar saldo",
          exclude: [],
          isLoggedInRequired: true,
        },
        delay: 0.3,
      },
    ]);
  }, [user.isLoggedIn]);
  return { data };
};
