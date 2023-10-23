import { useCheckSession } from "../../hooks/useCheckSession";
import { fetchAPI } from "../../Utils/fetchAPI";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

export const useDeactivateClient = (id: string) => {
    useCheckSession();
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
            toast.success(`Cliente desactivado correctamente`);
            redirect("/clientes");
        } else if (status === "error") {
            toast.error(error?.message || "");
        }
    }, [status, error]);

    const handleDelete = () => {
        mutate();
    };

    return {
        handleDelete,
        isPending,
    };
};
