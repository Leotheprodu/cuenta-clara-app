"use client";

import { useClientSideDashboard } from "./useClientSideDashboard";

export const ClientSideDashboard = ({ token }: { token: string }) => {
  const { clientInfo } = useClientSideDashboard({ token });
  return <div>Cliente ID {clientInfo.id} </div>;
};
