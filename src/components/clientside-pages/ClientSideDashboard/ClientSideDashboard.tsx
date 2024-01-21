"use client";

import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";
import { useClientSideDashboard } from "./useClientSideDashboard";
import { PinCheckClientDashboard } from "./PinCheckClientDashboard";
import { moneyFormat } from "@/components/Utils/dataFormat";
import { PaymentMethodItem } from "../Balances/PaymentMethodItem";
import { PaymentMethodsModal } from "./PaymentMethodsModal";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { TransactionsIcon } from "@/icons/TransactionsIcon";
import { useInvoicesDasboard } from "./useInvoicesDasboard";
import { invoicesStatus } from "@/data/constants";
export const ClientSideDashboard = ({ token }: { token: string }) => {
  useNamingPagesRoutes({ internalLink: "ClientSideDashboard" });
  const { clientInfo, okPin, pin, pinCheckHandle } = useClientSideDashboard({
    token,
  });
  const { handleFetchInvoices, invoicesByToken } = useInvoicesDasboard({
    token,
    pin,
    okPin,
  });
  const { invoices, columnNames, renderCell, selectedBusinessId } =
    invoicesByToken;
  if (!okPin) {
    return <PinCheckClientDashboard pinCheckHandle={pinCheckHandle} />;
  }
  return (
    <section className="flex flex-col gap-10 items-center justify-center pb-20 w-screen">
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
        {clientInfo.balances.map((balance) => (
          <div
            className="flex flex-col items-center rounded-2xl shadow-xl p-3 w-[12rem] bg-slate-100"
            key={balance.id}
          >
            <div className="flex flex-col items-center gap-4 border-b-1 border-b-slate-200">
              <h1 className="text-primario font-bold text-xl text-center">
                {balance.users_business.name}
              </h1>
              <h2 className="text-slate-600">
                Saldo: {moneyFormat(parseFloat(balance.amount))}
              </h2>
            </div>
            <div className="mt-3">
              <PaymentMethodsModal
                paymentMethods={balance.users_business.user_payment_methods}
              />
              <Button
                variant="light"
                color={
                  balance.users_business.id !== selectedBusinessId
                    ? "primary"
                    : "secondary"
                }
                className="flex justify-center items-center gap-0"
                onPress={(e) =>
                  handleFetchInvoices(e, balance.users_business.id)
                }
              >
                <TransactionsIcon className="text-terciario h-1/2" />
                {balance.users_business.id !== selectedBusinessId
                  ? "Ver facturas imporantes"
                  : "Ver todas las facturas"}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center w-screen sm:max-w-screen-md p-2">
        <Table isStriped aria-label="Facturas">
          <TableHeader>
            {columnNames.map((column: ColumnNamesProps) => (
              <TableColumn className="text-center" key={column.key}>
                {column.name}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent={"No hay facturas para mostrar"}>
            {invoices.map((row: Invoice, index: number) => (
              <TableRow
                className={
                  row.status === invoicesStatus.pending
                    ? "bg-danger-50"
                    : row.status === invoicesStatus.cancelled
                    ? "opacity-50"
                    : row.status === invoicesStatus.inProcess
                    ? "text-success-500 font-bold"
                    : ""
                }
                key={index}
              >
                {(columnKey) => (
                  <TableCell>{renderCell(row, columnKey, index)}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
