import { fetchAPI } from "../../Utils/fetchAPI";
import { redirect } from "next/navigation";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
export const useEmailVerification = (token: string) => {
    const { status, isLoading, isError, isSuccess } = useQuery({
        queryKey: ["email-verification"],
        queryFn: async () =>
            await fetchAPI({
                url: `auth/email-verification/${token}`,
            }),
    });

    useEffect(() => {
        if (status === "success") {
            toast.success(`Correo verificado correctamente`);
            redirect("/");
        } else if (status === "error") {
            toast.error("Hubo un error");
        }
        return () => toast.dismiss();
    }, [status]);

    return {
        isLoading,
        isError,
        isSuccess,
    };
};
