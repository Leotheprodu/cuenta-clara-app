import { useState } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useCheckSession } from "@/components/hooks/useCheckSession";
import { handleOnChange } from "@/components/Utils/formUtils";
import { idGenerator } from "../../Utils/idGenerator";

export const useNewClient = (formInit: FormValuesNewClient) => {
    useCheckSession();
    const [form, setForm] = useState(formInit);
    const [clienteCreado, setClienteCreado] = useState(false);

    clienteCreado && redirect("/clientes");

    const handleCreateClient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.loading("Cargando...");
        const { error } = await fetchAPI({
            url: "clients",
            method: "POST",
            body: {
                ...form,
                token: `${form.username.slice(0, 2)}-${idGenerator()}`,
            },
        });
        if (!error) {
            toast.dismiss();
            toast.success(`${form.username} ha sido creado`);
            setClienteCreado(true);
        } else {
            toast.dismiss();
            toast.error(error);
        }
    };

    return {
        ...form,
        handleCreateClient,
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(setForm, e),
    };
};
