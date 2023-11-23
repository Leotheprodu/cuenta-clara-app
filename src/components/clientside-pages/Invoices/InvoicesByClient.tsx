"use client";

import { useInvoicesByClient } from "./useInvoicesByClient";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
/* 
TODO crear la vista de las facturas del cliente
[x] crear hook que maneja la logica de la tabla
[ ] crear tabla de facturas
*/
export const InvoicesByClient = ({ id }: { id: string }) => {
  const { invoicesByClient } = useInvoicesByClient({ id });
  const { invoices, columnNames, renderCell } = invoicesByClient;
  return (
    <Table isStriped aria-label="Detalle de Factura">
      <TableHeader>
        {columnNames.map((column: ColumnNamesProps) => (
          <TableColumn className="text-center" key={column.key}>
            {column.name}
          </TableColumn>
        ))}
      </TableHeader>
      <TableBody emptyContent={"No hay detalles para mostrar"}>
        {invoices.map((row: any, index: number) => (
          <TableRow key={index}>
            {(columnKey) => (
              <TableCell>{renderCell(row, columnKey, index)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};