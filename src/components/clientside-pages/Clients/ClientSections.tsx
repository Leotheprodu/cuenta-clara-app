import { internalLinks } from "@/components/Utils/internalLinks";
import { AddClientIcon } from "@/icons/AddClientIcon";
import { AddInvoiceIcon } from "@/icons/AddInvoiceIcon";
import { AddTransactionIcon } from "@/icons/AddTransactionIcon";
import { DeleteUserIcon } from "@/icons/DeleteUserIcon";
import { EditIcon } from "@/icons/EditIcon";
import { Tooltip } from "@nextui-org/react";
import Link from "next/link";

export const ClientSections = ({
    client,
    isShowActivoButton,
}: ClientCardProps) => {
    const { id } = client;

    return (
        <div className="flex justify-center w-full gap-8 text-xs p-2">
            <Tooltip
                content="Ver Facturas"
                showArrow
                placement="top"
                color="primary"
            >
                <Link
                    className="text-terciario rounded-full hover:scale-110 bg-blanco shadow-md hover:shadow-lg transition-all duration-200 p-1"
                    href={`${internalLinks("client-invoices")}${id}`}
                >
                    <AddTransactionIcon className="w-6 h-6" />
                </Link>
            </Tooltip>
            <Tooltip
                content="Crear Factura"
                showArrow
                placement="top"
                color="secondary"
            >
                <Link
                    className="text-terciario rounded-full hover:scale-110 bg-blanco shadow-lg hover:shadow-lg transition-all duration-200 p-1"
                    href={`${internalLinks("add-invoice")}${id}`}
                >
                    <AddInvoiceIcon className="w-6 h-6" />
                </Link>
            </Tooltip>
            <Tooltip
                content="Actualizar Cliente"
                showArrow
                placement="top"
                color="warning"
            >
                <Link
                    className="text-terciario rounded-full hover:scale-110 bg-blanco shadow-lg hover:shadow-lg transition-all duration-200 p-1"
                    href={`${internalLinks("update-client")}${id}`}
                >
                    <EditIcon className="w-6 h-6" />
                </Link>
            </Tooltip>
            <Tooltip
                content={
                    isShowActivoButton
                        ? "Desactivar Cliente"
                        : "Activar Cliente"
                }
                showArrow
                placement="top"
                color="danger"
            >
                <Link
                    className="text-terciario rounded-full hover:scale-110 bg-blanco shadow-md hover:shadow-md transition-all duration-200 p-1"
                    href={`${internalLinks("deactivate-client")}${id}`}
                >
                    {isShowActivoButton ? (
                        <DeleteUserIcon className="w-6 h-6" />
                    ) : (
                        <AddClientIcon className="w-6 h-6" />
                    )}
                </Link>
            </Tooltip>
        </div>
    );
};
