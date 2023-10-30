"use client";

import { MotionClientsCard } from "./MotionClientsCard";
import { ClientCard } from "./ClientCard";
import { useClientsPage } from "./useClientsPage";
import Loading from "@/app/loading";
import { motion } from "framer-motion";
import { HeaderClients } from "./HeaderClients";
export const Clients = () => {
    const {
        handleSearchClient,
        HanldeIsSelected,
        isShowActivoButton,
        isLoading,
        letterViewClient,
        searchClient,
        clientsSearched,
    } = useClientsPage();

    if (isLoading) return <Loading />;
    return (
        <div className="h-full w-full">
            <HeaderClients
                handle={{
                    isShowActivoButton,
                    HanldeIsSelected,
                    handleSearchClient,
                    searchClient,
                }}
            />
            <div className=" py-28 ">
                <div className="flex flex-col gap-2 items-center">
                    {clientsSearched.length > 0 &&
                        clientsSearched.map((client: any) => (
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
                H
            </div>
        </div>
    );
};
