import React from "react";
import { InputEmailProps } from "./InterfacesNewClient";
import { Input } from "@nextui-org/react";

export const InputEmail = ({ handle }: InputEmailProps) => {
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
