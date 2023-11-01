import React from "react";
import { Input } from "@nextui-org/react";

export const InputDetail = ({ handle }: InputDetailProps) => {
    const { handleOnChange, detail } = handle;
    return (
        <Input
            type="text"
            label="Detalle"
            variant="underlined"
            placeholder="Agrega un detalle"
            value={detail}
            onChange={handleOnChange}
            name="detail"
        ></Input>
    );
};
