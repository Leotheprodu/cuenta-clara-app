import { useState, useEffect } from "react";
import { fetchAPI } from "../../Utils/fetchAPI";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { redirect } from "next/navigation";
import { handleOnChange, handleOnClear } from "@/components/Utils/formUtils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
export const useLoginForm = (formInit: FormValuesLoginForm) => {
    const user = useStore($user);
    const [form, setForm] = useState(formInit);
    const [isVisible, setIsVisible] = useState(false);
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

    useEffect(() => {
        if (status === "success") {
            $user.set(data);
            toast.success(`Bienvenido ${data.user.username}`);
            redirect("/");
        } else if (status === "error") {
            toast.error(error?.message || "");
            error?.message === "Contraseña Incorrecta" &&
                setIsInvalidPass(true);
        }
        return () => toast.dismiss();
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
