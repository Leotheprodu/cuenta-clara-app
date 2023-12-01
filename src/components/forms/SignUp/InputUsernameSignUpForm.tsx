import { ClientsIcon } from "@/icons/ClientsIcon";

import { Input } from "@nextui-org/react";

export const InputUsernameSignUpForm = ({
  handle,
}: InputEmailSignUpFormProps) => {
  const { handleOnClear, username, handleOnChange } = handle;
  return (
    <div>
      <Input
        size="lg"
        type="text"
        isClearable
        onClear={() => handleOnClear("username")}
        label="Nombre de Usuario"
        startContent={
          <ClientsIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        placeholder="Ingresa tu nombre de usuario"
        autoComplete="username"
        value={username}
        onChange={handleOnChange}
        name="username"
      />
    </div>
  );
};
