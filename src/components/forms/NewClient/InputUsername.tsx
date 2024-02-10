import React from "react";
import { Input } from "@nextui-org/react";

export const InputUsername = ({ handle }: InputUsernameProps) => {
  const { handleOnChange, username, type = "client" } = handle;

  return (
    <Input
      type="text"
      isRequired
      label={type === "client" ? "Nombre del Cliente" : "Nombre de Usuario"}
      variant={type === "client" ? "underlined" : "flat"}
      placeholder={
        type === "client"
          ? "Ingresa el nombre del cliente"
          : "Ingresa tu nombre de usuario"
      }
      value={username}
      onChange={handleOnChange}
      name="username"
    ></Input>
  );
};
