import React from "react";
import { InputUsernameNewClientProps } from "./NewClientsInterfaces";
import { Input } from "@nextui-org/react";

export const InputUsernameNewClient = ({
    handle,
}: InputUsernameNewClientProps) => {
    const { handleOnChange, username } = handle;
    return (
        <Input
            type="text"
            isRequired
            label="Nombre"
            variant="underlined"
            placeholder="Ingresa el nombre del cliente"
            value={username}
            onChange={handleOnChange}
            name="username"
        ></Input>
    );
};
