import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "../Utils/fetchAPI";
import { paymentMethodsDefault } from "@/data/constants";
import { useEffect, useState } from "react";

export const usePaymentMethodsByBusiness = ({
  businessId,
}: {
  businessId: number;
}) => {
  const [paymentNames, setPaymentNames] = useState([{ id: 0, name: "" }]);
  const [payment_methods, setPayment_methods] = useState<PaymentInfo[]>([
    paymentMethodsDefault,
  ]);

  const {
    status,
    data,
    refetch: refetchPaymentMethods,
  } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: async () =>
      await fetchAPI({
        url: `user_payment_methods/${businessId}`,
      }),
    retry: 2,
  });

  useEffect(() => {
    if (status === "success") {
      setPayment_methods(data);
    }
  }, [data, status]);
  useEffect(() => {
    //crea un arreglo con los metodos de pago de payment_methods nombre e id y los filtra para que no se repitan
    const payment_methods_names = payment_methods
      .map((payment_method) => ({
        id: payment_method.payment_method.id,
        name: payment_method.payment_method.name,
      }))
      .filter(
        (value, index, self) =>
          self.findIndex((v) => v.name === value.name && v.id === value.id) ===
          index
      );
    setPaymentNames(payment_methods_names);
  }, [payment_methods]);
  return {
    paymentNames,
    payment_methods,
    refetchPaymentMethods,
  };
};
