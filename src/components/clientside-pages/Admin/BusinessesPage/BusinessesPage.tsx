"use client";
import { useLoadingByCriticProcess } from "@/components/hooks/useLoadingByCriticProcess";
import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";
import { useBusinessesPage } from "./useBusinessesPage";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export const BusinessesPage = () => {
  useNamingPagesRoutes({ internalLink: "businesses" });
  const { business, columnNames, renderCell } = useBusinessesPage();
  /* const user = useStore($user); */
  const { showLoading, LoadingElement } = useLoadingByCriticProcess();
  /* const selectedBusiness = useStore($selectedBusiness); */
  if (showLoading) return LoadingElement;
  return (
    <section>
      <Table isStriped aria-label="Detalle de Factura w-screen">
        <TableHeader>
          {columnNames.map((column: ColumnNamesProps) => (
            <TableColumn className="text-center" key={column.key}>
              {column.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={"No hay facturas para mostrar"}>
          {business.map((row: InterfacesBusinessPage, index: number) => (
            <TableRow
              className={
                row.default === true ? "border-1 border-primario/10" : ""
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
  );
};
