interface InputEmailSignUpFormProps {
  handle: {
    handleOnClear: (name: string) => void;
    username: string;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}
