import { useState, useEffect } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useCheckSession } from "@/components/hooks/useCheckSession";
import { handleOnChange } from "@/components/Utils/formUtils";
import { idGenerator } from "../../Utils/idGenerator";
import { useMutation } from "@tanstack/react-query";

export const useNewClient = (formInit: FormValuesNewClient) => {
    useCheckSession();
    const [form, setForm] = useState(formInit);
    const { status, mutate, error, isPending } = useMutation({
        mutationKey: ["new-client"],
        mutationFn: async () =>
            await fetchAPI({
                url: "clients",
                method: "POST",
                body: {
                    ...form,
                    token: `${form.username.slice(0, 2)}-${idGenerator()}`,
                },
            }),
    });

    useEffect(() => {
        if (status === "success") {
            toast.success(`${form.username} ha sido creado`);
            redirect("/clientes");
        } else if (status === "error") {
            toast.error(error?.message || "");
        }

        return () => toast.dismiss();
    }, [form, status, error]);

    const handleCreateClient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };

    return {
        ...form,
        handleCreateClient,
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(setForm, e),
        isPending,
    };
};
