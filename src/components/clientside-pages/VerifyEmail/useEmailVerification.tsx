import { fetchAPI } from "../../Utils/fetchAPI";
import { redirect } from "next/navigation";
import { $toastGlobal } from "@/stores/toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
export const useEmailVerification = (token: string) => {
    const [isRedirecting, setIsRedirecting] = useState(false);
    const { status, isLoading } = useQuery({
        queryKey: ["email-verification"],
        queryFn: async () =>
            await fetchAPI({
                url: `auth/email-verification/${token}`,
            }),
    });
    isRedirecting && redirect("/");

    useEffect(() => {
        if (isLoading) {
            $toastGlobal.set({ type: "loading", message: "Verificando..." });
        } else if (status === "success") {
            $toastGlobal.set({
                type: "success",
                message: `Correo verificado correctamente`,
            });
            setIsRedirecting(true);
        } else if (status === "error") {
            $toastGlobal.set({ type: "error", message: "Hubo un Error" });
        }
    }, [status, isLoading]);
};
