import { useCheckSession } from "../../hooks/useCheckSession";
import { fetchAPI } from "../../Utils/fetchAPI";
import { redirect } from "next/navigation";
import { $toastGlobal } from "@/stores/toast";
import { useState } from "react";

export const useDeleteClient = (id: string) => {
    const [redirecting, setRedirecting] = useState(false);
    redirecting && redirect("/clientes");
    useCheckSession();
    const handleDelete = async () => {
        const { data, error } = await fetchAPI({
            url: `clients/${id}`,
            method: "DELETE",
        });

        if (data) {
            $toastGlobal.set({
                type: "success",
                message: `Cliente eliminado correctamente`,
            });
            setRedirecting(true);
        } else {
            $toastGlobal.set({ type: "error", message: error });
        }
    };

    return {
        handleDelete,
    };
};
