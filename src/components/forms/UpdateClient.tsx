"use client";
import { Button, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { idGenerator } from "../helpers/idGenerator";
import { fetchAPI } from "../helpers/fetchAPI";
import { $toastGlobal } from "@/stores/toast";
import { redirect } from "next/navigation";

export const UpdateClient = ({ id }: { id: string }) => {
    const [clienteActualizado, setClienteActualizado] = useState(false);

    const [form, setForm] = useState({
        id: id,
        username: "",
        email: "",
        cellphone: "",
        token: "",
    });

    useEffect(() => {
        const UdateData = async () => {
            const { data, error } = await fetchAPI({
                url: `clients/${id}`,
            });
            if (!error) {
                setForm({
                    ...form,
                    username: data.username,
                    email: data.email || "",
                    cellphone: data.cellphone,
                    token: data.token,
                });
            } else {
                $toastGlobal.set({ type: "error", message: error });
            }
        };
        UdateData();
        // eslint-disable-next-line
    }, [id]);

    clienteActualizado && redirect("/clientes");
    const handleUpdateClient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        $toastGlobal.set({ type: "loading", message: "Cargando..." });
        const { error } = await fetchAPI({
            url: "clients",
            method: "PUT",
            body: form,
        });
        if (!error) {
            $toastGlobal.set({
                type: "success",
                message: `${form.username} ha sido actualizado`,
            });
            setClienteActualizado(true);
        } else {
            $toastGlobal.set({ type: "error", message: error });
        }
    };
    return (
        <form
            onSubmit={handleUpdateClient}
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
            <div className="flex gap-4">
                <Input
                    type="text"
                    label="Token"
                    readOnly
                    variant="underlined"
                    value={form.token}
                    onChange={(e) =>
                        setForm({ ...form, token: e.target.value })
                    }
                ></Input>
                <Button
                    color="secondary"
                    onClick={() =>
                        setForm({
                            ...form,
                            token: `${form.username.slice(
                                0,
                                2
                            )}-${idGenerator()}`,
                        })
                    }
                >
                    Nuevo Token
                </Button>
            </div>
            <Button color="primary" className=" uppercase w-full" type="submit">
                Actualizar
            </Button>
        </form>
    );
};
