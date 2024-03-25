"use client";

import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";
import { usePaymentMethodsAdminPage } from "./usePaymentMethodsAdminPage";

export const PaymentMethodsAdminPage = () => {
  useNamingPagesRoutes({ internalLink: "admin-payment-methods" });
  const { data } = usePaymentMethodsAdminPage();

  return <div>PaymentMethodsAdminPage</div>;
};
