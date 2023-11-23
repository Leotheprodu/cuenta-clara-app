/* 
TODO crear la logica de la tabla de facturas
[x] hacer el fetch de las facturas del cliente
[ ] hacer el fetch de los detalles de las facturas NOTE mostrar el detalle en un modal
*/

import { fetchAPI } from "@/components/Utils/fetchAPI";
import toast from "react-hot-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { DeleteRowIcon } from "@/icons/DeleteRowIcon";
import {
  formatDate,
  formatNumber,
  moneyFormat,
} from "@/components/Utils/dataFormat";
import { EditRowIcon } from "@/icons/EditRowIcon";
import { AddIcon } from "@/icons/AddIcon";
import { redirect } from "next/navigation";
import { invoiceDefault } from "@/data/constants";

export const useInvoicesByClient = ({ id }: { id: string }) => {
  const {
    status: statusInvoices,
    data: dataInvoices,
    refetch: refetchInvoices,
  } = useQuery({
    queryKey: ["user-invoices"],
    queryFn: async () =>
      await fetchAPI({
        url: `invoices/${id}`,
      }),
    retry: 2,
  });
  //Estado para almacenar las columnas de la tabla
  // FN state para almacenar las facturas
  const [invoices, setInvoices] = useState<Invoice[]>([invoiceDefault]);

  //FN hook useEffect para obtener las facturas del cliente
  useEffect(() => {
    if (statusInvoices === "success") {
      setInvoices(dataInvoices);
    }
  }, [statusInvoices, dataInvoices]);

  const columnNames: ColumnNamesProps[] = [
    { key: "id", name: "Id" },
    { key: "date", name: "Fecha" },
    { key: "total_amount", name: "Monto" },
    { key: "paid", name: "Status" },
    { key: "actions", name: "Acciones" },
  ];
  const handleRemoveInvoice = (e: any, index: any) => {
    e.preventDefault();
    const invoiceId = invoices[index].id;
    console.log(invoiceId);

    const removeInvoice = async () => {
      /* const res = await fetchAPI({
        url: `invoices/${invoiceId}`,
        method: "DELETE",
      });
      if (res.status === 200) {
        refetchInvoices();
      } else {
        toast.error("Error al eliminar la factura");
      } */
      toast.success("Factura eliminada");
    };
    removeInvoice();
  };
  const renderCell = (invoice: Invoice, columnKey: any, index: any) => {
    switch (columnKey) {
      case "id":
        return <p>{invoice.id}</p>;
      case "date":
        return <p className="">{formatDate(invoice.date)}</p>;
      case "total_amount":
        return (
          <p className="text-right">
            {moneyFormat(invoice.total_amount, "CRC", "es-CR")}
          </p>
        );
      case "paid":
        return <p>{invoice.paid ? "Pagado" : "No Pagado"}</p>;

      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Registrar transaccion">
              <button
                onClick={() => redirect(`/transacciones/${invoice.id}`)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <AddIcon />
              </button>
            </Tooltip>
            <Tooltip color="danger" content="Eliminar detalle">
              <button
                onClick={(e) => handleRemoveInvoice(e, index)}
                className="text-lg text-danger cursor-pointer active:opacity-50"
              >
                <DeleteRowIcon />
              </button>
            </Tooltip>
          </div>
        );
      default:
        return <p>Columna Invalida</p>;
    }
  };

  return {
    invoicesByClient: {
      invoices,
      columnNames,
      renderCell,
    },
  };
};