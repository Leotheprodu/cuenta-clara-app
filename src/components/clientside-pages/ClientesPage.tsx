"use client";
import { useEffect, useState } from "react";
import { useCheckSession } from "../hooks/useCheckSession";
import { fetchAPI } from "../helpers/fetchAPI";
import { motion } from "framer-motion";
import Link from "next/link";

export const ClientesPage = () => {
    useCheckSession();
    const letters = "abcdefghijklmnñopqrstuvwxyz".split("");
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [letterSelected, setLetterSelected] = useState("");

    useEffect(() => {
        const bdClients = async () => {
            if (clients.length === 0) {
                const { data } = await fetchAPI({
                    url: "clients?activo=true",
                });
                setClients(data);
            }
        };
        bdClients();
    }, [clients]);

    useEffect(() => {
        if (!letterSelected) {
            setFilteredClients(clients);
        }
    }, [letterSelected, clients]);

    return (
        <div className="">
            <div className="flex flex-col gap-2 fixed top-5 right-2">
                {letters.map((letter) => (
                    <button
                        className={`relative rounded-full w-3 h-3 flex justify-center items-center uppercase transition-all duration-300`}
                        key={letter}
                        onClick={() => {
                            setLetterSelected(letter);
                            if (letterSelected !== letter) {
                                const filtered = clients.filter((client: any) =>
                                    client.username
                                        .toLowerCase()
                                        .startsWith(letter)
                                );
                                setFilteredClients(filtered);
                            } else {
                                setLetterSelected("");
                                setFilteredClients(clients);
                            }
                        }}
                    >
                        {letterSelected === letter && (
                            <motion.span
                                layoutId="letteLine"
                                className="absolute right-full top-0 block w-[.3rem] h-full rounded-full bg-primario"
                            />
                        )}
                        <div>{letter}</div>
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-3">
                {filteredClients.length > 0 &&
                    filteredClients.map((client: any) => (
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 10 }}
                            exit={{ opacity: 0, x: 40 }}
                            className="flex rounded-xl border-1 border-gris min-w-[15rem] max-w-[30rem] h-[7rem] p-2 shadow-md"
                            key={client.id}
                        >
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h1 className="font-bold">
                                        {client.username}
                                    </h1>
                                    <div>
                                        <a href={`mailto:${client.email}`}>
                                            <p className="text-xs text-secundario">
                                                {client.email}
                                            </p>
                                        </a>

                                        <a
                                            target="_blank"
                                            href={`https://wa.me/506${client.cellphone}?text=Hola!%20${client.username},%20`}
                                        >
                                            <p className="text-xs text-secundario">
                                                {`+506 ${client.cellphone}`}
                                            </p>
                                        </a>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <Link href={`/clientes/${client.id}`}>
                                        Saldos
                                    </Link>
                                    <Link
                                        href={`/clientes/actualizar/${client.id}`}
                                    >
                                        Actualizar
                                    </Link>
                                    <Link
                                        href={`/clientes/eliminar/${client.id}`}
                                    >
                                        Eliminar
                                    </Link>
                                    <Link
                                        href={`/nueva-transaccion?id=${client.id}`}
                                    >
                                        Transacción
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
            </div>
        </div>
    );
};
