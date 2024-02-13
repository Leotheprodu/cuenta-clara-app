"use client";
import { useLoadingByCriticProcess } from "@/components/hooks/useLoadingByCriticProcess";
import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";
import { useBusinessesPage } from "./useBusinessesPage";
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

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
      <section className="mt-4">
        <form
          onSubmit={handleCreateBusiness}
          className="flex gap-1 items-center justify-center"
        >
          <Input
            size="sm"
            type="text"
            label="Nuevo Negocio"
            placeholder="Ingresa un nombre"
            onClear={() => handleOnClear("name")}
            value={name}
            onChange={handleOnChange}
            name="name"
            isClearable
            required
            disabled={isPendingCreateBusiness}
          ></Input>
          <Button type="submit">Crear</Button>
        </form>
        <div className="flex max-w-[30rem] mt-1">
          <p className="text-slate-400 text-xs p-4">
            Puedes crear un nuevo negocio con el nombre que desees, pero, como
            no los puedes eliminar, es preferible que reutilices alguno que ya
            no uses, le puedes cambiar el nombre.
          </p>
        </div>
      </section>
    </section>
  );
};
