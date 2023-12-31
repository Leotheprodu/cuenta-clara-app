import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export const TableInvoiceDetail = ({ handle }: CreateInvoiceDetailProps) => {
  const { createInvoiceDetail } = handle;
  const { invoiceDetails, renderCell, columnNames } = createInvoiceDetail;
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
        {invoiceDetails.map(
          (row: InitialStateInvoiceDetailProps, index: number) => (
            <TableRow key={index}>
              {(columnKey) => (
                <TableCell>{renderCell(row, columnKey, index)}</TableCell>
              )}
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};
