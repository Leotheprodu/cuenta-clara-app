import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { use, useEffect, useState } from "react";
import {
  businessConfigInfo,
  paymentMethodsDefault,
  ramdomSaludo,
} from "@/data/constants";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/components/Utils/fetchAPI";
export const useRechargingBalance = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("0");
  const [infoSelectedMethod, setInfoSelectedMethod] = useState<PaymentInfo[]>([
    paymentMethodsDefault,
  ]);
  const [paymentNames, setPaymentNames] = useState([{ id: 0, name: "" }]);
  const [payment_methods, setPayment_methods] = useState<PaymentInfo[]>([
    paymentMethodsDefault,
  ]);
  const user = useStore($user);
  const [saludo, setSaludo] = useState<string>("");

  const { status, data } = useQuery({
    queryKey: ["payment-methods"],
    queryFn: async () =>
      await fetchAPI({
        url: `user_payment_methods/${businessConfigInfo.businessId}`,
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

  useEffect(() => {
    const cantidad = ramdomSaludo.length;
    const random = Math.floor(Math.random() * cantidad);
    setSaludo(ramdomSaludo[random]);
  }, []);

  useEffect(() => {
    const selected = payment_methods.filter(
      (payment_method) =>
        payment_method.payment_method.id === parseInt(selectedMethod)
    );
    if (selected) {
      setInfoSelectedMethod(selected);
    }
  }, [selectedMethod, payment_methods]);
  const handleSelectedMethod = (value: string) => {
    setSelectedMethod(value);
  };

  return {
    user,
    saludo,
    payment_methods,
    paymentNames,
    handleSelectedMethod,
    selectedMethod,
    infoSelectedMethod,
  };
};
