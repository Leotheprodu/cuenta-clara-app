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
import { CreateBusinessForm } from "./CreateBusinessForm";

export const BusinessesPage = () => {
  useNamingPagesRoutes({ internalLink: "businesses" });
  const {
    business,
    columnNames,
    renderCell,
    name,
    handleOnChange,
    handleOnClear,
    handleCreateBusiness,
    isPendingCreateBusiness,
  } = useBusinessesPage({ name: "" });
  /* const user = useStore($user); */
  const { showLoading, LoadingElement } = useLoadingByCriticProcess();
  /* const selectedBusiness = useStore($selectedBusiness); */
  if (showLoading) return LoadingElement;
  return (
    <section className="w-screen sm:w-full p-4">
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
                row.default === true
                  ? "border-1 border-primario/10 text-primary-500"
                  : row.active === false
                  ? "text-slate-400"
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
      <CreateBusinessForm
        CreateBusinessData={{
          name,
          handleOnChange,
          handleOnClear,
          handleCreateBusiness,
          isPendingCreateBusiness,
        }}
      />
    </section>
  );
};
