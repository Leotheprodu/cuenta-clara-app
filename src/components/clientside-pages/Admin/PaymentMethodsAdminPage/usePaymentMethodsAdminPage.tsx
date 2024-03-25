import { fetchAPI } from "@/components/Utils/fetchAPI";
import { $selectedBusiness } from "@/stores/business";
import { useStore } from "@nanostores/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const usePaymentMethodsAdminPage = () => {
  const selectedBusiness = useStore($selectedBusiness);
  const tanstack = useQuery({
    queryKey: ["payment-methods"],
    queryFn: async () =>
      await fetchAPI({
        url: `user_payment_methods/${selectedBusiness.id}`,
      }),
  });
  const { status, data, isLoading, refetch } = tanstack;
  useEffect(() => {
    selectedBusiness.id > 0 && refetch();
  }, [selectedBusiness, refetch]);

  return {
    data,
    tanstack,
  };
};
