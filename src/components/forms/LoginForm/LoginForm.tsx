"use client";
import { Button } from "@nextui-org/react";
import { IsLoggedInHandle } from "./IsLoggedInHandle";
import { useLoginForm } from "@/components/forms/LoginForm/useLoginForm";
import { InputEmailLoginForm } from "./InputEmailLoginForm";
import { InputPasswordLoginForm } from "./InputPasswordLoginForm";
import { useLoadingByCriticProcess } from "@/components/hooks/useLoadingByCriticProcess";

export const LoginForm = () => {
    const {
        isVisible,
        handleOnChange,
        handleOnClear,
        toggleVisibility,
        handleLogin,
        isInvalidPass,
        email,
        password,
        user,
        isPending,
    } = useLoginForm({ email: "", password: "" });

    const { showLoading, LoadingElement } = useLoadingByCriticProcess({
        label: "Cargando...",
    });

    if (showLoading) {
        return LoadingElement;
    }

    if (user.isLoggedIn) {
        return <IsLoggedInHandle />;
    }

    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <InputEmailLoginForm
                handle={{ handleOnClear, email, handleOnChange }}
            />
            <InputPasswordLoginForm
                handle={{
                    handleOnChange,
                    isVisible,
                    toggleVisibility,
                    isInvalidPass,
                    password,
                }}
            />
            <Button
                isLoading={isPending}
                type="submit"
                className="uppercase"
                color="primary"
            >
                Entrar
            </Button>
        </form>
    );
};
