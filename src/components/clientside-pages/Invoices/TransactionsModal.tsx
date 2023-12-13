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
import { moneyFormat } from "@/components/Utils/dataFormat";

export const TransaccionsModal = ({ invoice }: { invoice: Invoice }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { columnNames, renderCell } = useTransactionsModal({ invoice });
  //sumar el total de las transacciones
  const totalTransactions = invoice.transactions.reduce(
    (acc: number, transaction: Transaction) => {
      return acc + parseFloat(transaction.amount);
    },
    0
  );
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
              <div>
                <h2 className="flex justify-end items-center pr-7 text-sm gap-2">
                  Total:{" "}
                  <span className=" rounded-md bg-gris p-2">
                    {moneyFormat(totalTransactions)}
                  </span>
                </h2>
              </div>
              <ModalFooter>
                {(invoice.status === invoicesStatus.pending ||
                  invoice.status === invoicesStatus.inProcess) && (
                  <AddTransactionModal invoice={invoice} />
                )}
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
