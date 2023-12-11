"use client";

import { $selectedBusiness } from "@/stores/business";
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
import { useStore } from "@nanostores/react";
export const InvoicesByClient = ({ id }: { id: string }) => {
  const { invoicesByClient } = useInvoicesByClient({ id });
  const { invoices, columnNames, renderCell, client } = invoicesByClient;
  const selectedBusiness = useStore($selectedBusiness);
  return (
    <div className="w-full flex flex-col gap-2">
      <HeaderCreateInvoice
        handle={{
          username: client.username,
          businessSelected: selectedBusiness.name,
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
            {invoices.map((row: any, index: number) => (
              <TableRow key={index}>
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
