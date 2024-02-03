import { useState, useEffect } from "react";
import { formatDate, moneyFormat } from "@/components/Utils/dataFormat";
import { paymentStatus } from "@/data/constants";

export const useTransactionsModal = ({
  handleTransactions,
}: handleTransactionsProps) => {
  const { invoice } = handleTransactions;
  const columnNames = [
    { key: "id", name: "Id" },
    { key: "date", name: "Fecha" },
    { key: "description", name: "Descripcion" },
    { key: "payment_method", name: "Metodo de pago" },
    { key: "amount", name: "Monto" },
    { key: "status", name: "Estado" },
  ];
  const [pendingMount, setPendingMount] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  useEffect(() => {
    const totalTransactions = invoice.transactions.reduce(
      (acc: number, transaction: Transaction) => {
        return acc + parseFloat(transaction.amount);
      },
      0
    );
    setTotalTransactions(totalTransactions);
    setPendingMount(invoice.total_amount - totalTransactions);
  }, [invoice]);
  const renderCell = (
    transactions: Transaction,
    columnKey: any,
    index: any
  ) => {
    switch (columnKey) {
      case "id":
        return (
          <div className="flex justify-center">
            <small className="text-center">{transactions.id}</small>
          </div>
        );
      case "amount":
        return (
          <div className="flex justify-center">
            <small className="text-center">
              {moneyFormat(parseFloat(transactions.amount))}
            </small>
          </div>
        );
      case "date":
        return (
          <div className="flex justify-center">
            <small className="text-center">
              {formatDate(transactions.date)}
            </small>
          </div>
        );
      case "description":
        return (
          <div className="flex justify-center">
            <small className="text-center truncate max-w-[10rem] whitespace-pre-line">
              {transactions.description}
            </small>
          </div>
        );
      case "payment_method":
        return (
          <div className="flex justify-center">
            <small className="text-center">
              {transactions.payment_method.name}
            </small>
          </div>
        );
      case "status":
        return (
          <div className="flex justify-center">
            <small className="text-center">
              {paymentStatus[transactions.payment_status.name].name}
            </small>
          </div>
        );
      default:
        return <small>Columna Invalida</small>;
    }
  };
  return {
    handle: {
      columnNames,
      renderCell,
      totalTransactions,
      pendingMount,
    },
  };
};
