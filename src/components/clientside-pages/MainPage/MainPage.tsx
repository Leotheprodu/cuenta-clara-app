"use client";
import { useCheckSession } from "../../hooks/useCheckSession";

export const MainPage = () => {
    useCheckSession();

    return <div>MainPage</div>;
};
