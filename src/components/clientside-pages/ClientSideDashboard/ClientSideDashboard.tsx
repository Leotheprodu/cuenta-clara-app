"use client";

import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";
import { useClientSideDashboard } from "./useClientSideDashboard";
import { PinCheckClientDashboard } from "./PinCheckClientDashboard";
import { moneyFormat } from "@/components/Utils/dataFormat";
import { PaymentMethodItem } from "../Balances/PaymentMethodItem";
import { PaymentMethodsModal } from "./PaymentMethodsModal";
export const ClientSideDashboard = ({ token }: { token: string }) => {
  useNamingPagesRoutes({ internalLink: "ClientSideDashboard" });
  const { clientInfo, okPin, pinCheckHandle } = useClientSideDashboard({
    token,
  });
  if (!okPin) {
    return <PinCheckClientDashboard pinCheckHandle={pinCheckHandle} />;
  }
  return (
    <section className="flex gap-3 items-center justify-center">
      {clientInfo.balances.map((balance) => (
        <div
          className="flex flex-col items-center rounded-2xl shadow-xl p-3 w-[12rem] bg-slate-100"
          key={balance.id}
        >
          <div className="flex flex-col items-center gap-4 border-b-1 border-b-slate-200">
            <h1 className="text-primario font-bold text-xl text-center">
              {balance.users_business.name}
            </h1>
            <h2 className="text-slate-600">
              Saldo: {moneyFormat(parseFloat(balance.amount))}
            </h2>
          </div>
          <div className="mt-3">
            <PaymentMethodsModal
              paymentMethods={balance.users_business.user_payment_methods}
            />
          </div>
        </div>
      ))}
    </section>
  );
};
