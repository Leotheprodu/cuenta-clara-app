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

import { useTransactionsModal } from "./useTransactionsModal";
import { TransactionsIcon } from "@/icons/TransactionsIcon";
import { invoicesStatus } from "@/data/constants";
import { AddTransactionModal } from "./AddTransactionModal";

export const TransaccionsModal = ({ invoice }: { invoice: Invoice }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { columnNames, renderCell } = useTransactionsModal({ invoice });
  return (
    <>
      <Tooltip content="Transacciones" color="success">
        <button
          onClick={onOpen}
          className="scale-75 text-success-400 cursor-pointer active:opacity-50"
        >
          <TransactionsIcon />
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
                Transacciones
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
                    {invoice.transactions.map((row: any, index: number) => (
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
                {(invoice.status === invoicesStatus.pending ||
                  invoice.status === invoicesStatus.inProcess) && (
                  <AddTransactionModal invoice={invoice} />
                )}
                <Button
                  className="uppercase"
                  color="secondary"
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
