import { clientDefault } from "@/data/constants";
import { useState } from "react";

export const useClientSideDashboard = ({ token }: { token: string }) => {
  const [clientInfo, setClientInfo] = useState({
    id: 0,
  });
  return {
    clientInfo,
  };
};
