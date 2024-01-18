import { fetchAPI } from "@/components/Utils/fetchAPI";
import toast from "react-hot-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { use, useEffect, useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { DeleteRowIcon } from "@/icons/DeleteRowIcon";
import { formatDate, moneyFormat } from "@/components/Utils/dataFormat";
import {
  clientStatusInvoice,
  invoiceDefault,
  invoicesStatus,
} from "@/data/constants";
import { useFilteredInvoicesByClient } from "./useFilteredInvoicesByClient";
import { TransaccionsModal } from "./TransactionsModal";
import { $AppState } from "@/stores/generalConfig";
import { useStore } from "@nanostores/react";
import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";
import { InvoiceDetailsModal } from "./InvoiceDetailsModal";
export const useInvoicesByClient = ({ id }: { id: string }) => {
  useNamingPagesRoutes({ internalLink: "client-invoices" });
  //state para almacenar las facturas
  const [invoices, setInvoices] = useState<Invoice[]>([invoiceDefault]);
  //  estado para almacenar los datos del cliente
  const [client, setClient] = useState({ username: "", active: 0 });
  const appState = useStore($AppState);
  const { invoicesByBusiness } = useFilteredInvoicesByClient({ invoices });
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
  // Obtener los datos del cliente
  const { status: statusFetchClient, data: clientData } = useQuery({
    queryKey: ["fetch-client"],
    queryFn: async () =>
      await fetchAPI({
        url: `clients/${id}`,
      }),
    retry: 2,
  });
  useEffect(() => {
    $AppState.set({
      ...appState,
      client_id: parseInt(id),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    // si el cliente existe, setearlo en el estado
    if (statusFetchClient === "success") {
      setClient(clientData);
    } else if (statusFetchClient === "error") {
      setClient({ username: "", active: 0 });
    }
  }, [statusFetchClient, clientData]);

  //hook useEffect para obtener las facturas del cliente
  useEffect(() => {
    if (statusInvoices === "success") {
      setInvoices(dataInvoices);
    }
  }, [statusInvoices, dataInvoices]);

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
  const columnNames: ColumnNamesProps[] = [
    { key: "id", name: "Id" },
    { key: "date", name: "Fecha" },
    { key: "total_amount", name: "Monto" },
    { key: "status", name: "Status" },
    { key: "actions", name: "Acciones" },
  ];
  const renderCell = (invoice: Invoice, columnKey: any, index: any) => {
    switch (columnKey) {
      case "id":
        return <p>{invoice.id}</p>;
      case "date":
        return <p className="">{formatDate(invoice.date)}</p>;
      case "total_amount":
        return (
          <p className="text-right">{moneyFormat(invoice.total_amount)}</p>
        );
      case "status":
        return <p>{clientStatusInvoice[invoice.status]}</p>;

      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            {invoice.status === invoicesStatus.pending && (
              <Tooltip color="danger" content="Cancelar Factura">
                <button
                  onClick={(e) => handleRemoveInvoice(e, index)}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <DeleteRowIcon />
                </button>
              </Tooltip>
            )}
            <InvoiceDetailsModal handleInvoiceDetails={{ invoice }} />
            <TransaccionsModal
              handleTransactions={{ invoice, refetchInvoices }}
            />
          </div>
        );
      default:
        return <p>Columna Invalida</p>;
    }
  };

  return {
    invoicesByClient: {
      invoices: invoicesByBusiness,
      columnNames,
      renderCell,
      client,
    },
  };
};
