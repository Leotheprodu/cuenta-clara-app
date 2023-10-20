"use client";
import { Button } from "@nextui-org/react";
import { useDeleteClient } from "./useDeleteClient";

export const DeleteClientPage = ({ id }: { id: string }) => {
    const { handleDelete, isPending } = useDeleteClient(id);
    return (
        <div className="flex flex-col gap-3 justify-center items-center text-center">
            <h1 className="uppercase text-primario">Eliminar cliente</h1>
            <h2>
                ¿Estás seguro de que quieres eliminar el cliente con id {id}?
            </h2>
            <Button
                isLoading={isPending}
                className="uppercase"
                color="danger"
                onClick={handleDelete}
            >
                Eliminar
            </Button>
        </div>
    );
};
