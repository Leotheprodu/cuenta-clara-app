import React from "react";
import { Textarea } from "@nextui-org/react";

export const InputAddress = ({ handle }: InputAddressProps) => {
  const { handleOnChange, address, noFormValue } = handle;
  return (
    <Textarea
      type="text"
      label="Dirección"
      variant="underlined"
      placeholder="Agrega una dirección"
      value={address}
      onChange={handleOnChange}
      name="address"
      required
      isInvalid={noFormValue.address}
    ></Textarea>
  );
};
