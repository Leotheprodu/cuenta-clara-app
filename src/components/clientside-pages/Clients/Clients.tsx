"use client";
import { MotionClientsCard } from "./MotionClientsCard";
import { ClientCard } from "./ClientCard";
import { useClientsPage } from "./useClientsPage";
import Loading from "@/app/loading";
import { HeaderClients } from "./HeaderClients";
import { ClientsLetterView } from "./ClientsLetterView";
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
                            <>
                                <MotionClientsCard key={client.id}>
                                    <div className="flex flex-col rounded-2xl border-1 border-secundario p-2 w-[20rem] shadow-md hover:scale-[.98] ease-in-out duration-200">
                                        <ClientCard
                                            isShowActivoButton={
                                                isShowActivoButton
                                            }
                                            client={client}
                                        />
                                    </div>
                                </MotionClientsCard>
                            </>
                        ))}
                    <ClientsLetterView letterViewClient={letterViewClient} />
                </div>
            </div>
        </div>
    );
};
