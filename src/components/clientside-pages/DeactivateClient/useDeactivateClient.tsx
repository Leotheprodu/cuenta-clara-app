import { fetchAPI } from "../../Utils/fetchAPI";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useDeactivateClient = (id: string) => {
    const router = useRouter();
    const [client, setClient] = useState({ username: "", activo: 0 });
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
                    client.activo == 0 ? "activado" : "desactivado"
                } correctamente`
            );
            redirect("/clientes");
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
