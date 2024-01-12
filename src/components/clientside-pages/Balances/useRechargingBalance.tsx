import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { useEffect, useState } from "react";
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
import { usePaymentMethodsByBusiness } from "@/components/hooks/usePaymentMethodsByBusiness";
import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";
export const useRechargingBalance = ({
  balanceType,
}: {
  balanceType: BalanceTypes;
}) => {
  useNamingPagesRoutes({ internalLink: "recharges" });

  const balanceRechargeInfo = useStore($balanceRechargeInfo);
  const [selectedMethod, setSelectedMethod] = useState<string>("0");
  const [infoSelectedMethod, setInfoSelectedMethod] = useState<PaymentInfo[]>([
    paymentMethodsDefault,
  ]);

  const [bodyRecharge, setBodyRecharge] = useState({
    amount: 0,
    balance_amount: 0,
    client_id: 0,
    balance_id: 0,
    user_payment_methods_id: 0,
    balances_types_id: 0,
  });
  const user = useStore($user);
  const [saludo, setSaludo] = useState<string>("");

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
  const { paymentNames, payment_methods } = usePaymentMethodsByBusiness({
    businessId: businessConfigInfo.businessId,
  });

  useEffect(() => {
    const filteredClient = user.client.filter((client) =>
      client.balances.some(
        (balance) => balance.users_business.id === businessConfigInfo.businessId
      )
    );
    if (filteredClient.length === 1) {
      setBodyRecharge({
        amount: balanceType.price * 1,
        balance_amount: balanceType.balance * 1,
        client_id: filteredClient[0].id,
        balance_id: filteredClient[0].balances[0].id,
        user_payment_methods_id: balanceRechargeInfo.payment_method.id,
        balances_types_id: balanceType.id,
      });
    }
  }, [user, selectedMethod, balanceType, balanceRechargeInfo]);
  useEffect(() => {
    $balanceRechargeInfo.set({
      ...balanceRechargeInfo,
      balanceType,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [balanceType]);

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
