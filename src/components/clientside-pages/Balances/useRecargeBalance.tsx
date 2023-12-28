import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { useEffect, useState } from "react";

export const useRecargeBalance = () => {
  const [balanceTypes, setBalanceTyoes] = useState<BalanceTypes[]>([
    {
      id: 0,
      name: "",
      price: 0.0,
      balance: 0.0,
      extra: 0,
    },
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
