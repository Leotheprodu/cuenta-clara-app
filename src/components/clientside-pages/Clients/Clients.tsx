"use client";
import { LettersFilter } from "./LettersFilter";
import { MotionClientsCard } from "./MotionClientsCard";
import { ClientCard } from "./ClientCard";
import { useClientsPage } from "./useClientsPage";
import Loading from "@/app/loading";

export const Clients = () => {
    const { filteredClients, HandleLetterFilter, letterSelected, isLoading } =
        useClientsPage();
    if (isLoading) return <Loading />;

    return (
        <div>
            <LettersFilter handle={{ HandleLetterFilter, letterSelected }} />
            <div className="flex flex-wrap gap-3 px-10 justify-center py-10">
                {filteredClients.length > 0 &&
                    filteredClients.map((client: ClientProps) => (
                        <MotionClientsCard key={client.id}>
                            <ClientCard client={client} />
                        </MotionClientsCard>
                    ))}
            </div>
        </div>
    );
};
