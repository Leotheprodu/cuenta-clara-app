import { useEffect, useState } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $selectedBusiness } from "@/stores/business";
import { useFiltersClients } from "./useFiltersClients";

export const useClientsPage = () => {
    const selectedBusiness = useStore($selectedBusiness);
    const [isShowActivoButton, setIsShowActivoButton] = useState(true);
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

    const { filteredClientsWB } = useFiltersClients({
        data,
        status,
        isShowActivoButton,
        dataBalances,
        letterSelected,
    });

    //Extrae los balances filtrados por Negocio
    useEffect(() => {
        if (statusBalances === "success") {
            setDatabalances(
                dataFromBalances.filter(
                    (item: any) => item.business_id === selectedBusiness
                )
            );
        }
    }, [selectedBusiness, dataFromBalances, statusBalances]);

    /**
     * Filtra a los clientes por la letra seleccionada por el usuario.
     * Funcion exclusiva del componente LettersFilter.
     * @param {string[]} letter - Es la letra seleccionada por el usuario.
     * @returns {} - No retorna nada.
     */
    const HandleLetterFilter = (letter: string) => {
        if (letterSelected === letter) {
            setLetterSelected("");
        } else setLetterSelected(letter);
    };
    /**
     * Activa o desactiva el boton que muestra usuario activos o no activos.
     * @param {boolean[]} value - Es el valor que se le asigna al estado isShowActivoButton.
     */
    const HanldeIsSelected = (value: boolean) => {
        setIsShowActivoButton(value);
    };

    return {
        filteredClientsWB,
        HandleLetterFilter,
        letterSelected,
        isLoading,
        HanldeIsSelected,
        isShowActivoButton,
    };
};
