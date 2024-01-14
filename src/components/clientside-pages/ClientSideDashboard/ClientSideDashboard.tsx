"use client";

import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";
import { useClientSideDashboard } from "./useClientSideDashboard";
export const ClientSideDashboard = ({ token }: { token: string }) => {
  useNamingPagesRoutes({ internalLink: "ClientSideDashboard" });
  const { clientInfo } = useClientSideDashboard({ token });
  return <div>Cliente ID {clientInfo.client.id} </div>;
};
