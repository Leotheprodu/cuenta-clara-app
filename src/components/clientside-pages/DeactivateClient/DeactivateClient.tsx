"use client";
import { Button } from "@nextui-org/react";
import { useDeactivateClient } from "./useDeactivateClient";

export const DeactivateClient = ({ id }: { id: string }) => {
    const { handleDelete, isPending, router } = useDeactivateClient(id);
    return (
        <div className="flex flex-col gap-3 justify-center items-center text-center">
            <h1 className="uppercase text-primario">Desactivar cliente</h1>
            <h2>
                ¿Estás seguro de que quieres desactivar el cliente con id {id}?
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
                    Desactivar
                </Button>
            </div>
        </div>
    );
};
