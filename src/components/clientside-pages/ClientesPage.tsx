"use client";
import { useCheckSession } from "../hooks/useCheckSession";

export const ClientesPage = () => {
    useCheckSession();

    return <div>Clientes</div>;
};
