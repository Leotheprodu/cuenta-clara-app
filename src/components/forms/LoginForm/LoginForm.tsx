"use client";
import { Button } from "@nextui-org/react";
import { IsLoggedInHandle } from "./IsLoggedInHandle";
import { useLoginForm } from "@/components/forms/LoginForm/useLoginForm";
import { InputEmail } from "./InputEmail";
import { InputPassword } from "./InputPassword";

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
    } = useLoginForm({ email: "", password: "" });

    if (user.isLoggedIn) {
        return <IsLoggedInHandle />;
    }
    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <InputEmail handle={{ handleOnClear, email, handleOnChange }} />
            <InputPassword
                handle={{
                    handleOnChange,
                    isVisible,
                    toggleVisibility,
                    isInvalidPass,
                    password,
                }}
            />
            <Button type="submit" className="uppercase" color="primary">
                Entrar
            </Button>
        </form>
    );
};
