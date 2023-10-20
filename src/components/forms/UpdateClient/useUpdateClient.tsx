import { useEffect, useState } from "react";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useCheckSession } from "@/components/hooks/useCheckSession";
import { handleOnChange } from "@/components/Utils/formUtils";
import { idGenerator } from "@/components/Utils/idGenerator";

export const useUpdateClient = (
    formInit: FormValuesUpdateClient,
    id: string
) => {
    useCheckSession();
    const [form, setForm] = useState(formInit);
    const [clienteActualizado, setClienteActualizado] = useState(false);
    clienteActualizado && redirect("/clientes");
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
                toast.dismiss();
                toast.error(error);
            }
        };
        UdateData();
        // eslint-disable-next-line
    }, [id]);
    const handleNewToken = () => {
        setForm({
            ...form,
            token: `${form.username.slice(0, 2)}-${idGenerator()}`,
        });
    };
    const handleUpdateClient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.loading("Cargando...");
        const { error } = await fetchAPI({
            url: "clients",
            method: "PUT",
            body: form,
        });
        if (!error) {
            toast.dismiss();
            toast.success(`${form.username} ha sido actualizado`);
            setClienteActualizado(true);
        } else {
            toast.dismiss();
            toast.error(error);
        }
    };

    return {
        ...form,
        handleUpdateClient,
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(setForm, e),
        handleNewToken,
    };
};
