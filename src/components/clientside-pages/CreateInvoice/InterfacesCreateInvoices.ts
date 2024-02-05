interface FormValuesNewInvoice {
  date: string;
  business_id: number;
  invoice_details: InitialStateInvoiceDetailProps[];
  total: number;
  payment_method_id: number;
  status: string;
}
interface BusinessSelecterProps {
  id: number;
  name: string;
  isClientInBusiness?: boolean;
}
interface NotClientInBusinessProps {
  handle: {
    username: string;
    businessSelected: BusinessSelecterProps;
  };
}
interface HeaderCreateInvoiceProps {
  handle: {
    username: string;
    showChangeClient?: boolean;
    isLoading?: boolean;
  };
}
interface HandleOnChangeDetailProps {
  (e: React.ChangeEvent<HTMLInputElement>): void;
}
interface HandleWithIndexAndEventProps {
  (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number): void;
}
interface HandleAddInvoiceDetailProps {
  (onClose: () => void): void;
}
interface HandleCloseModalProps {
  (onClose: () => void): void;
}
interface RenderCellProps {
  (
    detail: InitialStateInvoiceDetailProps,
    columnKey: React.Key,
    index: number
  ): JSX.Element;
}
interface ColumnNamesProps {
  key: string;
  name: string;
}
interface CreateInvoiceDetailProps {
  handle: {
    createInvoiceDetail: {
      formDataDetail: InitialStateInvoiceDetailProps;
      handleOnChangeDetail: HandleOnChangeDetailProps;
      handleAddInvoiceDetail: HandleAddInvoiceDetailProps;
      invoiceDetails: InitialStateInvoiceDetailProps[];
      handleOpenAddDetail: () => void;
      isOpen: boolean;
      onOpenChange: () => void;
      codeInput: React.RefObject<HTMLInputElement>;
      renderCell: RenderCellProps;
      columnNames: ColumnNamesProps[];
      handleCloseModal: HandleCloseModalProps;
      handleOnBlurCode: () => void;
      handleEraseModal: () => void;
      handleFocus: (e: any) => void;
      quantityInput: React.RefObject<HTMLInputElement>;
      handleOpenSearchPS: () => void;
      isOpenModalPS: boolean;
      onOpenChangeModalPS: () => void;
      handleCloseModalPS: HandleCloseModalProps;
      handleAddPStoDetail: (
        onClose: () => void,
        ps: DataProductsAndServicesProps
      ) => void;
      filteredProductsAndServices: DataProductsAndServicesProps[];
      searchPS: string;
      handleSearchPS: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
  };
}

interface UseInvoiceDetailProps {
  id: string;
  productsAndServices: ProductsAndServicesProps;
  selectedBusiness: {
    id: number;
    name: string;
  };
  statusCreateInvoice: string;
}
interface ProductsAndServicesProps {
  all: DataProductsAndServicesProps[];
  default: DataProductsAndServicesProps;
}
interface DataProductsAndServicesProps {
  id: number | null;
  user_id: number | null;
  name: string;
  description: string;
  unit: string;
  unit_price: number;
  default: boolean;
  business_id: number | null;
  code: string;
  type: string;
  inventory_control: boolean;
  createdAt: string;
  updatedAt: string;
}
interface InitialStateInvoiceDetailProps {
  code: string;
  quantity: number;
  unit_price: number;
  description: string;
  subtotal: number;
}
