"use client";
import { useEffect, useState } from "react";
import { $user } from "@/stores/users";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $isCheckingSession } from "@/stores/generalConfig";
import { whiteListPaths } from "@/data/constants";
export const useCheckSession = () => {
    const pathname = usePathname();
    const user = useStore($user);
    const { status, data, isLoading } = useQuery({
        queryKey: ["checkIsLogedIn"],
        queryFn: async () =>
            await fetchAPI({
                url: "auth/check-session",
            }),
        retry: 2,
    });
    useEffect(() => {
        $isCheckingSession.set(isLoading);
    }, [isLoading]);
    useEffect(() => {
        if (!user.isLoggedIn && !whiteListPaths.includes(pathname)) {
            redirect("/sesion");
        }
    }, [user, pathname]);
    useEffect(() => {
        if (status === "success") {
            if (data.isLoggedIn) {
                $user.set(data);
            }
        } else if (status === "error") {
            $user.set({ ...user, isLoggedIn: false });
            if (!whiteListPaths.includes(pathname)) {
                redirect("/sesion");
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, status]);
};
