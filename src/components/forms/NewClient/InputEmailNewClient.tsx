import React from "react";
import { InputEmailNewClientProps } from "./NewClientsInterfaces";
import { Input } from "@nextui-org/react";

export const InputEmailNewClient = ({ handle }: InputEmailNewClientProps) => {
    const { handleOnChange, email } = handle;
    return (
        <Input
            type="email"
            label="Correo Electronico"
            variant="underlined"
            placeholder="Ingresa el correo electronico"
            value={email}
            onChange={handleOnChange}
            name="email"
        ></Input>
    );
};
