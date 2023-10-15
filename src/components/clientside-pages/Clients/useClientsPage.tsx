import { useEffect, useState } from "react";
import { useCheckSession } from "../../hooks/useCheckSession";
import { fetchAPI } from "../../Utils/fetchAPI";

export const useClientsPage = () => {
    useCheckSession();

    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [letterSelected, setLetterSelected] = useState("");

    useEffect(() => {
        const bdClients = async () => {
            if (clients.length === 0) {
                const { data } = await fetchAPI({
                    url: "clients?activo=true",
                });
                setClients(data);
            }
        };
        bdClients();
    }, [clients]);

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
