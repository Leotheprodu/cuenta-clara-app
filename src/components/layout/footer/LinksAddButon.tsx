import { AddTransactionIcon } from "@/icons/AddTransactionIcon";
import { AddClientIcon } from "@/icons/AddClientIcon";

export const LinksAddButon = [
    {
        href: "/nueva-transaccion",
        icon: <AddTransactionIcon />,
        title: "Nueva Transacción",
        description: "Agregar una nueva transacción",
        delay: 0.2,
    },
    {
        href: "/clientes/nuevo",
        icon: <AddClientIcon />,
        title: "Nuevo Cliente",
        description: "Agregar un nuevo cliente",
        delay: 0.4,
    },
];
