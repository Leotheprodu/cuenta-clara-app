import { useState } from "react";
import { fetchAPI } from "../../helpers/fetchAPI";
import { $toastGlobal } from "@/stores/toast";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { redirect } from "next/navigation";
import { useCheckSession } from "@/components/hooks/useCheckSession";

interface FormValues {
    email: string;
    password: string;
}

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

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleOnClear = (name: string) => {
        setForm((prev) => ({ ...prev, [name]: "" }));
    };
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
        form,
        toggleVisibility,
        handleOnChange,
        handleOnClear,
        handleLogin,
        isVisible,
        isInvalidPass,
        user,
    };
};
