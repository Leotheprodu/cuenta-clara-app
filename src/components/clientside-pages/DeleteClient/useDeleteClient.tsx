import { useCheckSession } from "../../hooks/useCheckSession";
import { fetchAPI } from "../../Utils/fetchAPI";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
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
            toast.success(`Cliente eliminado correctamente`);
            setRedirecting(true);
        } else {
            toast.error(error);
        }
    };

    return {
        handleDelete,
    };
};
