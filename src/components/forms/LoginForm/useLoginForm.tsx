import { useState } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { $toastGlobal } from "@/stores/toast";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { redirect } from "next/navigation";
import { useCheckSession } from "@/components/hooks/useCheckSession";
import { FormValues } from "./InterfacesLoginForm";
import { handleOnChange, handleOnClear } from "@/components/Utils/formUtils";

export const useLoginForm = (formInit: FormValues) => {
    useCheckSession();
    const user = useStore($user);
    const [form, setForm] = useState(formInit);
    const [isVisible, setIsVisible] = useState(false);
    const [sendLogin, setSendLogin] = useState(false);
    const [isInvalidPass, setIsInvalidPass] = useState(false);

    if (sendLogin && user.isLoggedIn) {
        redirect("/");
    }

    const toggleVisibility = () => setIsVisible(!isVisible);
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        $toastGlobal.set({ type: "loading", message: "Cargando..." });
        const { data, error } = await fetchAPI({
            url: "auth/login",
            method: "POST",
            body: form,
        });
        if (!error) {
            $user.set(data);
            $toastGlobal.set({
                type: "success",
                message: `Bienvenido ${data.user.username}`,
            });
            setSendLogin(true);
        } else {
            $toastGlobal.set({ type: "error", message: error });
            error === "Contraseña Incorrecta" && setIsInvalidPass(true);
        }
    };

    return {
        ...form,
        toggleVisibility,
        handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange(setForm, e),
        handleOnClear: (name: string) => handleOnClear(name, setForm),
        handleLogin,
        isVisible,
        isInvalidPass,
        user,
    };
};
