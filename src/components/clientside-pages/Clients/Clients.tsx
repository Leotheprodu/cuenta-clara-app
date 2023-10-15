"use client";
import { LettersFilter } from "./LettersFilter";
import { MotionClientsCard } from "./MotionClientsCard";
import { ClientCard } from "./ClientCard";
import { useClientsPage } from "./useClientsPage";
import { ClientProps } from "./InterfacesClientsPage";

export const Clients = () => {
    const { filteredClients, HandleLetterFilter, letterSelected } =
        useClientsPage();

    return (
        <div className="">
            <LettersFilter handle={{ HandleLetterFilter, letterSelected }} />
            <div className="flex flex-col gap-3">
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
