interface InputEmailSignUpFormProps {
  handle: {
    handleOnClear: (name: string) => void;
    username: string;
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    noFormValue: noFormValueProps;
  };
}
interface noFormValueProps {
  username: boolean;
  email: boolean;
  cellphone: boolean;
  address: boolean;
}
