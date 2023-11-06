import { handleOnChange } from "@/components/Utils/formUtils";
import { getCurrentDate } from "@/components/Utils/getCurrentDate";
import { useEffect, useState, useRef } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $selectedBusiness } from "@/stores/business";
import { EditRowIcon } from "@/icons/EditRowIcon";
import { DeleteRowIcon } from "@/icons/DeleteRowIcon";
import toast from "react-hot-toast";
import { moneyFormat } from "@/components/Utils/MoneyFormat";
import { Tooltip, useDisclosure } from "@nextui-org/react";

export const useCreateInvoiceforClient = ({ id }: { id: string }) => {
    const selectedBusiness = useStore($selectedBusiness);
    const [businessSelected, setBusinessSelected] =
        useState<BusinessSelecterProps>({
            id: 0,
            name: "",
            isClientInBusiness: true,
        });
    const initialStateInvoiceDetail: InitialStateInvoiceDetailProps = {
        code: "",
        quantity: 0,
        price: 0,
        description: "",
    };
    const [invoiceDetails, setInvoiceDetails] = useState([
        initialStateInvoiceDetail,
    ]);
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

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const codeInput: React.RefObject<HTMLInputElement> = useRef(null);
    // Estado para almacenar los detalles de la factura

    const [isEditing, setIsEditing] = useState<{
        state: boolean;
        index: number | null;
    }>({ state: false, index: null });
    const [formDataDetail, setFormDataDetail] = useState(
        initialStateInvoiceDetail
    );
    //Estado para almacenar las columnas de la tabla
    const columnNames: ColumnNamesProps[] = [
        { key: "code", name: "Codigo" },
        { key: "quantity", name: "Cantidad" },
        { key: "price", name: "Precio" },
        { key: "description", name: "Descripcion" },
        { key: "subtotal", name: "Subtotal" },
        { key: "actions", name: "Acciones" },
    ];
    const handleOpenAddDetail = () => {
        setFormDataDetail(initialStateInvoiceDetail);
        onOpen();
    };
    // Función para agregar un nuevo detalle de factura al estado
    const handleAddInvoiceDetail: HandleAddInvoiceDetailProps = (onClose) => {
        if (
            formDataDetail.quantity === 0 ||
            formDataDetail.price === 0 ||
            formDataDetail.description === ""
        ) {
            toast.error("Por favor complete todos los campos", {
                duration: 4000,
            });
            focusFirstInput();
            return;
        }
        if (!isEditing.state) {
            const idClient = localStorage.getItem("idClient");

            setInvoiceDetails([...invoiceDetails, formDataDetail]);
            if (idClient && idClient !== id) {
                localStorage.setItem("idClient", `${id}`);
            }
            localStorage.setItem(
                "invoiceDetails",
                JSON.stringify([...invoiceDetails, formDataDetail])
            );
            toast.success("Detalle agregado correctamente", { duration: 4000 });
            setFormDataDetail(initialStateInvoiceDetail);
            focusFirstInput();
        } else if (isEditing.state && isEditing.index !== null) {
            const idClient = localStorage.getItem("idClient");
            const newInvoiceDetails = [...invoiceDetails];
            newInvoiceDetails[isEditing.index] = formDataDetail;
            setInvoiceDetails(newInvoiceDetails);
            localStorage.setItem(
                "invoiceDetails",
                JSON.stringify(newInvoiceDetails)
            );
            toast.success("Detalle editado correctamente", { duration: 4000 });
            if (idClient && idClient !== id) {
                localStorage.setItem("idClient", `${id}`);
            }
            setFormDataDetail(initialStateInvoiceDetail);
            setIsEditing({ state: false, index: null });
            onClose();
        }
    };
    const focusFirstInput = () => {
        if (codeInput.current) {
            codeInput.current.focus();
        }
    };

    useEffect(() => {
        const data = localStorage.getItem("invoiceDetails");
        const idClient = localStorage.getItem("idClient");

        if (idClient === id && data) {
            setInvoiceDetails(JSON.parse(data));
        } else {
            setInvoiceDetails([]);
        }
    }, [id]);
    const handleOnChangeDetail: HandleOnChangeDetailProps = (e) => {
        const { name, value } = e.target;

        setFormDataDetail({ ...formDataDetail, [name]: value });
    };
    // Función para editar una línea de detalle
    const handleEditInvoiceDetail = (e: any, index: any) => {
        e.preventDefault();
        setFormDataDetail(invoiceDetails[index]);
        setIsEditing({ state: true, index });
        onOpen();
    };
    const handleRemoveInvoiceDetail = (e: any, index: any) => {
        e.preventDefault();
        const idClient = localStorage.getItem("idClient");
        if (idClient && idClient !== id) {
            localStorage.setItem("idClient", `${id}`);
        }
        setInvoiceDetails(
            invoiceDetails.filter(
                (detail, detailIndex) => detailIndex !== index
            )
        );
        localStorage.setItem(
            "invoiceDetails",
            JSON.stringify(
                invoiceDetails.filter(
                    (detail, detailIndex) => detailIndex !== index
                )
            )
        );
    };
    const handleCloseModal = (onClose: any) => {
        setFormDataDetail(initialStateInvoiceDetail);
        if (isEditing) {
            setIsEditing({ state: false, index: 0 });
        }
        onClose();
    };
    const renderCell: RenderCellProps = (detail, columnKey, index) => {
        const cellValue =
            detail[columnKey as keyof InitialStateInvoiceDetailProps];

        switch (columnKey) {
            case "code":
                return <p>{detail.code}</p>;
            case "quantity":
                return <p>{detail.quantity}</p>;
            case "price":
                return <p>{moneyFormat(detail.price, "CRC", "es-CR")}</p>;
            case "description":
                return <p>{detail.description}</p>;
            case "subtotal":
                return (
                    <p>
                        {moneyFormat(
                            detail.quantity * detail.price,
                            "CRC",
                            "es-CR"
                        )}
                    </p>
                );

            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Editar detalle">
                            <button
                                onClick={(e) =>
                                    handleEditInvoiceDetail(e, index)
                                }
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <EditRowIcon />
                            </button>
                        </Tooltip>
                        <Tooltip color="danger" content="Eliminar detalle">
                            <button
                                onClick={(e) =>
                                    handleRemoveInvoiceDetail(e, index)
                                }
                                className="text-lg text-danger cursor-pointer active:opacity-50"
                            >
                                <DeleteRowIcon />
                            </button>
                        </Tooltip>
                    </div>
                );
            default:
                return <p>Columna Invalida</p>;
        }
    };
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
