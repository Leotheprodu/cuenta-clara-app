"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useBalanceRechargesByClient } from "./useBalanceRechargesByClient";

export const BalanceRechargesByClient = ({ id }: { id: number }) => {
  const { recharges, columnNames, renderCell } = useBalanceRechargesByClient({
    id,
  });

  return (
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
          {recharges.map((row: any, index: number) => (
            <TableRow key={index}>
              {(columnKey) => (
                <TableCell>{renderCell(row, columnKey, index)}</TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
