import { fetchAPI } from "@/components/Utils/fetchAPI";
import toast from "react-hot-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Tooltip } from "@nextui-org/react";
import { DeleteRowIcon } from "@/icons/DeleteRowIcon";
import { formatDate, moneyFormat } from "@/components/Utils/dataFormat";
import { AddIcon } from "@/icons/AddIcon";
import { redirect } from "next/navigation";
import { $selectedBusiness } from "@/stores/business";
import { useStore } from "@nanostores/react";
import { clientStatusInvoice, invoiceDefault } from "@/data/constants";
export const useInvoicesByClient = ({ id }: { id: string }) => {
  //state para almacenar las facturas
  const [invoices, setInvoices] = useState<Invoice[]>([invoiceDefault]);
  const [invoicesByBusiness, setInvoicesByBusiness] = useState<Invoice[]>([
    invoiceDefault,
  ]);
  //  estado para almacenar los datos del cliente
  const [client, setClient] = useState({ username: "", active: 0 });
  const businessId = useStore($selectedBusiness);
  //filtra las facturas por negocio
  useEffect(() => {
    if (!businessId) return;
    const filterInvoicesByBusiness = (invoices: Invoice[]) => {
      return invoices.filter(
        (invoice) => invoice.users_business.id === businessId
      );
    };
    if (invoices.length === 0) {
      setInvoicesByBusiness(invoices);
    } else {
      setInvoicesByBusiness(filterInvoicesByBusiness(invoices));
    }
  }, [businessId, invoices]);
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
  //Estado para almacenar las columnas de la tabla

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

  const columnNames: ColumnNamesProps[] = [
    { key: "id", name: "Id" },
    { key: "date", name: "Fecha" },
    { key: "business_name", name: "Empresa" },
    { key: "total_amount", name: "Monto" },
    { key: "status", name: "Status" },
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
      case "business_name":
        return <p>{invoice.users_business.name}</p>;
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
      invoices: invoicesByBusiness,
      columnNames,
      renderCell,
      client,
    },
  };
};
