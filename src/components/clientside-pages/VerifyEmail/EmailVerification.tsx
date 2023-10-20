"use client";
import Loading from "@/app/loading";
import { useEmailVerification } from "./useEmailVerification";

export const EmailVerification = ({ token }: { token: string }) => {
    const { isLoading, isError, isSuccess } = useEmailVerification(token);
    if (isLoading) return <Loading label="Verificando" />;
    if (isError) return <div>Hubo un error</div>;
    if (isSuccess) return <div>Ya estas verificado</div>;
};
