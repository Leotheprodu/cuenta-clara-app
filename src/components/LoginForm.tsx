"use client";

import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { KeyIcon } from "@/icons/KeyIcon";
import { MailIcon } from "@/icons/MailIcon";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { fetchAPI } from "./helpers/fetchAPI";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";

export const LoginForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [form, setForm] = useState({ email: "", password: "" });
    const toggleVisibility = () => setIsVisible(!isVisible);
    const user = useStore($user);
    useEffect(() => {
        console.log(user);
        /*   const checkIsLogedIn = async () => {
            const userData = await fetchAPI({
                url: "auth/login",
                method: "POST",
                body: form,
            });
        }; */
    }, [user]);

    const handleLogin = async () => {
        const { data, status, error } = await fetchAPI({
            url: "auth/login",
            method: "POST",
            body: form,
        });
        if (!error) $user.set(data);
    };
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
                    value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                    }
                />
            </div>
            <Button onClick={handleLogin} className="uppercase" color="primary">
                Entrar
            </Button>
        </form>
    );
};
