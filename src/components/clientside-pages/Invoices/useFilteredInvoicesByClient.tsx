import { useEffect, useState } from "react";
import { $selectedBusiness } from "@/stores/business";
import { useStore } from "@nanostores/react";
import { invoiceDefault } from "@/data/constants";

export const useFilteredInvoicesByClient = ({ invoices }: any) => {
  const [invoicesByBusiness, setInvoicesByBusiness] = useState<Invoice[]>([
    invoiceDefault,
  ]);
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
  return {
    invoicesByBusiness,
  };
};
