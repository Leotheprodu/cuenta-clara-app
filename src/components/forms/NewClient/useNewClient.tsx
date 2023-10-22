import { useState, useEffect, useMemo } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { useCheckSession } from "@/components/hooks/useCheckSession";
import { handleOnChange } from "@/components/Utils/formUtils";
import { idGenerator } from "../../Utils/idGenerator";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useNewClient = (formInit: FormValuesNewClient) => {
    useCheckSession();
    const [form, setForm] = useState(formInit);
    const [selectedKeys, setSelectedKeys] = useState(new Set([""]));
    const [business, setBusiness] = useState([
        { id: 0, name: "", default: false, user_id: 0 },
    ]);
    const {
        status: statusBusiness,
        data: dataBusiness,
        isLoading: isLoadingBusiness,
    } = useQuery({
        queryKey: ["users-business"],
        queryFn: async () =>
            await fetchAPI({
                url: "users_business",
            }),
        retry: 2,
    });

    useEffect(() => {
        if (statusBusiness === "success") {
            setBusiness(dataBusiness);
            const defaultBusiness = dataBusiness.find(
                (item: {
                    id: number;
                    name: string;
                    default: boolean;
                    user_id: number;
                }) => item.default === true
            );
            // Si se encontró un elemento con default=true, establece su id como el elemento inicial en selectedKeys
            if (defaultBusiness) {
                setSelectedKeys(new Set([defaultBusiness.id.toString()]));
            }
        }
    }, [statusBusiness, dataBusiness]);
    useEffect(() => {
        setForm({ ...form, id_business: selectedIds });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedKeys]);

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
    const handleSelectionChange = (newSelection: any) => {
        setSelectedKeys(newSelection);
    };
    const selectedIds = useMemo(
        () => Array.from(selectedKeys).map((id) => parseInt(id, 10)),
        [selectedKeys]
    );
    return {
        ...form,
        handleCreateClient,
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(setForm, e),
        isPending,
        isLoadingBusiness,
        business,
        selectedKeys,
        handleSelectionChange,
    };
};
