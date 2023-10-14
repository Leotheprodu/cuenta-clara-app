import { useState } from "react";
import { fetchAPI } from "../../helpers/fetchAPI";
import { $toastGlobal } from "@/stores/toast";
import { redirect } from "next/navigation";
import { useCheckSession } from "@/components/hooks/useCheckSession";
import { handleOnChange } from "@/components/helpers/formUtils";
import { idGenerator } from "../../helpers/idGenerator";
import { FormValuesNewClient } from "./NewClientsInterfaces";

export const useNewClient = (formInit: FormValuesNewClient) => {
    useCheckSession();
    const [form, setForm] = useState(formInit);
    const [clienteCreado, setClienteCreado] = useState(false);

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

    return {
        ...form,
        handleCreateClient,
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(setForm, e),
    };
};
