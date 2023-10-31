import { useEffect, useState, useMemo } from "react";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
import { handleOnChange } from "@/components/Utils/formUtils";
import { idGenerator } from "@/components/Utils/idGenerator";
import { useQuery, useMutation } from "@tanstack/react-query";
import { internalLinks } from "@/components/Utils/internalLinks";
import { BusinessDefault, countryCodes } from "@/data/constants";

export const useUpdateClient = (
    formInit: FormValuesUpdateClient,
    id: string
) => {
    const [form, setForm] = useState(formInit);
    const [selectedKeys, setSelectedKeys] = useState(new Set(["0"]));
    const [business, setBusiness] = useState([BusinessDefault]);
    const [countrySelected, setCountrySelected] = useState(
        new Set(["Costa Rica"])
    );
    const [codeSelected, setCodeSelected] = useState("506");
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
    const { status: statusBalance, data: dataBalance } = useQuery({
        queryKey: ["user-balance"],
        queryFn: async () =>
            await fetchAPI({
                url: `balances/${id}`,
            }),
        retry: 2,
    });
    useEffect(() => {
        if (statusBalance === "success") {
            const ClientBusinessAsign = dataBalance?.map(
                (item: any) => item.business_id
            );
            const selectedKeysString = ClientBusinessAsign.map((item: any) => {
                return item.toString();
            });
            setSelectedKeys(new Set(selectedKeysString));
        }
    }, [statusBalance, dataBalance]);

    useEffect(() => {
        if (statusBusiness === "success") {
            setBusiness(dataBusiness);
        }
    }, [statusBusiness, dataBusiness]);
    useEffect(() => {
        setForm({ ...form, id_business: selectedIds });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedKeys]);
    useEffect(() => {
        const code = countryCodes.find(
            (item) => item.country === Array.from(countrySelected)[0]
        );
        setCodeSelected(code ? code.code : "");
    }, [countrySelected]);
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
                body: {
                    ...form,
                    cellphone: form.cellphone
                        ? form.cellphone.replace(/\D/g, "")
                        : null,
                    country: Array.from(countrySelected)[0],
                },
            }),
    });
    useEffect(() => {
        const { username, email, cellphone, token, country } = data || {};

        if (statusFetchClient === "success") {
            setForm({
                ...form,
                username,
                email: email || "",
                cellphone: cellphone || "",
                token,
            });
            setCountrySelected(new Set([country]));
        } else if (statusFetchClient === "error") {
            toast.error(errorFetchClient?.message || "");
        }
        return () => toast.dismiss();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statusFetchClient, errorFetchClient, data]);

    useEffect(() => {
        if (status === "success") {
            toast.success(`${form.username} ha sido actualizado`);
            redirect(internalLinks("clients") || "/");
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
    const handleSelectionChange = (newSelection: any) => {
        setSelectedKeys(newSelection);
    };
    const selectedIds = useMemo(
        () => Array.from(selectedKeys).map((id) => parseInt(id, 10)),
        [selectedKeys]
    );
    const handleCountrySelectionChange = (keys: any) => {
        setCountrySelected(keys);
    };
    return {
        ...form,
        handleUpdateClient,
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(setForm, e),
        handleNewToken,
        isPending,
        isLoadingBusiness,
        business,
        selectedKeys,
        handleSelectionChange,
        handleCountrySelectionChange,
        codeSelected,
        countryCodes,
        countrySelected,
    };
};
