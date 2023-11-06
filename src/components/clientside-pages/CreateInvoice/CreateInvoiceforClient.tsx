"use client";
import { useState, useEffect, useRef, use } from "react";
import {
    Input,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Tooltip,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Textarea,
} from "@nextui-org/react";
import { useCreateInvoiceforClient } from "./useCreateInvoiceforClient";
import { EditRowIcon } from "@/icons/EditRowIcon";
import { DeleteRowIcon } from "@/icons/DeleteRowIcon";
import toast from "react-hot-toast";
import { moneyFormat } from "@/components/Utils/MoneyFormat";

export const CreateInvoiceforClient = ({ id }: { id: string }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { date, handleOnChange, username, businessSelected } =
        useCreateInvoiceforClient({
            id,
        });

    const codeInput: React.RefObject<HTMLInputElement> = useRef(null);
    // Estado para almacenar los detalles de la factura
    const initialStateInvoiceDetail: {
        code: string;
        quantity: number;
        price: number;
        description: string;
    } = {
        code: "",
        quantity: 0,
        price: 0,
        description: "",
    };
    const [invoiceDetails, setInvoiceDetails] = useState([
        initialStateInvoiceDetail,
    ]);
    const [isEditing, setIsEditing] = useState<{
        state: boolean;
        index: number | null;
    }>({ state: false, index: null });
    const [formDataDetail, setFormDataDetail] = useState(
        initialStateInvoiceDetail
    );
    //Estado para almacenar las columnas de la tabla
    const columnNames = [
        { key: "code", name: "Codigo" },
        { key: "quantity", name: "Cantidad" },
        { key: "price", name: "Precio" },
        { key: "description", name: "Descripcion" },
        { key: "subtotal", name: "Subtotal" },
        { key: "actions", name: "Acciones" },
    ];

    // Función para agregar un nuevo detalle de factura al estado
    const addInvoiceDetail = (onClose: any) => {
        if (
            formDataDetail.code === "" ||
            formDataDetail.quantity === 0 ||
            formDataDetail.price === 0 ||
            formDataDetail.description === ""
        ) {
            toast.error("Por favor complete todos los campos", {
                duration: 4000,
            });
            return;
        }
        if (!isEditing.state) {
            setInvoiceDetails([...invoiceDetails, formDataDetail]);
            toast.success("Detalle agregado correctamente", { duration: 4000 });
            setFormDataDetail(initialStateInvoiceDetail);
            focusFirstInput();
            const idClient = localStorage.getItem("idClient");
            if (idClient && idClient !== id) {
                localStorage.setItem("idClient", `${id}`);
            }
            localStorage.setItem(
                "invoiceDetails",
                JSON.stringify([...invoiceDetails, formDataDetail])
            );
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
    const handleOnChangeDetail = (e: any) => {
        const { name, value } = e.target;

        setFormDataDetail({ ...formDataDetail, [name]: value });
    };
    // Función para editar una línea de detalle
    const editInvoiceDetail = (e: any, index: any) => {
        e.preventDefault();
        setFormDataDetail(invoiceDetails[index]);
        setIsEditing({ state: true, index });
        onOpen();
    };
    const removeInvoiceDetail = (e: any, index: any) => {
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
    const renderCell = (detail: any, columnKey: any, index: any) => {
        const cellValue = detail[columnKey];

        switch (columnKey) {
            case "code":
                return <p>{detail.code}</p>;
            case "quantity":
                return <p>{detail.quantity}</p>;
            case "price":
                return <p>{detail.price}</p>;
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
                                onClick={(e) => editInvoiceDetail(e, index)}
                                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            >
                                <EditRowIcon />
                            </button>
                        </Tooltip>
                        <Tooltip color="danger" content="Eliminar detalle">
                            <button
                                onClick={(e) => removeInvoiceDetail(e, index)}
                                className="text-lg text-danger cursor-pointer active:opacity-50"
                            >
                                <DeleteRowIcon />
                            </button>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    };
    if (!businessSelected.isClientInBusiness) {
        return (
            <div className=" flex items-center justify-center h-screen w-full">
                <h2 className="text-lg">
                    <span className="font-bold">{username}</span> no pertenece a{" "}
                    <span className="underline ">{businessSelected.name}</span>
                </h2>
            </div>
        );
    }
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="bg-secundario z-10 w-full h-[3rem] flex gap-2 justify-center items-center fixed left-0">
                <p className="bg-primario p-1 rounded-md text-center text-blanco">
                    Cliente:{" "}
                    <span className="uppercase text-terciario">{username}</span>
                </p>
                <p className="bg-primario p-1 rounded-md text-center text-blanco">
                    Negocio:{" "}
                    <span className="uppercase text-terciario">
                        {businessSelected.name}
                    </span>
                </p>
            </div>
            <section className="pt-14 w-full">
                <form>
                    <Input
                        className="h-12"
                        labelPlacement="outside-left"
                        isRequired
                        variant="underlined"
                        label="Fecha"
                        type="date"
                        name="date"
                        value={date}
                        onChange={handleOnChange}
                    />

                    <div>
                        <h2 className="text-2xl text-center font-bold my-10">
                            Detalles de la Factura
                        </h2>
                        <Button
                            color="primary"
                            className="w-full mb-10 uppercase"
                            onPress={onOpen}
                        >
                            Agregar detalle de Factura
                        </Button>
                        <Modal
                            backdrop="blur"
                            placement="center"
                            isOpen={isOpen}
                            onOpenChange={onOpenChange}
                        >
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">
                                            Agregue detalles a la factura
                                        </ModalHeader>
                                        <ModalBody>
                                            <div className="flex flex-col px-10 justify-center items-center gap-2 mt-4">
                                                <Input
                                                    className="h-12"
                                                    ref={codeInput}
                                                    variant="underlined"
                                                    label="Codigo"
                                                    type="text"
                                                    name="code"
                                                    value={formDataDetail.code}
                                                    autoFocus
                                                    onChange={
                                                        handleOnChangeDetail
                                                    }
                                                    tabIndex={1}
                                                />
                                                <Input
                                                    className="h-12"
                                                    isRequired
                                                    variant="underlined"
                                                    label="Cantidad"
                                                    type="number"
                                                    inputMode="numeric"
                                                    name="quantity"
                                                    value={
                                                        formDataDetail.quantity ===
                                                        0
                                                            ? ""
                                                            : formDataDetail.quantity.toString()
                                                    }
                                                    onChange={
                                                        handleOnChangeDetail
                                                    }
                                                    tabIndex={2}
                                                />
                                                <Input
                                                    className="h-12"
                                                    isRequired
                                                    variant="underlined"
                                                    label="Precio"
                                                    inputMode="numeric"
                                                    type="text"
                                                    name="price"
                                                    value={
                                                        formDataDetail.price ===
                                                        0
                                                            ? ""
                                                            : formDataDetail.price.toString()
                                                    }
                                                    onChange={
                                                        handleOnChangeDetail
                                                    }
                                                    tabIndex={3}
                                                />
                                                <Textarea
                                                    className=""
                                                    isRequired
                                                    variant="underlined"
                                                    label="Descripcion"
                                                    name="description"
                                                    value={
                                                        formDataDetail.description
                                                    }
                                                    onChange={
                                                        handleOnChangeDetail
                                                    }
                                                    tabIndex={4}
                                                />
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button
                                                color="danger"
                                                variant="light"
                                                onPress={() =>
                                                    handleCloseModal(onClose)
                                                }
                                                tabIndex={-1}
                                            >
                                                Close
                                            </Button>
                                            <Button
                                                type="button"
                                                onPress={() =>
                                                    addInvoiceDetail(onClose)
                                                }
                                                color="primary"
                                                tabIndex={5}
                                            >
                                                Agregar Detalle
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>

                        <Table aria-label="Detalle de Factura">
                            <TableHeader>
                                {columnNames.map((column) => (
                                    <TableColumn key={column.key}>
                                        {column.name}
                                    </TableColumn>
                                ))}
                            </TableHeader>
                            <TableBody
                                emptyContent={"No hay detalles para mostrar"}
                            >
                                {invoiceDetails.map((row, index) => (
                                    <TableRow key={index}>
                                        {(columnKey) => (
                                            <TableCell>
                                                {renderCell(
                                                    row,
                                                    columnKey,
                                                    index
                                                )}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </form>
            </section>
        </div>
    );
};
