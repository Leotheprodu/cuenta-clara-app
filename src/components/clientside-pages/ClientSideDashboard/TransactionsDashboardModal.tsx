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
import { TransactionsIcon } from "@/icons/TransactionsIcon";
import { invoicesStatus } from "@/data/constants";
import { moneyFormat } from "@/components/Utils/dataFormat";
import { useTransactionsDashboardModal } from "./useTransactionsDashboardModal";

export const TransactionsDashboardModal = ({
  invoice_id,
  pin,
  token,
}: {
  invoice_id: number;
  pin: string[];
  token: string;
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { handle } = useTransactionsDashboardModal({ invoice_id, pin, token });
  const { totalTransactions, pendingMount, columnNames, renderCell, invoice } =
    handle;

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
              <div className="flex gap-4 mx-6 p-1 justify-center bg-secundario/5 rounded-lg shadow-sm border-1 border-primario/5">
                <h2 className="flex justify-end items-center text-sm gap-2">
                  Total:{" "}
                  <span className=" rounded-md bg-gris p-2">
                    {moneyFormat(totalTransactions)}
                  </span>
                </h2>
                <h2 className="flex justify-end items-center text-sm gap-2">
                  Pendiente:{" "}
                  <span className=" rounded-md bg-gris p-2">
                    {moneyFormat(pendingMount)}
                  </span>
                </h2>
              </div>
              <ModalFooter>
                {(invoice.status === invoicesStatus.pending ||
                  invoice.status === invoicesStatus.inProcess) &&
                  null}
                {/* <AddTransactionModal
                  handleTransactions={handleTransactions}
                /> */}
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
