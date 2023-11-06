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
    };
}
interface InitialStateInvoiceDetailProps {
    code: string;
    quantity: number;
    price: number;
    description: string;
}
