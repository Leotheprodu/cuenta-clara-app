"use client";
import { Button, Link } from "@nextui-org/react";
import { IsLoggedInHandle } from "./IsLoggedInHandle";
import { useLoginForm } from "@/components/forms/LoginForm/useLoginForm";
import { InputEmailLoginForm } from "./InputEmailLoginForm";
import { InputPasswordLoginForm } from "./InputPasswordLoginForm";
import { useLoadingByCriticProcess } from "@/components/hooks/useLoadingByCriticProcess";
import { internalLinks } from "@/components/Utils/internalLinks";

export const LoginForm = () => {
  const {
    isVisible,
    handleOnChange,
    handleOnClear,
    toggleVisibility,
    handleLogin,
    isInvalidPass,
    email,
    password,
    user,
    isPending,
  } = useLoginForm({ email: "", password: "" });

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
        Inicia sesion para acceder a tu cuenta
      </p>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <InputEmailLoginForm
          handle={{ handleOnClear, email, handleOnChange }}
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
          ¿No tienes cuenta?{" "}
          <Link
            href={internalLinks("sign-up")}
            className="text-primary hover:underline"
          >
            Registrate
          </Link>
        </p>
      </div>
    </>
  );
};
