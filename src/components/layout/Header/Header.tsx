"use client";
import Link from "next/link";
import { Select, SelectItem } from "@nextui-org/react";
import { useHeader } from "./useHeader";

export const Header = () => {
    const {
        business,
        isLoadingBusiness,
        handleSelectionBusiness,
        value,
        isPending,
        mutateFunction,
    } = useHeader();

    return (
        <header className="h-16 w-full bg-primario fixed top-0 z-10">
            <div className="flex w-full h-full items-center px-6">
                <Link className="" href={"/"}>
                    <h1 className="text-cuaternario font-sans uppercase">
                        Cuenta <span className="text-gris">Clara</span>
                    </h1>
                </Link>
                <span className="w-[1px] mx-1 bg-terciario h-8 rounded-md"></span>
                <Select
                    size="sm"
                    variant="underlined"
                    isDisabled={isLoadingBusiness || isPending}
                    items={business}
                    label="Selecciona tu negocio"
                    className="max-w-xs text-blanco"
                    selectedKeys={value}
                    onSelectionChange={handleSelectionBusiness}
                    onChange={mutateFunction}
                >
                    {(business) => (
                        <SelectItem key={business.id} value={business.id}>
                            {business.name}
                        </SelectItem>
                    )}
                </Select>
            </div>
        </header>
    );
};
