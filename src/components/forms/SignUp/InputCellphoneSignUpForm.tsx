import React from "react";
import { Input } from "@nextui-org/react";

export const InputCellphoneSignUpForm = ({ handle }: InputCellphoneProps) => {
  const { handleOnChange, cellphone, codeSelected } = handle;
  return (
    <div className="w-full relative">
      <span className="absolute text-sm text-negro/70 left-[0] bottom-[1.65rem] z-10">
        {"+" + codeSelected}
      </span>

      <Input
        className="pl-[2.5rem]"
        type="number"
        label="Teléfono Celular"
        placeholder="Ingresa el teléfono celular"
        value={cellphone}
        onChange={handleOnChange}
        name="cellphone"
        description="Preferiblemente el número de WhatsApp"
      ></Input>
    </div>
  );
};
