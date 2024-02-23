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
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { typeOfRoles } from "@/data/constants";

export const BalanceRechargesByClient = ({ id }: { id: number }) => {
  const { recharges, columnNames, renderCell } = useBalanceRechargesByClient({
    id,
  });

  const user = useStore($user);
  const cliente = user.client.filter((item) => item.id === id);

  if (cliente || user.roles.includes(typeOfRoles.admin.id)) {
    if (cliente[0]?.id === id || user.roles.includes(typeOfRoles.admin.id)) {
      return (
        <section className="flex flex-col gap-2 pb-24 w-screen px-4">
          <HeaderCreateInvoice
            handle={{
              username: recharges[0]?.client.username,
              showChangeClient: user.roles.includes(typeOfRoles.admin.id),
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
            <TableBody emptyContent={"No se han hecho recargas"}>
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
    } else {
      return (
        <div className="font-bold uppercase text-center mt-10">
          Lo sentimos, no tienes permisos para ver esta sección
        </div>
      );
    }
  } else {
    return (
      <div className="font-bold uppercase text-center mt-10">
        Lo sentimos, no tienes permisos para ver esta sección
      </div>
    );
  }
};
