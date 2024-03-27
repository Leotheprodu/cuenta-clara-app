"use client";
import { ClientCard } from "./ClientCard";
import { useClientsPage } from "./useClientsPage";
import { HeaderClients } from "./HeaderClients";
import { ClientsLetterView } from "./ClientsLetterView";
import { PageWrapper } from "@/components/Utils/PageWrapper";
import { DragableClient } from "./DragableClient";
import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";
import { useLoadingByCriticProcess } from "@/components/hooks/useLoadingByCriticProcess";
export const Clients = () => {
  const {
    handleSearchClient,
    HanldeIsSelected,
    isShowActivoButton,
    searchClient,
    clientsSearched,
  } = useClientsPage();
  useNamingPagesRoutes({ internalLink: "clients" });
  const { showLoading, LoadingElement } = useLoadingByCriticProcess();

  if (showLoading) {
    return LoadingElement;
  }

  return (
    <div className=" h-full w-full">
      <HeaderClients
        handle={{
          isShowActivoButton,
          HanldeIsSelected,
          handleSearchClient,
          searchClient,
        }}
      />

      <div className="z-0 py-28 flex sm:flex-wrap flex-col sm:flex-row gap-4 items-center justify-center">
        {clientsSearched.length > 0 &&
          clientsSearched.map((client: ClientProps) => (
            <PageWrapper key={client.id}>
              {client.id !== 0 && (
                <div className=" flex flex-col z-0 rounded-xl border-1 bg-blanco border-secundario/10 p-2 ">
                  <ClientCard
                    isShowActivoButton={isShowActivoButton}
                    client={client}
                  />
                </div>
              )}
            </PageWrapper>
          ))}
        <ClientsLetterView />
      </div>
    </div>
  );
};
