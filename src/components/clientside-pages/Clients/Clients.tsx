"use client";

import { MotionClientsCard } from "./MotionClientsCard";
import { ClientCard } from "./ClientCard";
import { useClientsPage } from "./useClientsPage";
import Loading from "@/app/loading";
import { SwitchActivo } from "./SwitchActivo";
import { motion } from "framer-motion";
import { $LetterViewClient } from "@/stores/generalConfig";
import { useStore } from "@nanostores/react";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SearchIcon } from "@/icons/SearchIcon";
export const Clients = () => {
    const letterViewClient = useStore($LetterViewClient);
    const [searchClient, setSearchClient] = useState("");
    const [ClientsSearched, setClientsSearched] = useState([{}]);

    const {
        filteredClientsWB,
        HanldeIsSelected,
        isShowActivoButton,
        isLoading,
    } = useClientsPage();
    const handleSearchClient = (e: any) => {
        setSearchClient(e.target.value);
    };
    useEffect(() => {
        if (searchClient.length > 0) {
            const searchLower = searchClient.toLowerCase(); // Convertimos el input a minúsculas
            const filtered = filteredClientsWB.filter((client: any) => {
                const usernameMatch = client.username
                    .toLowerCase()
                    .includes(searchLower);
                const cellphoneMatch =
                    client.cellphone && client.cellphone.includes(searchClient);
                const emailMatch =
                    client.email &&
                    client.email.toLowerCase().includes(searchLower);
                return usernameMatch || cellphoneMatch || emailMatch;
            });

            if (filtered.length === 0) {
                return;
            }
            setClientsSearched(filtered);
        } else {
            setClientsSearched(filteredClientsWB);
        }
    }, [searchClient, filteredClientsWB]);

    if (isLoading) return <Loading />;
    return (
        <div className="h-full w-full">
            <div className="z-10 flex fixed left-0 items-center justify-center w-full bg-blanco/80 shadow-md backdrop-blur-sm">
                <SwitchActivo
                    handle={{ isShowActivoButton, HanldeIsSelected }}
                />
                <Input
                    onChange={handleSearchClient}
                    value={searchClient}
                    type="text"
                    size="sm"
                    placeholder="Busca por nombre, correo o teléfono"
                    className="sm:w-1/4 shadow-sm"
                    startContent={
                        <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                    }
                ></Input>
            </div>
            <div className=" py-28 sm:px-[10rem]">
                <div className="flex flex-col items-center gap-3">
                    {ClientsSearched.length > 0 &&
                        ClientsSearched.map((client: any) => (
                            <div className="" key={client.id}>
                                <MotionClientsCard>
                                    <ClientCard
                                        isShowActivoButton={isShowActivoButton}
                                        client={client}
                                    />
                                </MotionClientsCard>
                            </div>
                        ))}
                    {letterViewClient.isClientView && (
                        <motion.div
                            style={{ pointerEvents: "none" }}
                            className="fixed  bottom-1/2 font-bold text-9xl text-primario"
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1 }}
                        >
                            <p>{letterViewClient.letter}</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};
