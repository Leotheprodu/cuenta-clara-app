export interface InputEmailLoginFormProps {
    handle: {
        handleOnClear: (name: string) => void;
        email: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
}

export interface InputPasswordLoginFormProps {
    handle: {
        isVisible: boolean;
        isInvalidPass: boolean;
        toggleVisibility: () => void;
        password: string;
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    };
}

export interface EndContentInputPasswordProps {
    isVisible: boolean;
    toggleVisibility: () => void;
}

export interface FormValues {
    email: string;
    password: string;
}
