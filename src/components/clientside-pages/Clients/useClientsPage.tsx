import { useEffect, useState } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { useFiltersClients } from "./useFiltersClients";
export const useClientsPage = () => {
  const [isShowActivoButton, setIsShowActivoButton] = useState(true);
  const [searchClient, setSearchClient] = useState("");

  const { status, data, isLoading } = useQuery({
    queryKey: ["clientes"],
    queryFn: async () =>
      await fetchAPI({
        url: `clients`,
      }),
    retry: 2,
  });
  const { clientsSearched } = useFiltersClients({
    data,
    status,
    isShowActivoButton,
    searchClient,
  });

  //Extrae los balances filtrados por Negocio

  /**
   * @description Activa o desactiva el boton que muestra usuario activos o no activos.
   * @param {boolean[]} value - Es el valor que se le asigna al estado isShowActivoButton.
   */
  const HanldeIsSelected = (value: boolean) => {
    setIsShowActivoButton(value);
  };
  /**
   * @description maneja el onChange de el buscador de Clientes.
   */
  const handleSearchClient = (e: any) => {
    setSearchClient(e.target.value);
  };

  return {
    clientsSearched,
    isLoading,
    HanldeIsSelected,
    isShowActivoButton,
    handleSearchClient,
    searchClient,
  };
};
