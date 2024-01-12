import { formatDate, moneyFormat } from "@/components/Utils/dataFormat";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";
import {
  DataRechargesBalanceByClientDefault,
  paymentMethod,
  paymentStatus,
  typeOfRoles,
} from "@/data/constants";
import { DeleteRowIcon } from "@/icons/DeleteRowIcon";
import { $AppState } from "@/stores/generalConfig";
import { $user } from "@/stores/users";
import { useStore } from "@nanostores/react";
import { Tooltip } from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast, { CheckmarkIcon } from "react-hot-toast";

export const useBalanceRechargesByClient = ({ id }: { id: number }) => {
  useNamingPagesRoutes({ internalLink: "recharge-client" });
  const user = useStore($user);
  const appState = useStore($AppState);
  const [recharges, setRecharges] = useState<
    DataRechargesBalanceByClientProps[]
  >([DataRechargesBalanceByClientDefault]); // [BalanceRecharge
  const [selectedRecharge, setSelectedRecharge] = useState({
    id: 0,
    click: false,
    apply: true,
  }); // [BalanceRecharge
  const { status, data, refetch } = useQuery({
    queryKey: ["recharges-by-client"],
    queryFn: async () =>
      await fetchAPI({
        url: `balances/recharges/${id}`,
      }),
    retry: 2,
  });
  const { status: statusSendRecharge, mutate: mutateSendRecharge } =
    useMutation({
      mutationKey: ["ok-recharge"],
      mutationFn: async () =>
        await fetchAPI({
          url: `balances/recharges/ok/${selectedRecharge.id}`,
          method: "PATCH",
        }),
    });
  const { status: statusCancelRecharge, mutate: mutateCancelRecharge } =
    useMutation({
      mutationKey: ["cancel-recharge"],
      mutationFn: async () =>
        await fetchAPI({
          url: `balances/recharges/cancel/${selectedRecharge.id}`,
          method: "PATCH",
        }),
    });
  useEffect(() => {
    $AppState.set({
      ...appState,
      client_id: id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (
      selectedRecharge.click &&
      selectedRecharge.id > 0 &&
      selectedRecharge.apply
    ) {
      mutateSendRecharge();
      setSelectedRecharge({ id: 0, click: false, apply: true });
    } else if (
      selectedRecharge.click &&
      selectedRecharge.id > 0 &&
      !selectedRecharge.apply
    ) {
      mutateCancelRecharge();
      setSelectedRecharge({ id: 0, click: false, apply: false });
    }
  }, [selectedRecharge, mutateSendRecharge, mutateCancelRecharge]);
  useEffect(() => {
    if (statusSendRecharge === "success") {
      refetch();
      toast.success("Recarga Aceptada");
    } else if (statusSendRecharge === "error") {
      toast.error("Error al aceptar la recarga");
    }
  }, [statusSendRecharge, refetch]);
  useEffect(() => {
    if (statusCancelRecharge === "success") {
      refetch();
      toast.success("Recarga Cancelada");
    } else if (statusCancelRecharge === "error") {
      toast.error("Error al cancelar la recarga");
    }
  }, [statusCancelRecharge, refetch]);
  useEffect(() => {
    if (status === "success") {
      setRecharges(data);
    }
  }, [status, data]);
  const handleApplyrecharge = (id: number) => {
    setSelectedRecharge({ id, click: true, apply: true });
  };
  const handleCancelRecharge = (id: number) => {
    setSelectedRecharge({ id, click: true, apply: false });
  };
  const columnNames: ColumnNamesProps[] = [
    { key: "id", name: "Id" },
    { key: "createdAt", name: "Fecha" },
    { key: "amount", name: "Monto" },
    { key: "status", name: "Status" },
    { key: "paymentMethod", name: "Metodo de Pago" },
    { key: "usedPaymentMethod", name: "Metodo Usado" },
  ];
  user.roles.includes(typeOfRoles.admin.id) &&
    columnNames.push({ key: "actions", name: "Acciones" });
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
      case "paymentMethod":
        return <p>{recharges.user_payment_method.payment_method.name}</p>;
      case "usedPaymentMethod":
        if (
          recharges.user_payment_method.payment_method.name ===
          paymentMethod.sinpeMovil.name
        ) {
          return (
            <p>
              {recharges.user_payment_method.payment_method_cellphone}(
              {recharges.user_payment_method.payment_method_description})
            </p>
          );
        } else if (
          recharges.user_payment_method.payment_method.name ===
          paymentMethod.bankTransfer.name
        ) {
          return (
            <p>
              {recharges.user_payment_method.payment_method_iban}(
              {recharges.user_payment_method.payment_method_description})
            </p>
          );
        } else if (
          recharges.user_payment_method.payment_method.name ===
          paymentMethod.paypal.name
        ) {
          return (
            <p>
              {recharges.user_payment_method.payment_method_email}(
              {recharges.user_payment_method.payment_method_description})
            </p>
          );
        } else {
          return (
            <p>{recharges.user_payment_method.payment_method_description}</p>
          );
        }

      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            {recharges.status === "pending" && (
              <>
                <Tooltip color="success" content="Aplicar Recarga">
                  <button
                    onClick={() => handleApplyrecharge(recharges.id)}
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                  >
                    <CheckmarkIcon />
                  </button>
                </Tooltip>
                <Tooltip color="danger" content="Cancelar Recarga">
                  <button
                    onClick={() => handleCancelRecharge(recharges.id)}
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                  >
                    <DeleteRowIcon />
                  </button>
                </Tooltip>
              </>
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
