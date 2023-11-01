interface FormValuesNewClient {
    username: string;
    email: string;
    cellphone: string;
    token: string;
    id_business: Array<number>;
    country: string;
    detail: string;
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
interface InputDetailProps {
    handle: {
        detail: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
}
interface InputCellphoneProps {
    handle: {
        cellphone: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        codeSelected?: string;
    };
}
interface BusinessListProps {
    handle: {
        isLoadingBusiness: boolean;
        business: Array<BusinessProps>;
        selectedKeys: Set<string>;
        handleSelectionChange: (selectedKeys: any) => void;
    };
    title: string;
}
interface BusinessProps {
    id: number;
    name: string;
    default: boolean;
    user_id: number;
}
interface SelectCountryProps {
    handle: {
        countryCodes: { country: string; code: string }[];
        countrySelected: Set<string>;
        handleCountrySelectionChange: (keys: any) => void;
    };
}
