"use client";
import { Button } from "@nextui-org/react";
import { useDeactivateClient } from "./useDeactivateClient";

export const DeactivateClient = ({ id }: { id: string }) => {
    const { handleDelete, isPending, router, client } = useDeactivateClient(id);
    return (
        <div className="flex flex-col gap-3 justify-center items-center text-center">
            <h1 className="uppercase text-primario">
                Estas a punto de {client.activo == 0 ? "activar" : "desactivar"}{" "}
                un cliente
            </h1>
            <h2>
                ¿Estás seguro de que quieres{" "}
                {client.activo == 0 ? "activar" : "desactivar"} a:{" "}
                <span className="font-bold">{client.username}</span>?
            </h2>
            <div className="flex gap-2">
                <Button
                    onClick={() => router.back()}
                    className="uppercase"
                    color="primary"
                >
                    Cancelar
                </Button>
                <Button
                    isLoading={isPending}
                    className="uppercase"
                    color="danger"
                    onClick={handleDelete}
                >
                    {client.activo == 0 ? "activar" : "desactivar"}
                </Button>
            </div>
        </div>
    );
};
