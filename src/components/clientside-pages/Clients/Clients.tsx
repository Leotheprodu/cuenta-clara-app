"use client";
import { LettersFilter } from "./LettersFilter";
import { MotionClientsCard } from "./MotionClientsCard";
import { ClientCard } from "./ClientCard";
import { useClientsPage } from "./useClientsPage";
import Loading from "@/app/loading";
import { SwitchActivo } from "./SwitchActivo";
import { motion } from "framer-motion";
import { $LetterViewClient } from "@/stores/generalConfig";
import { useStore } from "@nanostores/react";
export const Clients = () => {
    const letterViewClient = useStore($LetterViewClient);
    const {
        filteredClientsWB,
        HandleLetterFilter,
        HanldeIsSelected,
        isShowActivoButton,
        letterSelected,
        isLoading,
    } = useClientsPage();
    if (isLoading) return <Loading />;
    return (
        <div className="h-full w-full">
            <div className="z-10 flex fixed left-0 items-center justify-center w-full bg-blanco/80 shadow-md backdrop-blur-sm">
                <SwitchActivo
                    handle={{ isShowActivoButton, HanldeIsSelected }}
                />
            </div>
            <div className=" py-28 sm:px-[10rem]">
                {/* <LettersFilter
                    handle={{ HandleLetterFilter, letterSelected }}
                /> */}
                <div className="flex flex-col items-center gap-3">
                    {filteredClientsWB.length > 0 &&
                        filteredClientsWB.map((client: any) => (
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
                            className="fixed bottom-1/2 font-bold text-9xl text-primario"
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
