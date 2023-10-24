"use client";
import { LettersFilter } from "./LettersFilter";
import { MotionClientsCard } from "./MotionClientsCard";
import { ClientCard } from "./ClientCard";
import { useClientsPage } from "./useClientsPage";
import Loading from "@/app/loading";
import { SwitchActivo } from "./SwitchActivo";

export const Clients = () => {
    const {
        filteredClients,
        HandleLetterFilter,
        HanldeIsSelected,
        isSelected,
        letterSelected,
        isLoading,
    } = useClientsPage();
    if (isLoading) return <Loading />;

    return (
        <div className="relative ">
            <SwitchActivo handle={{ isSelected, HanldeIsSelected }} />
            <div className="">
                <LettersFilter
                    handle={{ HandleLetterFilter, letterSelected }}
                />
                <div className="flex flex-wrap gap-3 px-10 justify-center py-10">
                    {filteredClients.length > 0 &&
                        filteredClients.map((client: ClientProps) => (
                            <MotionClientsCard key={client.id}>
                                <ClientCard
                                    isSelected={isSelected}
                                    client={client}
                                />
                            </MotionClientsCard>
                        ))}
                </div>
                S
            </div>
        </div>
    );
};
