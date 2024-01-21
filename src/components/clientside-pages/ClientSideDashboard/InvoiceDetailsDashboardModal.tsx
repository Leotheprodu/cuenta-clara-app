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
import { InfoIcon } from "@/icons/infoIcon";
import { useInvoiceDetailsDashboardModal } from "./useInvoiceDetailsDashboardModal";

export const InvoiceDetailsDashboardModal = ({
  invoice_id,
  pin,
  token,
}: {
  invoice_id: number;
  pin: string[];
  token: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    invoice_details: detalles,
    columnNames,
    renderCell,
  } = useInvoiceDetailsDashboardModal({ invoice_id, pin, token });

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
