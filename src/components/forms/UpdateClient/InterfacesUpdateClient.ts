interface FormValuesUpdateClient {
    id: string;
    username: string;
    email: string;
    cellphone: string;
    token: string;
}
interface InputChangeTokenProps {
    handle: {
        token: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        handleNewToken: () => void;
    };
}
