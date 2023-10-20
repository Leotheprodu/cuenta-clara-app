"use client";
import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export const useCheckSession = () => {
    const pathname = usePathname();
    const user = useStore($user);
    const [userChecked, setUserChecked] = useState(false);
    if (pathname !== "/sesion-de-usuario" && userChecked && !user.isLoggedIn) {
        redirect("/sesion-de-usuario");
    }
    const { status, data } = useQuery({
        queryKey: ["checkIsLogedIn"],
        queryFn: async () =>
            await fetchAPI({
                url: "auth/check-session",
            }),
        retry: 2,
    });
    useEffect(() => {
        if (status === "success") {
            if (data.isLoggedIn) {
                $user.set(data);
                setUserChecked(true);
            }
        } else if (status === "error") {
            setUserChecked(true);
        }
    }, [data, status]);
};
