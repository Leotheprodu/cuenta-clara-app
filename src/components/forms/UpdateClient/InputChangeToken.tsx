import { Button, Input, Tooltip } from "@nextui-org/react";

export const InputChangeToken = ({ handle }: InputChangeTokenProps) => {
  const { handleOnChange, handleNewToken, token } = handle;
  return (
    <div className="flex flex-col gap-1 justify-center items-center bg-danger-100 rounded-md p-2">
      <div className="flex gap-4 justify-center items-center">
        <Input
          type="text"
          label="Token"
          readOnly
          variant="underlined"
          value={token}
          onChange={handleOnChange}
          name="token"
        ></Input>
        <Tooltip color="danger" showArrow content="Crear Nuevo token">
          <Button
            color="danger"
            variant="light"
            className="uppercase w-1/2"
            onClick={handleNewToken}
          >
            Nuevo token
          </Button>
        </Tooltip>
      </div>
      <small className="text-sm text-slate-500 max-w-sm">
        {" "}
        Cuando se crea un nuevo token, se crea un nuevo enlace para que el
        cliente pueda ver sus transacciones. El enlace anterior se elimina.
      </small>
    </div>
  );
};
