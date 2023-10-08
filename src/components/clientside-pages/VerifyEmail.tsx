import { useEffect, useState } from "react";
import { fetchAPI } from "../helpers/fetchAPI";
import { redirect } from "next/navigation";
import { $toastGlobal } from "@/stores/toast";
export const EmailVerification = ({ token }: { token: string }) => {
    const [redirecting, setRedirecting] = useState(false);
    redirecting && redirect("/");
    useEffect(() => {
        const verifyEmail = async () => {
            if (token) {
                const { error } = await fetchAPI({
                    url: `email-verification/${token}`,
                });

                if (!error) {
                    $toastGlobal.set({
                        type: "success",
                        message: `Correo verificado correctamente`,
                    });
                    setRedirecting(true);
                } else {
                    $toastGlobal.set({ type: "error", message: error });
                }
            }
        };
        verifyEmail();
    }, [token]);

    return <div>Verificando...</div>;
};
