import { useEffect, useState } from "react";
import { useCheckSession } from "../../hooks/useCheckSession";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useClientsPage = () => {
    useCheckSession();
    const [isSelected, setIsSelected] = useState(true);
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [letterSelected, setLetterSelected] = useState("");
    const { status, data, isLoading, refetch } = useQuery({
        queryKey: ["clientes"],
        queryFn: async () =>
            await fetchAPI({
                url: `clients?activo=${isSelected ? "true" : "false"}`,
            }),
        retry: 2,
    });
    useEffect(() => {
        if (status === "success") {
            setClients(data);
            return () => toast.dismiss();
        } else if (status === "error") {
            toast.error("Error al cargar los clientes");
        }
    }, [data, status]);

    useEffect(() => {
        if (!letterSelected) {
            setFilteredClients(clients);
        }
    }, [letterSelected, clients]);
    useEffect(() => {
        refetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSelected]);

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
        setIsSelected(value);
    };

    return {
        filteredClients,
        HandleLetterFilter,
        letterSelected,
        isLoading,
        HanldeIsSelected,
        isSelected,
    };
};
