import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { useEffect, useState } from "react";
import { balanceTypesDefault } from "@/data/constants";

export const useRecargeBalance = () => {
  const [balanceTypes, setBalanceTyoes] = useState<BalanceTypes[]>([
    balanceTypesDefault,
  ]);

  const { status, data } = useQuery({
    queryKey: ["balances-types"],
    queryFn: async () =>
      await fetchAPI({
        url: `balances/types/balance`,
      }),
    retry: 2,
  });

  useEffect(() => {
    if (status === "success") {
      setBalanceTyoes(data);
    }
  }, [data, status]);

  return { balanceTypes };
};
