import { useEffect, useState } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { redirect } from "next/navigation";
import { $toastGlobal } from "@/stores/toast";

export const useEmailVerification = (token: string) => {
    const [redirecting, setRedirecting] = useState(false);
    redirecting && redirect("/");
    useEffect(() => {
        const verifyEmail = async () => {
            if (token) {
                const { error } = await fetchAPI({
                    url: `auth/email-verification/${token}`,
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
};
