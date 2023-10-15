"use client";
import { useEmailVerification } from "./useEmailVerification";

export const EmailVerification = ({ token }: { token: string }) => {
    useEmailVerification(token);

    return <div>Verificando...</div>;
};
