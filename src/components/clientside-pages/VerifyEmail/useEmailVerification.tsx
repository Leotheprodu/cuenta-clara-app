import { fetchAPI } from "../../Utils/fetchAPI";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
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
            toast.loading("Verificando...");
        } else if (status === "success") {
            toast.dismiss();
            toast.success(`Correo verificado correctamente`);
            setIsRedirecting(true);
        } else if (status === "error") {
            toast.dismiss();
            toast.error("Hubo un error");
        }
    }, [status, isLoading]);
};
