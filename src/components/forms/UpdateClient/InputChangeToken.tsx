import { Button, Input } from "@nextui-org/react";

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
            <Button color="secondary" onClick={handleNewToken}>
                Nuevo Token
            </Button>
        </div>
    );
};
