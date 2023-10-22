interface FormValuesNewClient {
    username: string;
    email: string;
    cellphone: string;
    token: string;
    id_business: Array<number>;
}
interface InputUsernameProps {
    handle: {
        username: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
}
interface InputEmailProps {
    handle: {
        email: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
}
interface InputCellphoneProps {
    handle: {
        cellphone: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
}
interface BusinessListProps {
    handle: {
        isLoadingBusiness: boolean;
        business: Array<BusinessProps>;
        selectedKeys: Set<string>;
        handleSelectionChange: (selectedKeys: any) => void;
    };
}
interface BusinessProps {
    id: number;
    name: string;
    default: boolean;
    user_id: number;
}
