import React from "react";
import { Input } from "@nextui-org/react";

export const InputUsername = ({ handle }: InputUsernameProps) => {
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
