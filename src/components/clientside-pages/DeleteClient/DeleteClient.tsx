"use client";
import { useCheckSession } from "../../hooks/useCheckSession";
import { fetchAPI } from "../../Utils/fetchAPI";
import { Button } from "@nextui-org/react";
import { redirect } from "next/navigation";
import { $toastGlobal } from "@/stores/toast";
import { useState } from "react";
export const DeleteClientPage = ({ id }: { id: string }) => {
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
    return (
        <div className="flex flex-col gap-3 justify-center items-center text-center">
            <h1 className="uppercase text-primario">Eliminar cliente</h1>
            <h2>
                ¿Estás seguro de que quieres eliminar el cliente con id {id}?
            </h2>
            <Button className="uppercase" color="danger" onClick={handleDelete}>
                Eliminar
            </Button>
        </div>
    );
};
