"use client";
import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { fetchAPI } from "@/components/helpers/fetchAPI";
import { redirect } from "next/navigation";

export const MainPage = () => {
    const user = useStore($user);
    const [userChecked, setUserChecked] = useState(false);
    if (userChecked && !user.isLoggedIn) {
        redirect("/sesion-de-usuario");
    }

    useEffect(() => {
        const checkIsLogedIn = async () => {
            const { data, error } = await fetchAPI({
                url: "auth/check-session",
            });
            if (!error) $user.set(data);
            setUserChecked(true);
        };
        if (!user.isLoggedIn) {
            checkIsLogedIn();
        }
    }, [user]);

    return <div>MainPage</div>;
};
