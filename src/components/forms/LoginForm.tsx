"use client";

import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { KeyIcon } from "@/icons/KeyIcon";
import { MailIcon } from "@/icons/MailIcon";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { fetchAPI } from "../helpers/fetchAPI";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { $toastGlobal } from "@/stores/toast";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
    const toastMessage = useStore($toastGlobal);
    const router = useRouter();
    const [sendLogin, setSendLogin] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isInvalidPass, setIsInvalidPass] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const toggleVisibility = () => setIsVisible(!isVisible);
    const user = useStore($user);
    if (sendLogin && user.isLoggedIn) {
        redirect("/");
    }
    useEffect(() => {
        const checkIsLogedIn = async () => {
            const { data, error } = await fetchAPI({
                url: "auth/check-session",
            });
            if (!error) $user.set(data);
        };
        if (!user.isLoggedIn) {
            checkIsLogedIn();
        }
    }, [user]);
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
    const handleLogout = async () => {
        const { data, status, error } = await fetchAPI({
            url: "auth/logout",
        });
        if (!error) $user.set({ ...user, isLoggedIn: false });
        $toastGlobal.set({
            type: "success",
            message: `Nos vemos pronto ${user.user.username}`,
        });
    };

    if (user.isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center gap-4">
                <h1>Ya has iniciado sesion</h1>
                <div className="flex justify-center items-center gap-4">
                    <Button
                        onClick={() => router.back()}
                        className="uppercase"
                        color="primary"
                    >
                        Atras
                    </Button>
                    <Button
                        onClick={handleLogout}
                        className="uppercase"
                        color="danger"
                    >
                        Cerrar Sesion
                    </Button>
                </div>
            </div>
        );
    }
    return (
        <form className="flex flex-col gap-4">
            <div>
                <Input
                    size="lg"
                    type="email"
                    label="Correo Electronico"
                    placeholder="Ingresa tu correo electronico"
                    isClearable
                    startContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    autoComplete="username"
                    value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                    }
                />
            </div>
            <div>
                <Input
                    size="lg"
                    label="Contraseña"
                    placeholder="Ingresa tu contraseña"
                    endContent={
                        <button
                            className="focus:outline-none"
                            type="button"
                            onClick={toggleVisibility}
                        >
                            {isVisible ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            ) : (
                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                            )}
                        </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs"
                    startContent={
                        <KeyIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    autoComplete="current-password"
                    isInvalid={isInvalidPass}
                    errorMessage={isInvalidPass && "Contraseña Incorrecta"}
                    value={form.password}
                    onChange={(e) => {
                        setForm({ ...form, password: e.target.value });
                        setIsInvalidPass(false);
                    }}
                />
            </div>
            <Button
                type="submit"
                // @ts-ignore
                onClick={handleLogin}
                className="uppercase"
                color="primary"
            >
                Entrar
            </Button>
        </form>
    );
};
