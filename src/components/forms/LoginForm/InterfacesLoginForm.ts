interface InputEmailLoginFormProps {
  handle: {
    handleOnClear: (name: string) => void;
    email: string;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

interface InputPasswordLoginFormProps {
  handle: {
    isVisible: boolean;
    isInvalidPass?: boolean;
    toggleVisibility: () => void;
    password: string;
    confirmPassword?: boolean;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

interface EndContentInputPasswordProps {
  isVisible: boolean;
  toggleVisibility: () => void;
}

interface FormValuesLoginForm {
  email: string;
  password: string;
}
