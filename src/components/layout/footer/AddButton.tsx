"use client";
import { AddIcon } from "@/icons/AddIcon";
import { AddClientIcon } from "@/icons/AddClientIcon";
import { motion } from "framer-motion";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    Button,
} from "@nextui-org/react";
import { AddTransactionIcon } from "@/icons/AddTransactionIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export const AddButton = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const content = (
        <PopoverContent>
            <div>
                <Link className="hover:" href="/nueva-transaccion">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            transition: { delay: 0.2 },
                        }}
                        exit={{ opacity: 0, x: 20 }}
                        className="px-1 py-2 flex gap-2 items-center active:bg-terciario transition-background ease-linear duration-200 rounded-lg p-1"
                    >
                        <AddTransactionIcon />
                        <div>
                            <h2 className="text-small font-bold uppercase">
                                Nueva Transacción
                            </h2>
                            <p className="text-tiny">
                                Agregar una nueva transacción
                            </p>
                        </div>
                    </motion.div>
                </Link>
                <Link className="" href="/clientes/nuevo">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            transition: { delay: 0.4 },
                        }}
                        exit={{ opacity: 0, x: 20 }}
                        className="px-1 py-2 flex gap-2 items-center active:bg-terciario transition-background ease-linear duration-200 rounded-lg p-1"
                    >
                        <AddClientIcon />
                        <div>
                            <h2 className="text-small font-bold uppercase">
                                Nuevo Cliente
                            </h2>
                            <p className="text-tiny">
                                Agregar un nuevo cliente
                            </p>
                        </div>
                    </motion.div>
                </Link>
            </div>
        </PopoverContent>
    );

    return (
        <div className="absolute top-[-1rem] transform-translate-y-1/2">
            <Popover
                shouldCloseOnBlur
                onClose={() => setIsOpen(false)}
                backdrop="blur"
                isOpen={isOpen}
            >
                <PopoverTrigger>
                    <Button
                        isIconOnly
                        aria-label="agregar"
                        radius="full"
                        className="h-16 w-16 p-0 m-0 bg-secundario shadow-xl text-blanco flex justify-center items-center"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <AddIcon />
                    </Button>
                </PopoverTrigger>
                {content}
            </Popover>
        </div>
    );
};
