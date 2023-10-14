import React from "react";
import { InputCellphoneNewClientProps } from "./NewClientsInterfaces";
import { Input } from "@nextui-org/react";

export const InputCellphoneNewClient = ({
    handle,
}: InputCellphoneNewClientProps) => {
    const { handleOnChange, cellphone } = handle;
    return (
        <Input
            type="number"
            label="Telefono Celular"
            isRequired
            variant="underlined"
            placeholder="Ingresa el telefono celular"
            value={cellphone}
            onChange={handleOnChange}
            name="cellphone"
        ></Input>
    );
};
