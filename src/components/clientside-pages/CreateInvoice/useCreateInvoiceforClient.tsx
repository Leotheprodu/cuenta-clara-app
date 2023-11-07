import { handleOnChange } from "@/components/Utils/formUtils";
import { getCurrentDate } from "@/components/Utils/getCurrentDate";
import { useEffect, useState } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $selectedBusiness } from "@/stores/business";
import { useInvoiceDetail } from "./useInvoiceDetail";

export const useCreateInvoiceforClient = ({ id }: { id: string }) => {
    // Hook para manejar los detalles de la factura
    const {
        invoiceDetails,
        formDataDetail,
        handleOnChangeDetail,
        handleAddInvoiceDetail,
        handleOpenAddDetail,
        isOpen,
        onOpenChange,
        codeInput,
        renderCell,
        columnNames,
        handleCloseModal,
    } = useInvoiceDetail({ id });
    // estado para almacenar los datos del cliente
    const [client, setClient] = useState({ username: "", active: 0 });
    // estado para almacenar el negocio seleccionado
    const selectedBusiness = useStore($selectedBusiness);
    // estado para almacenar el negocio seleccionado con el nombre y si el cliente tiene balances en ese negocio
    const [businessSelected, setBusinessSelected] =
        useState<BusinessSelecterProps>({
            id: 0,
            name: "",
            isClientInBusiness: true,
        });

    // estado para almacenar los datos de la factura
    const [formInvoice, setFormInvoice] = useState<FormValuesNewInvoice>({
        client_id: parseInt(id, 10),
        date: getCurrentDate(),
    });

    // obtener los datos del cliente
    const { status: statusFetchClient, data: clientData } = useQuery({
        queryKey: ["fetch-client"],
        queryFn: async () =>
            await fetchAPI({
                url: `clients/${id}`,
            }),
        retry: 2,
    });
    // obtener los negocios del cliente que esta logueado
    const { status: statusBusiness, data: dataBusiness } = useQuery({
        queryKey: ["users-business"],
        queryFn: async () =>
            await fetchAPI({
                url: "users_business",
            }),
        retry: 2,
    });
    // obtener el balance del cliente en el negocio seleccionado
    const { status: statusBalance, data: dataBalance } = useQuery({
        queryKey: ["user-balance"],
        queryFn: async () =>
            await fetchAPI({
                url: `balances/${id}`,
            }),
        retry: 2,
    });
    useEffect(() => {
        // si el cliente existe, setearlo en el estado
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
            // buscar el nombre del negocio seleccionado
            const findBusinessName = dataBusiness.find(
                (item: BusinessProps) => item.id === selectedBusiness
            );
            // buscar los negocios donde el cliente tiene balances
            const businessofClient = dataBalance.map(
                (item: any) => item.business_id
            );
            // setear el negocio seleccionado con el nombre y si el cliente tiene balances en ese negocio
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
        invoiceDetails,
        formDataDetail,
        handleOnChangeDetail,
        handleAddInvoiceDetail,
        handleOpenAddDetail,
        isOpen,
        onOpenChange,
        codeInput,
        renderCell,
        columnNames,
        handleCloseModal,
    };
};
