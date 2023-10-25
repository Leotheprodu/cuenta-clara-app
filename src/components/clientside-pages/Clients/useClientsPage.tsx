import { useEffect, useState } from "react";
import { useCheckSession } from "../../hooks/useCheckSession";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useStore } from "@nanostores/react";
import { $selectedBusiness } from "@/stores/business";

export const useClientsPage = () => {
    useCheckSession();
    const selectedBusiness = useStore($selectedBusiness);
    const [showActivos, setShowActivos] = useState(true);
    const [activeClients, setActiveClients] = useState([{}]);
    const [clients, setClients] = useState([{}]);
    const [filteredClients, setFilteredClients] = useState([{}]);
    const [filteredClientsWB, setFilteredClientsWB] = useState([{}]);
    const [letterSelected, setLetterSelected] = useState("");
    const [dataBalances, setDatabalances] = useState([{}]);

    const { status, data, isLoading } = useQuery({
        queryKey: ["clientes"],
        queryFn: async () =>
            await fetchAPI({
                url: `clients`,
            }),
        retry: 2,
    });

    const { status: statusBalances, data: dataFromBalances } = useQuery({
        queryKey: ["balances-clients"],
        queryFn: async () =>
            await fetchAPI({
                url: `balances`,
            }),
        retry: 2,
    });

    useEffect(() => {
        if (status === "success") {
            if (showActivos)
                setActiveClients(data.filter((item: any) => item.activo == 1));
            else setActiveClients(data.filter((item: any) => item.activo == 0));
        }
    }, [showActivos, data, status]);

    useEffect(() => {
        if (statusBalances === "success") {
            setDatabalances(
                dataFromBalances.filter(
                    (item: any) => item.business_id === selectedBusiness
                )
            );
        }
    }, [selectedBusiness, dataFromBalances, statusBalances]);
    useEffect(() => {
        if (
            status === "success" &&
            activeClients.length > 0 &&
            dataBalances.length > 0
        ) {
            setClients(
                activeClients.filter((item: any) =>
                    dataBalances.some(
                        (balance: any) => balance.client_id === item.id
                    )
                )
            );
            return () => toast.dismiss();
        } else if (status === "error") {
            toast.error("Error al cargar los clientes");
        }
    }, [activeClients, dataBalances, status]);

    useEffect(() => {
        if (!letterSelected) {
            setFilteredClients(clients);
        }
    }, [letterSelected, clients]);
    useEffect(() => {
        if (filteredClients.length > 0 && dataBalances.length > 0) {
            const usuariosConBalance = filteredClients.map((cliente: any) => {
                const balance: any = dataBalances.find(
                    (b: any) => b.client_id === cliente.id
                );
                return {
                    ...cliente,
                    balance: balance ? balance.amount : 0,
                };
            });

            setFilteredClientsWB(usuariosConBalance);
        }
    }, [filteredClients, dataBalances]);

    const HandleLetterFilter = (letter: string) => {
        setLetterSelected(letter);
        if (letterSelected !== letter) {
            const filtered = clients.filter((client: any) =>
                client.username.toLowerCase().startsWith(letter)
            );
            setFilteredClients(filtered);
        } else {
            setLetterSelected("");
            setFilteredClients(clients);
        }
    };
    const HanldeIsSelected = (value: boolean) => {
        setShowActivos(value);
    };

    return {
        filteredClientsWB,
        HandleLetterFilter,
        letterSelected,
        isLoading,
        HanldeIsSelected,
        isSelected: showActivos,
    };
};
