import { useEffect, useState } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { useFiltersClients } from "./useFiltersClients";
import { $AppState } from "@/stores/generalConfig";
import { useStore } from "@nanostores/react";
export const useClientsPage = () => {
  const [isShowActivoButton, setIsShowActivoButton] = useState(true);
  const [searchClient, setSearchClient] = useState("");
  const appState = useStore($AppState);
  const { status, data, isLoading, refetch } = useQuery({
    queryKey: ["clientes"],
    queryFn: async () =>
      await fetchAPI({
        url: `clients`,
      }),
    retry: 2,
  });
  useEffect(() => {
    if (appState.isCreatedInvoice) {
      refetch();
      $AppState.set({ ...appState, isCreatedInvoice: false });
    }
  }, [refetch, appState]);

  const { clientsSearched } = useFiltersClients({
    data,
    status,
    isShowActivoButton,
    searchClient,
  });

  const HanldeIsSelected = (value: boolean) => {
    setIsShowActivoButton(value);
  };

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
