"use client";

import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { idGenerator } from "../helpers/idGenerator";
import { fetchAPI } from "../helpers/fetchAPI";
import { $toastGlobal } from "@/stores/toast";
import { redirect } from "next/navigation";

export const NewClient = () => {
    const [clienteCreado, setClienteCreado] = useState(false);
    const [form, setForm] = useState({
        username: "",
        email: "",
        cellphone: "",
        token: "",
    });
    clienteCreado && redirect("/clientes");
    const handleCreateClient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        $toastGlobal.set({ type: "loading", message: "Cargando..." });
        const { error } = await fetchAPI({
            url: "clients",
            method: "POST",
            body: {
                ...form,
                token: `${form.username.slice(0, 2)}-${idGenerator()}`,
            },
        });
        if (!error) {
            $toastGlobal.set({
                type: "success",
                message: `${form.username} ha sido creado`,
            });
            setClienteCreado(true);
        } else {
            $toastGlobal.set({ type: "error", message: error });
        }
    };
    return (
        <form
            onSubmit={handleCreateClient}
            className="flex flex-col items-center justify-center gap-4"
        >
            <Input
                type="text"
                isRequired
                label="Nombre"
                variant="underlined"
                placeholder="Ingresa el nombre del cliente"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
            ></Input>
            <Input
                type="email"
                label="Correo Electronico"
                variant="underlined"
                placeholder="Ingresa el correo electronico"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            ></Input>
            <Input
                type="number"
                label="Telefono Celular"
                isRequired
                variant="underlined"
                placeholder="Ingresa el telefono celular"
                value={form.cellphone}
                onChange={(e) =>
                    setForm({ ...form, cellphone: e.target.value })
                }
            ></Input>
            <Button color="primary" className=" uppercase w-full" type="submit">
                Crear
            </Button>
        </form>
    );
};
