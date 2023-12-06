import { ModalAddInvoiceDetail } from "./ModalAddInvoiceDetail";
import { TableInvoiceDetail } from "./TableInvoiceDetail";

export const CreateInvoiceDetail = ({ handle }: CreateInvoiceDetailProps) => {
  const { createInvoiceDetail } = handle;

  return (
    <div className="flex flex-col items-center">
      <ModalAddInvoiceDetail
        handle={{
          createInvoiceDetail,
        }}
      />
      <TableInvoiceDetail
        handle={{
          createInvoiceDetail,
        }}
      />
    </div>
  );
};
