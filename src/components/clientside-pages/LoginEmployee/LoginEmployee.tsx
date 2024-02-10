"use client";

import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";
import { useLoginEmployee } from "./useLoginEmployee";
import { useLoadingByCriticProcess } from "@/components/hooks/useLoadingByCriticProcess";
import { IsLoggedInHandle } from "@/components/forms/LoginForm/IsLoggedInHandle";
import { InputUsername } from "@/components/forms/NewClient/InputUsername";
import { InputPasswordLoginForm } from "@/components/forms/LoginForm/InputPasswordLoginForm";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { internalLinks } from "@/components/Utils/internalLinks";

export const LoginEmployee = () => {
  useNamingPagesRoutes({ internalLink: "employee" });
  const {
    isVisible,
    handleOnChange,
    isPending,
    toggleVisibility,
    handleLogin,
    isInvalidPass,
    username,
    password,
    user,
  } = useLoginEmployee({ username: "", password: "" });

  const { showLoading, LoadingElement } = useLoadingByCriticProcess();

  if (showLoading) {
    return LoadingElement;
  }
  if (user.isLoggedIn) {
    return <IsLoggedInHandle />;
  }
  return (
    <>
      <h1 className="text-3xl text-center font-semibold">Iniciar sesion</h1>
      <p className="text-center  text-primario mb-4">
        Inicia sesion para empezar a trabajar
      </p>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <InputUsername
          handle={{ username, handleOnChange, type: "employee" }}
        />
        <InputPasswordLoginForm
          handle={{
            handleOnChange,
            isVisible,
            toggleVisibility,
            isInvalidPass,
            password,
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
      <div className="mt-4">
        <p className="text-center text-sm text-gray-400">
          ¿No eres un empleado?{" "}
          <Link
            href={internalLinks("users")}
            className="text-primary hover:underline"
          >
            Inicia sesion como cliente
          </Link>
        </p>
      </div>
    </>
  );
};
