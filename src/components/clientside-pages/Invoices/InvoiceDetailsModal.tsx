import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useInvoiceDetailsModal } from "./useInvoiceDetailsModal";
import { InfoIcon } from "@/icons/infoIcon";
import { moneyFormat } from "@/components/Utils/dataFormat";

export const InvoiceDetailsModal = ({
  handleInvoiceDetails,
}: {
  handleInvoiceDetails: { invoice: Invoice };
}) => {
  const { invoice } = handleInvoiceDetails;
  const detalles = invoice.invoice_details;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { handle } = useInvoiceDetailsModal({ invoice });
  const { columnNames, renderCell } = handle;
  const totalDetail = invoice.invoice_details.reduce(
    (acc: number, detail: InvoiceDetail) => {
      return acc + parseFloat(detail.subtotal);
    },
    0
  );
  return (
    <>
      <Tooltip content="Detalles de factura" color="primary">
        <button
          onClick={onOpen}
          className="scale-75 text-success-400 cursor-pointer active:opacity-50"
        >
          <InfoIcon className="text-primary-500" />
        </button>
      </Tooltip>
      <Modal
        size="2xl"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Detalles de factura
              </ModalHeader>
              <ModalBody className="flex justify-center">
                <Table isStriped aria-label="Detalle de Factura">
                  <TableHeader>
                    {columnNames.map((column: any) => (
                      <TableColumn className="text-center" key={column.key}>
                        {column.name}
                      </TableColumn>
                    ))}
                  </TableHeader>
                  <TableBody emptyContent={"No hay transacciones"}>
                    {detalles.map((row: any, index: number) => (
                      <TableRow key={index}>
                        {(columnKey) => (
                          <TableCell>
                            {renderCell(row, columnKey, index)}
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex justify-end items-center text-slate-600 gap-1">
                  <span>Total:</span>
                  <small className="font-bold">
                    {moneyFormat(totalDetail)}
                  </small>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="uppercase"
                  color="warning"
                  variant="light"
                  onPress={onClose}
                >
                  Cerrar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
