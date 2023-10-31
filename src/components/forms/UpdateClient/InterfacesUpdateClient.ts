interface FormValuesUpdateClient {
    id: number;
    username: string;
    email: string;
    cellphone: string;
    token: string;
    id_business: Array<number>;
}
interface InputChangeTokenProps {
    handle: {
        token: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        handleNewToken: () => void;
    };
}
