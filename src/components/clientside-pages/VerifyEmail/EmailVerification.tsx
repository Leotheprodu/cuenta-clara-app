"use client";
import Loading from "@/app/loading";
import { useEmailVerification } from "./useEmailVerification";
import { Link } from "@nextui-org/react";
import { internalLinks } from "@/components/Utils/internalLinks";

export const EmailVerification = ({ token }: { token: string }) => {
  const { isLoading, isSuccess, isError } = useEmailVerification(token);
  if (isLoading) return <Loading label="Verificando" />;
  if (isSuccess)
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-primario text-2xl">Hemos verificado tu correo</h1>
        <p className="text-base">Ahora puedes iniciar sesion</p>
        <Link href={internalLinks("users")}>Inicia sesion</Link>
      </div>
    );
  if (isError)
    return (
      <p className="text-primario text-center">
        Lo sentimos, hubo un error, intente de nuevo mas tarde
      </p>
    );
};
