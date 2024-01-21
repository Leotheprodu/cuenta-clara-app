import { formatDate, moneyFormat } from "@/components/Utils/dataFormat";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { clientStatusInvoice, invoicesStatus } from "@/data/constants";
import { Tooltip } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { TransactionsDashboardModal } from "./TransactionsDashboardModal";
import { InvoiceDetailsDashboardModal } from "./InvoiceDetailsDashboardModal";

export const useInvoicesDasboard = ({
  token,
  pin,
  okPin,
}: {
  token: string;
  pin: string[];
  okPin: boolean;
}) => {
  const [invoices, setInvoices] = useState([]);
  const [isFilteredList, setIsFilteredList] = useState<boolean>(false);
  const [selectedBusinessId, setSelectedBusinessId] = useState<number>(0);
  const { status, error, data, mutate } = useMutation({
    mutationKey: ["dashboard-invoice"],
    mutationFn: async () =>
      await fetchAPI({
        url: `invoices/dashboard-info/${token}`,
        method: "POST",
        body: {
          pin: pin.join(""),
        },
      }),
  });
  const columnNames: ColumnNamesProps[] = [
    { key: "id", name: "Id" },
    { key: "business", name: "Negocio" },
    { key: "date", name: "Fecha" },
    { key: "total_amount", name: "Monto" },
    { key: "status", name: "Status" },
    { key: "actions", name: "Acciones" },
  ];
  useEffect(() => {
    if (okPin) {
      mutate();
    }
  }, [mutate, okPin]);
  useEffect(() => {
    if (status === "success") {
      setInvoices(data);
    }
  }, [status, data]);
  const renderCell = (invoice: Invoice, columnKey: any, index: any) => {
    switch (columnKey) {
      case "id":
        return <p>{invoice.id}</p>;
      case "date":
        return <p className="">{formatDate(invoice.date)}</p>;
      case "business":
        return <p className="">{invoice.users_business.name}</p>;
      case "total_amount":
        return (
          <p className="text-right">{moneyFormat(invoice.total_amount)}</p>
        );
      case "status":
        return <p>{clientStatusInvoice[invoice.status]}</p>;

      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            {invoice.status !== invoicesStatus.cancelled && (
              <TransactionsDashboardModal
                invoice_id={invoice.id}
                pin={pin}
                token={token}
              />
            )}
            <InvoiceDetailsDashboardModal
              invoice_id={invoice.id}
              pin={pin}
              token={token}
            />
          </div>
        );
      default:
        return <p>Columna Invalida</p>;
    }
  };
  const handleFetchInvoices = (e: any, business_id: number) => {
    if (selectedBusinessId === business_id) {
      setSelectedBusinessId(0);
      setInvoices(data);
      setIsFilteredList(false);
    } else {
      setSelectedBusinessId(business_id);
      const filteredInvoices = data.filter(
        (invoice: Invoice) =>
          invoice.users_business.id === business_id &&
          (invoice.status === invoicesStatus.pending ||
            invoice.status === invoicesStatus.inProcess)
      );
      setInvoices(filteredInvoices);
      setIsFilteredList(true);
    }
  };
  return {
    handleFetchInvoices,
    invoicesByToken: {
      invoices,
      columnNames,
      renderCell,
      isFilteredList,
      selectedBusinessId,
    },
  };
};
