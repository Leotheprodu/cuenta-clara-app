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
import { HeaderCreateInvoice } from "../CreateInvoice/HeaderCreateInvoice";
import { $selectedBusiness } from "@/stores/business";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { typeOfRoles } from "@/data/constants";

export const BalanceRechargesByClient = ({ id }: { id: number }) => {
  const { recharges, columnNames, renderCell } = useBalanceRechargesByClient({
    id,
  });
  const selectedBusiness = useStore($selectedBusiness);
  const user = useStore($user);
  if (!user.roles.includes(typeOfRoles.admin.id)) {
    return (
      <div className="font-bold uppercase text-center mt-10">
        Lo sentimos, solo un admin puede accesar
      </div>
    );
  }
  return (
    <section className="w-full flex flex-col gap-2">
      <HeaderCreateInvoice
        handle={{
          username: recharges[0].client.username,
          businessSelected: selectedBusiness.name,
        }}
      />
      <Table
        isStriped
        aria-label="Detalle de Factura"
        className="mt-[3rem] pt-3 "
      >
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
