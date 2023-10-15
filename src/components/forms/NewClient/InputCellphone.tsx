import React from "react";
import { Input } from "@nextui-org/react";

export const InputCellphone = ({ handle }: InputCellphoneProps) => {
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
