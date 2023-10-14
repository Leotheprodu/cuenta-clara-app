export interface FormValuesNewClient {
    username: string;
    email: string;
    cellphone: string;
    token: string;
}
export interface InputUsernameProps {
    handle: {
        username: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
}
export interface InputEmailProps {
    handle: {
        email: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
}
export interface InputCellphoneProps {
    handle: {
        cellphone: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
}
