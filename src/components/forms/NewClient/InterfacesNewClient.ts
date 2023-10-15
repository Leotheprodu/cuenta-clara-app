interface FormValuesNewClient {
    username: string;
    email: string;
    cellphone: string;
    token: string;
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
