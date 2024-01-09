import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { useEffect, useState } from "react";
import { balanceTypesDefault } from "@/data/constants";
import { useStore } from "@nanostores/react";
import { $AppState } from "@/stores/generalConfig";

export const useRecargeBalance = () => {
  const [balanceTypes, setBalanceTyoes] = useState<BalanceTypes[]>([
    balanceTypesDefault,
  ]);
  const appState = useStore($AppState);
  const { status, data } = useQuery({
    queryKey: ["balances-types"],
    queryFn: async () =>
      await fetchAPI({
        url: `balances/types/balance`,
      }),
    retry: 2,
  });
  useEffect(() => {
    $AppState.set({
      ...appState,
      page: "recharges",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (status === "success") {
      setBalanceTyoes(data);
    }
  }, [data, status]);

  return { balanceTypes };
};
