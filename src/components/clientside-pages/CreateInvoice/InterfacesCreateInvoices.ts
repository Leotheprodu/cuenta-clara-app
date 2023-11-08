interface FormValuesNewInvoice {
    date: string;
    client_id: number;
}
interface BusinessSelecterProps {
    id: number;
    name: string;
    isClientInBusiness: boolean;
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
        businessSelected: BusinessSelecterProps;
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
        };
    };
}
interface TableInvoiceDetailProps {
    handle: {
        createInvoiceDetail: {
            invoiceDetails: InitialStateInvoiceDetailProps[];
            renderCell: RenderCellProps;
            columnNames: ColumnNamesProps[];
        };
    };
}
interface ModalAddInvoiceDetailProps {
    handle: {
        createInvoiceDetail: {
            formDataDetail: InitialStateInvoiceDetailProps;
            handleOnChangeDetail: HandleOnChangeDetailProps;
            handleAddInvoiceDetail: HandleAddInvoiceDetailProps;
            isOpen: boolean;
            onOpenChange: () => void;
            handleCloseModal: HandleCloseModalProps;
            handleOnBlurCode: () => void;
            handleEraseModal: () => void;
            codeInput: React.RefObject<HTMLInputElement>;
            quantityInput: React.RefObject<HTMLInputElement>;
            handleOpenSearchPS: () => void;
            handleFocus: (e: React.FocusEvent<Element, Element>) => void;
        };
    };
}
interface UseInvoiceDetailProps {
    id: string;
    productsAndServices: ProductsAndServicesProps;
    selectedBusiness: number;
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
}
interface InitialStateInvoiceDetailProps {
    code: string;
    quantity: number;
    price: number;
    description: string;
}
