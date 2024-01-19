"use client";
import { invoicesStatus } from "@/data/constants";
import { HeaderCreateInvoice } from "../CreateInvoice/HeaderCreateInvoice";
import { useInvoicesByClient } from "./useInvoicesByClient";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export const InvoicesByClient = ({ id }: { id: string }) => {
  const { invoicesByClient } = useInvoicesByClient({ id });
  const { invoices, columnNames, renderCell, client } = invoicesByClient;
  return (
    <div className="w-full flex flex-col gap-2 pb-24">
      <HeaderCreateInvoice
        handle={{
          username: client.username,
        }}
      />
      <section className="mt-[3rem] pt-3">
        <Table isStriped aria-label="Detalle de Factura">
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
      </section>
    </div>
  );
};
