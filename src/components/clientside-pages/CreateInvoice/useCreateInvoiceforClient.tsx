import { handleOnChange } from "@/components/Utils/formUtils";
import { getCurrentDate } from "@/components/Utils/getCurrentDate";
import { useEffect, useState } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $selectedBusiness } from "@/stores/business";
import toast from "react-hot-toast";

export const useCreateInvoiceforClient = ({ id }: { id: string }) => {
    const selectedBusiness = useStore($selectedBusiness);
    const [businessSelected, setBusinessSelected] = useState({
        id: 0,
        name: "",
        isClientInBusiness: true,
    });
    const [invoiceDetails, setInvoiceDetails] = useState<InvoiceDetailsProps[]>(
        []
    );
    const [formInvoice, setFormInvoice] = useState<FormValuesNewInvoice>({
        client_id: parseInt(id, 10),
        date: getCurrentDate(),
    });
    const [client, setClient] = useState({ username: "", active: 0 });
    const { status: statusFetchClient, data: clientData } = useQuery({
        queryKey: ["fetch-client"],
        queryFn: async () =>
            await fetchAPI({
                url: `clients/${id}`,
            }),
        retry: 2,
    });
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
        if (statusFetchClient === "success") {
            setClient(clientData);
        } else if (statusFetchClient === "error") {
            setClient({ username: "", active: 0 });
        }
    }, [statusFetchClient, clientData]);

    useEffect(() => {
        if (
            statusBalance === "success" &&
            statusBusiness === "success" &&
            selectedBusiness
        ) {
            const findBusinessName = dataBusiness.find(
                (item: BusinessProps) => item.id === selectedBusiness
            );
            const businessofClient = dataBalance.map(
                (item: any) => item.business_id
            );
            setBusinessSelected({
                id: findBusinessName?.id,
                name: findBusinessName?.name,
                isClientInBusiness:
                    businessofClient?.includes(selectedBusiness),
            });
        }
    }, [
        statusBalance,
        statusBusiness,
        selectedBusiness,
        dataBusiness,
        dataBalance,
        statusFetchClient,
    ]);
    return {
        ...formInvoice,
        ...client,
        businessSelected,
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(setFormInvoice, e),
    };
};
