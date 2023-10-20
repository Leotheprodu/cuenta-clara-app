import { useEffect, useState } from "react";
import { useCheckSession } from "../../hooks/useCheckSession";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useClientsPage = () => {
    useCheckSession();

    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [letterSelected, setLetterSelected] = useState("");
    const { status, data } = useQuery({
        queryKey: ["clientes"],
        queryFn: async () =>
            await fetchAPI({
                url: "clients?activo=true",
            }),
        retry: 2,
    });
    useEffect(() => {
        if (status === "pending") {
            toast.loading("Cargando...");
        } else if (status === "success") {
            toast.dismiss();
            setClients(data);
            toast(`Tienes ${data.length} clientes!`, {
                position: "top-left",
                icon: "👉🏽",
            });
        } else if (status === "error") {
            toast.dismiss();
            toast.error("Error al cargar los clientes");
        }
    }, [data, status]);

    useEffect(() => {
        if (!letterSelected) {
            setFilteredClients(clients);
        }
    }, [letterSelected, clients]);

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

    return {
        filteredClients,
        HandleLetterFilter,
        letterSelected,
    };
};
