"use client";

import { useLoadingByCriticProcess } from "@/components/hooks/useLoadingByCriticProcess";

export const MainPage = () => {
    const { showLoading, LoadingElement } = useLoadingByCriticProcess({
        label: "Cargando...",
    });

    if (showLoading) {
        return LoadingElement;
    }
    return <div>MainPage</div>;
};
