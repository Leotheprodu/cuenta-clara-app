import { fetchAPI } from "@/components/Utils/fetchAPI";
import { ClientDashboardInitialData } from "@/data/constants";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useClientSideDashboard = ({ token }: { token: string }) => {
  const [clientInfo, setClientInfo] = useState<ClientDashboardData>(
    ClientDashboardInitialData
  );

  const { status, data, isLoading, refetch } = useQuery({
    queryKey: ["dashboard-client"],
    queryFn: async () =>
      await fetchAPI({
        url: `clients/dashboardInfo/${token}`,
      }),
    retry: 2,
  });

  useEffect(() => {
    if (status === "success") {
      setClientInfo(data);
    }
  }, [status, data]);
  return {
    clientInfo,
  };
};
