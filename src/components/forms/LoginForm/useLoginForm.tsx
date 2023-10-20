import { useState, useEffect } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { redirect } from "next/navigation";
import { useCheckSession } from "@/components/hooks/useCheckSession";
import { handleOnChange, handleOnClear } from "@/components/Utils/formUtils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export const useLoginForm = (formInit: FormValuesLoginForm) => {
    useCheckSession();
    const user = useStore($user);
    const [form, setForm] = useState(formInit);
    const [isVisible, setIsVisible] = useState(false);
    const [sendLogin, setSendLogin] = useState(false);
    const [isInvalidPass, setIsInvalidPass] = useState(false);
    const { status, data, mutate, error, isPending } = useMutation({
        mutationKey: ["Login"],
        mutationFn: async () =>
            await fetchAPI({
                url: "auth/login",
                method: "POST",
                body: form,
            }),
    });
    if (sendLogin && user.isLoggedIn) {
        redirect("/");
    }
    useEffect(() => {
        if (status === "pending") {
            toast.loading("Cargando...");
        } else if (status === "success") {
            $user.set(data);
            toast.dismiss();
            toast.success(`Bienvenido ${data.user.username}`);
            setSendLogin(true);
        } else if (status === "error") {
            toast.dismiss();
            toast.error(error?.message || "");
            error?.message === "Contraseña Incorrecta" &&
                setIsInvalidPass(true);
        }
    }, [data, error, status]);

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate();
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
        isPending,
    };
};
