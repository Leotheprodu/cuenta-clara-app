import { Button } from "@nextui-org/react";
import { ModalAddInvoiceDetail } from "./ModalAddInvoiceDetail";
import { TableInvoiceDetail } from "./TableInvoiceDetail";

export const CreateInvoiceDetail = ({ handle }: CreateInvoiceDetailProps) => {
    const { createInvoiceDetail } = handle;
    const { handleOpenAddDetail } = createInvoiceDetail;

    return (
        <div>
            <h2 className="text-2xl text-center font-bold my-10">
                Detalles de la Factura
            </h2>
            <Button
                color="primary"
                className="w-full mb-10 uppercase"
                onPress={() => handleOpenAddDetail()}
            >
                Agregar detalle de Factura
            </Button>
            <ModalAddInvoiceDetail
                handle={{
                    createInvoiceDetail,
                }}
            />
            <TableInvoiceDetail
                handle={{
                    createInvoiceDetail,
                }}
            />
        </div>
    );
};
