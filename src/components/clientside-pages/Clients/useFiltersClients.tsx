import { clienteDefault } from "@/data/constants";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
export const useFiltersClients = ({
    data,
    status,
    isShowActivoButton,
    dataBalances,
}: FilterClientsProps) => {
    const [activeClients, setActiveClients] = useState([{}]);
    const [clients, setClients] = useState([{}]);
    const [filteredClientsWB, setFilteredClientsWB] = useState([{}]);

    //1 Clientes activos o inactivos
    useEffect(() => {
        if (status === "success") {
            if (isShowActivoButton)
                setActiveClients(data.filter((item: any) => item.activo == 1));
            else setActiveClients(data.filter((item: any) => item.activo == 0));
        } else if (status === "error") {
            toast.error("Error al cargar los clientes");
            setActiveClients([clienteDefault]);
        }
    }, [isShowActivoButton, data, status]);

    //2 A los clientes filtrados por activos o inactivos, se compara con los balances filtrados por negocio
    // de esa manera podemos clasificar los clientes asignados a un negocio u otro.
    useEffect(() => {
        if (activeClients.length > 0 && dataBalances.length > 0) {
            setClients(
                activeClients.filter((item: any) =>
                    dataBalances.some(
                        (balance: any) => balance.client_id === item.id
                    )
                )
            );
        } else {
            setClients(activeClients);
        }
    }, [activeClients, dataBalances]);

    //3 Se rellena el estado de los clientes con su balance (saldo)
    useEffect(() => {
        if (clients.length > 0 && dataBalances.length > 0) {
            const usuariosConBalance = clients.map((cliente: any) => {
                const balance: any = dataBalances.find(
                    (b: any) => b.client_id === cliente.id
                );
                if (cliente.id >= 0) {
                    return {
                        ...cliente,
                        balance: balance ? balance.amount : 0,
                    };
                } else return clienteDefault;
            });

            setFilteredClientsWB(usuariosConBalance);
        } else {
            setFilteredClientsWB(clients);
        }
    }, [clients, dataBalances]);

    return {
        filteredClientsWB,
    };
};
