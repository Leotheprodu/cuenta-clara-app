import { fetchAPI } from "../../Utils/fetchAPI";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { internalLinks } from "@/components/Utils/internalLinks";
import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";

export const useDeactivateClient = (id: string) => {
  const router = useRouter();
  useNamingPagesRoutes({ internalLink: "deactivate-client" });
  const [client, setClient] = useState({ username: "", active: 0 });
  const { status: statusFetchClient, data } = useQuery({
    queryKey: ["fetch-client"],
    queryFn: async () =>
      await fetchAPI({
        url: `clients/${id}`,
      }),
    retry: 2,
  });
  useEffect(() => {
    if (statusFetchClient === "success") {
      setClient(data);
    }
  }, [statusFetchClient, data]);

  const { status, mutate, error, isPending } = useMutation({
    mutationKey: ["deactivate-client"],
    mutationFn: async () =>
      await fetchAPI({
        url: `clients/deactivate/${id}`,
        method: "GET",
      }),
  });

  useEffect(() => {
    if (status === "success") {
      toast.success(
        `"${client.username}" ${
          client.active == 0 ? "activado" : "desactivado"
        } correctamente`
      );
      redirect(internalLinks("clients") || "/");
    } else if (status === "error") {
      toast.error(error?.message || "");
    }
  }, [status, error, client]);

  const handleDelete = () => {
    mutate();
  };

  return {
    handleDelete,
    isPending,
    router,
    client,
  };
};
