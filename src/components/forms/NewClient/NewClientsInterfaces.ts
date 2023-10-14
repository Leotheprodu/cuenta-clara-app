export interface FormValuesNewClient {
    username: string;
    email: string;
    cellphone: string;
    token: string;
}
export interface InputUsernameNewClientProps {
    handle: {
        username: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
}
export interface InputEmailNewClientProps {
    handle: {
        email: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
}
export interface InputCellphoneNewClientProps {
    handle: {
        cellphone: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
}
