import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { use, useEffect, useState } from "react";
import {
  businessConfigInfo,
  paymentMethodsDefault,
  ramdomSaludo,
  clientDefault,
} from "@/data/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { $balanceRechargeInfo } from "@/stores/business";
import { whatsappMsgs } from "@/components/Utils/whatsappMsgs";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
export const useRechargingBalance = ({
  balanceType,
}: {
  balanceType: BalanceTypes;
}) => {
  const balanceRechargeInfo = useStore($balanceRechargeInfo);
  const [selectedMethod, setSelectedMethod] = useState<string>("0");
  const [infoSelectedMethod, setInfoSelectedMethod] = useState<PaymentInfo[]>([
    paymentMethodsDefault,
  ]);
  const [paymentNames, setPaymentNames] = useState([{ id: 0, name: "" }]);
  const [payment_methods, setPayment_methods] = useState<PaymentInfo[]>([
    paymentMethodsDefault,
  ]);
  const [bodyRecharge, setBodyRecharge] = useState({
    amount: 0,
    client_id: 0,
    balance_id: 0,
    user_payment_methods_id: 0,
    balances_types_id: 0,
  });
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
  const {
    status: statusSendRecharge,
    data: dataSendRecharge,
    isPending: isPendingSendRecharge,
    mutate: mutateSendRecharge,
  } = useMutation({
    mutationKey: ["send-recharge"],
    mutationFn: async () =>
      await fetchAPI({
        url: `balances/recharge`,
        method: "POST",
        body: bodyRecharge,
      }),
  });
  useEffect(() => {
    const filteredClient = user.client.filter((client) =>
      client.balances.some(
        (balance) => balance.users_business.id === businessConfigInfo.businessId
      )
    );
    if (filteredClient.length === 1) {
      setBodyRecharge({
        amount: balanceType.balance * 1,
        client_id: filteredClient[0].id,
        balance_id: filteredClient[0].balances[0].id,
        user_payment_methods_id: parseInt(selectedMethod),
        balances_types_id: balanceType.id,
      });
    }
  }, [user, selectedMethod, balanceType]);
  useEffect(() => {
    $balanceRechargeInfo.set({
      ...balanceRechargeInfo,
      balanceType,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceType]);

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
    if (statusSendRecharge === "success") {
      $balanceRechargeInfo.set({
        ...balanceRechargeInfo,
        balanceRechargeId: dataSendRecharge.id,
      });
    } else if (statusSendRecharge === "error") {
      toast.error(
        "Hubo un problema con la recarga intente nuevamente en unos minutos"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusSendRecharge, dataSendRecharge]);
  useEffect(() => {
    if (balanceRechargeInfo.balanceRechargeId > 0) {
      const link = whatsappMsgs("sendRechargeBalanceComprobant", {
        ...clientDefault,
        username: user.user.username,
      });
      if (link) {
        redirect(link);
      }
    }
    console.log(balanceRechargeInfo.balanceRechargeId);
  }, [balanceRechargeInfo.balanceRechargeId, user.user.username]);
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
  const handleSendRecharge = () => {
    mutateSendRecharge();
  };
  return {
    user,
    saludo,
    payment_methods,
    paymentNames,
    handleSelectedMethod,
    selectedMethod,
    infoSelectedMethod,
    balanceRechargeInfo,
    handleSendRecharge,
    isPendingSendRecharge,
    statusSendRecharge,
  };
};
