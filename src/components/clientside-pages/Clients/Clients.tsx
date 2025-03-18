"use client";
import { ClientCard } from "./ClientCard";
import { useClientsPage } from "./useClientsPage";
import { HeaderClients } from "./HeaderClients";
import { ClientsLetterView } from "./ClientsLetterView";
import { PageWrapper } from "@/components/Utils/PageWrapper";
import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";
import { useLoadingByCriticProcess } from "@/components/hooks/useLoadingByCriticProcess";
import { useEffect, useState } from "react";
import { moneyFormat } from "@/components/Utils/dataFormat";
export const Clients = () => {
  const {
    handleSearchClient,
    handleIsSelectedSwitch,
    isShowActivoButton,
    isShowDebtorsButton,
    searchClient,
    clientsSearched,
  } = useClientsPage();
  useNamingPagesRoutes({ internalLink: "clients" });
  const { showLoading, LoadingElement } = useLoadingByCriticProcess();
  const [firstData, setFirstData] = useState<{
    clientsData: ClientProps[];
    balancesData: number;
  }>({
    clientsData: [],
    balancesData: 0,
  });

  useEffect(() => {
    if (
      firstData.clientsData[0]?.id !== 0 &&
      firstData.clientsData.length > 0
    ) {
      return;
    }

    setFirstData({
      clientsData: clientsSearched,
      balancesData: clientsSearched.reduce((total, client) => {
        return (
          total +
          client.balances.reduce((acc: number, balance: { amount: string }) => {
            return acc + parseFloat(balance.amount);
          }, 0)
        );
      }, 0),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientsSearched]);

  if (showLoading) {
    return LoadingElement;
  }

  return (
    <div className=" h-full w-full">
      <HeaderClients
        handle={{
          isShowActivoButton,
          isShowDebtorsButton,
          handleIsSelectedSwitch,
          handleSearchClient,
          searchClient,
        }}
      />
      <div>
        <div className="flex flex-col items-center justify-center pt-28 pb-10 gap-2">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-4xl font-bold text-center ">Clientes</h1>
            <small>({firstData.clientsData.length})</small>
          </div>
          <div>
            <p>
              Deben en total:{" "}
              {moneyFormat(
                firstData.balancesData < 0
                  ? firstData.balancesData * -1
                  : firstData.balancesData
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="z-0 pb-28 flex sm:flex-wrap flex-col sm:flex-row gap-4 items-center justify-center">
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
