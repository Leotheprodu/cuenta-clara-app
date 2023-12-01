"use client";

import { Button } from "@nextui-org/react";
import { InputEmailLoginForm } from "../LoginForm/InputEmailLoginForm";
import { InputPasswordLoginForm } from "../LoginForm/InputPasswordLoginForm";
import { useSignUp } from "./useSignUp";
import { InputUsernameSignUpForm } from "./InputUsernameSignUpForm";
import { InputCellphoneSignUpForm } from "./InputCellphoneSignUpForm";
import { SelectCountry } from "../NewClient/SelectCountry";

export const SignUpForm = () => {
  const {
    handleSignUp,
    handleOnClear,
    email,
    password,
    password2,
    cellphone,
    username,
    handleOnChange,
    isVisible,
    toggleVisibility,
    isPending,
    isInvalidPass,
    codeSelected,
    countrySelected,
    countryCodes,
    handleCountrySelectionChange,
    isregistered,
  } = useSignUp({
    email: "",
    password: "",
    username: "",
    password2: "",
    cellphone: "",
    country: "",
  });

  if (isregistered) {
    return (
      <div>
        <h1 className="text-3xl text-center font-semibold">Registro exitoso</h1>
        <p className="text-center text-gray-400 text-primario mb-4">
          Por favor verifique su correo electrónico
        </p>
      </div>
    );
  }
  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
      <SelectCountry
        handle={{ countryCodes, countrySelected, handleCountrySelectionChange }}
      />
      <InputUsernameSignUpForm
        handle={{ handleOnChange, username, handleOnClear }}
      />
      <InputEmailLoginForm handle={{ handleOnClear, email, handleOnChange }} />
      <InputCellphoneSignUpForm
        handle={{ handleOnChange, cellphone, codeSelected }}
      />
      <InputPasswordLoginForm
        handle={{
          handleOnChange,
          isVisible,
          toggleVisibility,
          password,
          isInvalidPass,
        }}
      />
      <InputPasswordLoginForm
        handle={{
          confirmPassword: true,
          handleOnChange,
          isVisible,
          toggleVisibility,
          password: password2,
          isInvalidPass,
        }}
      />
      <Button
        isLoading={isPending}
        type="submit"
        className="uppercase"
        color="primary"
      >
        Entrar
      </Button>
    </form>
  );
};
