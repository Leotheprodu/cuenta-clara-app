"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";
import { AddButton } from "./AddButton";
import { HomeIcon } from "@/icons/HomeIcon";
import { ClientsIcon } from "@/icons/ClientsIcon";
import { usePathname } from "next/navigation";

export const Footer = () => {
    const path = usePathname();
    return (
        <>
            {path !== "/sesion-de-usuario" && (
                <footer className="fixed bottom-0 h-16 w-full bg-primario">
                    <div className="flex gap-28 justify-center items-center w-full h-full relative ">
                        <Link
                            className="relative text-xs text-blanco flex flex-col justify-center items-center"
                            href="/"
                        >
                            {path === "/" && (
                                <motion.span
                                    layoutId="underline"
                                    className="absolute left-0 top-full block h-[1px] w-full bg-terciario"
                                />
                            )}
                            <HomeIcon className="" />
                            <p>Actividad</p>
                        </Link>
                        <AddButton />
                        <Link
                            className="relative text-xs text-blanco flex flex-col justify-center items-center"
                            href="/clientes"
                        >
                            {path === "/clientes" && (
                                <motion.span
                                    layoutId="underline"
                                    className="absolute left-0 top-full block h-[1px] w-full bg-terciario"
                                />
                            )}
                            <ClientsIcon className="" />
                            <p>Clientes</p>
                        </Link>
                    </div>
                </footer>
            )}
        </>
    );
};
