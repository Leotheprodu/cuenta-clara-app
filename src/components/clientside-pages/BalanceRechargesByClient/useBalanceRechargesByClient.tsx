import { formatDate, moneyFormat } from "@/components/Utils/dataFormat";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import {
  DataRechargesBalanceByClientDefault,
  clientStatusInvoice,
  paymentStatus,
} from "@/data/constants";
import { Tooltip } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { CheckmarkIcon } from "react-hot-toast";

export const useBalanceRechargesByClient = ({ id }: { id: number }) => {
  const [recharges, setRecharges] = useState<
    DataRechargesBalanceByClientProps[]
  >([DataRechargesBalanceByClientDefault]); // [BalanceRecharge
  const { status, data } = useQuery({
    queryKey: ["recharges-by-client"],
    queryFn: async () =>
      await fetchAPI({
        url: `balances/recharges/${id}`,
      }),
    retry: 2,
  });
  useEffect(() => {
    if (status === "success") {
      setRecharges(data);
    }
  }, [status, data]);

  const columnNames: ColumnNamesProps[] = [
    { key: "id", name: "Id" },
    { key: "createdAt", name: "Fecha" },
    { key: "amount", name: "Monto" },
    { key: "status", name: "Status" },
    { key: "actions", name: "Acciones" },
  ];
  const renderCell = (
    recharges: DataRechargesBalanceByClientProps,
    columnKey: any,
    index: any
  ) => {
    switch (columnKey) {
      case "id":
        return <p>{recharges.id}</p>;
      case "createdAt":
        return <p className="">{formatDate(recharges.createdAt)}</p>;
      case "amount":
        return <p className="text-right">{moneyFormat(recharges.amount)}</p>;
      case "status":
        return <p>{paymentStatus[recharges.status].name}</p>;

      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            {recharges.status === paymentStatus.pending.name && (
              <Tooltip color="success" content="Aceptar Recarga">
                <button
                  onClick={(e) => console.log("Aceptar Recarga de Saldo")}
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                >
                  <CheckmarkIcon />
                </button>
              </Tooltip>
            )}
          </div>
        );
      default:
        return <p>Columna Invalida</p>;
    }
  };
  return {
    recharges,
    columnNames,
    renderCell,
  };
};
