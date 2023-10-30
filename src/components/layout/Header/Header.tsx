"use client";
import Link from "next/link";
import { useHeader } from "./useHeader";
import { HeaderBusinessSelector } from "./HeaderBusinessSelector";
import { appName } from "@/data/constants";

export const Header = () => {
    const {
        business,
        isLoadingBusiness,
        handleSelectionBusiness,
        value,
        isPending,
        mutateFunction,
        path,
    } = useHeader();

    return (
        <header className="h-16 w-full bg-primario fixed top-0 z-10">
            <div className="flex w-full h-full items-center px-6">
                <Link href="/">
                    <h1 className="text-cuaternario font-sans uppercase">
                        {appName}
                    </h1>
                </Link>
                <HeaderBusinessSelector
                    handle={{
                        business,
                        isLoadingBusiness,
                        handleSelectionBusiness,
                        value,
                        isPending,
                        mutateFunction,
                        path,
                    }}
                />
            </div>
        </header>
    );
};
