"use client";
import { MotionClientsCard } from "./MotionClientsCard";
import { ClientCard } from "./ClientCard";
import { useClientsPage } from "./useClientsPage";
import Loading from "@/app/loading";
import { HeaderClients } from "./HeaderClients";
import { ClientsLetterView } from "./ClientsLetterView";
import { motion } from "framer-motion";
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
                <div className="flex flex-col gap-4 items-center justify-center">
                    {clientsSearched.length > 0 &&
                        clientsSearched.map((client: any) => (
                            <MotionClientsCard key={client.id}>
                                <motion.div
                                    whileHover={{ scale: [null, 1.3, 1.2] }}
                                    transition={{ duration: 0.3 }}
                                    className=" flex flex-col z-10 rounded-2xl border-1 bg-blanco border-secundario p-2 w-[20rem] shadow-md"
                                >
                                    <ClientCard
                                        isShowActivoButton={isShowActivoButton}
                                        client={client}
                                    />
                                </motion.div>
                            </MotionClientsCard>
                        ))}
                    <ClientsLetterView letterViewClient={letterViewClient} />
                </div>
            </div>
        </div>
    );
};
