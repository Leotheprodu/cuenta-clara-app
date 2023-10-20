import { useEffect, useState } from "react";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useCheckSession } from "@/components/hooks/useCheckSession";
import { handleOnChange } from "@/components/Utils/formUtils";
import { idGenerator } from "@/components/Utils/idGenerator";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useUpdateClient = (
    formInit: FormValuesUpdateClient,
    id: string
) => {
    useCheckSession();
    const [form, setForm] = useState(formInit);
    const {
        status: statusFetchClient,
        data,
        error: errorFetchClient,
    } = useQuery({
        queryKey: ["fetch-client"],
        queryFn: async () =>
            await fetchAPI({
                url: `clients/${id}`,
            }),
        retry: 2,
    });
    const { status, mutate, error, isPending } = useMutation({
        mutationKey: ["update-client"],
        mutationFn: async () =>
            await fetchAPI({
                url: "clients",
                method: "PUT",
                body: form,
            }),
    });
    useEffect(() => {
        const { username, email, cellphone, token } = data || {};

        if (statusFetchClient === "success") {
            setForm({
                ...form,
                username,
                email: email || "",
                cellphone,
                token,
            });
        } else if (statusFetchClient === "error") {
            toast.error(errorFetchClient?.message || "");
        }
        return () => toast.dismiss();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFetchClient, errorFetchClient, data]);

    useEffect(() => {
        if (status === "success") {
            toast.success(`${form.username} ha sido actualizado`);
            redirect("/clientes");
        } else if (status === "error") {
            toast.error(error?.message || "");
        }

        return () => toast.dismiss();
    }, [status, error, form]);

    const handleNewToken = () => {
        setForm({
            ...form,
            token: `${form.username.slice(0, 2)}-${idGenerator()}`,
        });
    };
    const handleUpdateClient = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
    };

    return {
        ...form,
        handleUpdateClient,
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(setForm, e),
        handleNewToken,
        isPending,
    };
};
