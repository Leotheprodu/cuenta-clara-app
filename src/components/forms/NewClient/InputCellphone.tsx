import React from "react";
import { Input } from "@nextui-org/react";

export const InputCellphone = ({ handle }: InputCellphoneProps) => {
    const { handleOnChange, cellphone } = handle;
    return (
        <Input
            type="number"
            label="Teléfono Celular"
            variant="underlined"
            placeholder="Ingresa el teléfono celular"
            value={cellphone}
            onChange={handleOnChange}
            name="cellphone"
            description="Preferiblemente el número de WhatsApp"
        ></Input>
    );
};
