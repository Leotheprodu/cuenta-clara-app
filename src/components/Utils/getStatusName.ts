import { statusInvoice } from "@/data/constants";

export const getStatusNameInvoices = (invoiceStatus: string) => {
  const statusObj = statusInvoice.find(
    (status) => status.status === invoiceStatus
  );

  if (statusObj) {
    return statusObj.name;
  } else {
    // Manejar el caso en que el estado no se encuentre en el array
    return invoiceStatus;
  }
};
