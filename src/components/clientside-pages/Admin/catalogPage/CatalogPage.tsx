"use client";

import { useLoadingByCriticProcess } from "@/components/hooks/useLoadingByCriticProcess";
import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCatalogPage } from "./useCatalogPage";
import { ModalCreateProductOrService } from "./ModalCreateProductOrService";

export const CatalogPage = () => {
  useNamingPagesRoutes({ internalLink: "catalog" });
  const {
    allCatalog,
    columnNames,
    renderCell,
    handleCreate,
    isOpenCreateProductOrService,
    handleOpenModalCreateItem,
    onOpenChangeCreateProductOrService,
  } = useCatalogPage();
  const { showLoading, LoadingElement } = useLoadingByCriticProcess();
  if (showLoading) return LoadingElement;
  return (
    <section className="w-screen p-4">
      <Table isStriped aria-label="Catalogo">
        <TableHeader>
          {columnNames.map((column: ColumnNamesProps) => (
            <TableColumn className="text-center" key={column.key}>
              {column.name}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={"No hay catalogo para mostrar"}>
          {allCatalog.map(
            (row: DataProductsAndServicesProps, index: number) => (
              <TableRow
                className={
                  row.default === true
                    ? "border-1 border-primario/10 text-primary-500"
                    : ""
                }
                key={index}
              >
                {(columnKey) => (
                  <TableCell>{renderCell(row, columnKey, index)}</TableCell>
                )}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <ModalCreateProductOrService
        handleCreate={handleCreate}
        isOpenCreateProductOrService={isOpenCreateProductOrService}
        onOpenChangeCreateProductOrService={onOpenChangeCreateProductOrService}
        handleOpenModalCreateItem={handleOpenModalCreateItem}
      />
    </section>
  );
};
