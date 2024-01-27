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

  showLoading && <div className="my-0 mx-auto">{LoadingElement}</div>;

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

      <div className="z-0 py-28 flex flex-col gap-4 items-center justify-center">
        {clientsSearched.length > 0 &&
          clientsSearched.map((client: ClientProps) => (
            <PageWrapper key={client.id}>
              <DragableClient id={client.id}>
                <ClientCard
                  isShowActivoButton={isShowActivoButton}
                  client={client}
                />
              </DragableClient>
            </PageWrapper>
          ))}
        <ClientsLetterView />
      </div>
    </div>
  );
};
