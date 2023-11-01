import { Button, Input, Tooltip } from "@nextui-org/react";

export const InputChangeToken = ({ handle }: InputChangeTokenProps) => {
    const { handleOnChange, handleNewToken, token } = handle;
    return (
        <div className="flex gap-4">
            <Input
                type="text"
                label="Token"
                readOnly
                variant="underlined"
                value={token}
                onChange={handleOnChange}
                name="token"
            ></Input>
            <Tooltip
                color="secondary"
                showArrow
                content="Generar un nuevo token"
            >
                <Button
                    color="secondary"
                    className="uppercase w-1/2"
                    onClick={handleNewToken}
                >
                    Nuevo token
                </Button>
            </Tooltip>
        </div>
    );
};
