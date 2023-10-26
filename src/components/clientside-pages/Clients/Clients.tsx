"use client";
import { LettersFilter } from "./LettersFilter";
import { MotionClientsCard } from "./MotionClientsCard";
import { ClientCard } from "./ClientCard";
import { useClientsPage } from "./useClientsPage";
import Loading from "@/app/loading";
import { SwitchActivo } from "./SwitchActivo";

export const Clients = () => {
    const {
        filteredClientsWB,
        HandleLetterFilter,
        HanldeIsSelected,
        isSelected,
        letterSelected,
        isLoading,
    } = useClientsPage();
    if (isLoading) return <Loading />;
    return (
        <div className="h-full w-full">
            <div className="z-10 flex fixed items-center justify-center w-full bg-blanco/90 shadow-sm backdrop-blur-sm border-b border-secundario">
                <SwitchActivo handle={{ isSelected, HanldeIsSelected }} />
            </div>
            <div className=" flex justify-center pt-5 sm:px-[10rem]">
                <LettersFilter
                    handle={{ HandleLetterFilter, letterSelected }}
                />
                <div className="flex flex-wrap gap-3 p-10 justify-center">
                    {filteredClientsWB.length > 1 &&
                        filteredClientsWB.map((client: any) => (
                            <MotionClientsCard key={client.id}>
                                <ClientCard
                                    isSelected={isSelected}
                                    client={client}
                                />
                            </MotionClientsCard>
                        ))}
                </div>
            </div>
        </div>
    );
};
