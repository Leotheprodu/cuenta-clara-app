import { useEffect, useState } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { useFiltersClients } from "./useFiltersClients";
import { $AppState, $GlobalLoading } from "@/stores/generalConfig";
import { useStore } from "@nanostores/react";
export const useClientsPage = () => {
  const [isShowActivoButton, setIsShowActivoButton] = useState(true);
  const [isShowDebtorsButton, setIsShowDebtorsButton] = useState(false);
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
  useEffect(() => {
    $GlobalLoading.set({ isLoading, message: "Cargando Clientes..." });
  }, [isLoading]);
  const { clientsSearched } = useFiltersClients({
    data,
    status,
    isShowActivoButton,
    isShowDebtorsButton,
    searchClient,
  });

  const handleIsSelectedSwitch = (
    value: boolean,
    typeOfSwitch: "actives" | "debtors"
  ) => {
    if (typeOfSwitch === "actives") {
      if (value !== isShowActivoButton) setIsShowActivoButton(value);
    }
    if (typeOfSwitch === "debtors") {
      if (value !== isShowDebtorsButton) setIsShowDebtorsButton(value);
    }
  };

  const handleSearchClient = (e: any) => {
    setSearchClient(e.target.value);
  };

  return {
    clientsSearched,
    isLoading,
    handleIsSelectedSwitch,
    isShowActivoButton,
    isShowDebtorsButton,
    handleSearchClient,
    searchClient,
  };
};
