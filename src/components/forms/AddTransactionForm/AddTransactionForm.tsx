import { Button } from "@nextui-org/react";
import { useAddTransactionForm } from "./useAddTransactionForm";
import { moneyFormat } from "@/components/Utils/dataFormat";

export const AddTransactionForm = ({
  handleTransactions,
}: handleTransactionsProps) => {
  const { invoice } = handleTransactions;
  const { handleAddTransaction } = useAddTransactionForm({
    handleTransactions,
  });

  return (
    <form id="add-transaction-form" onSubmit={handleAddTransaction}>
      <div>
        <h2>
          Monto total de la factura:{" "}
          <span className="font-bold">{moneyFormat(invoice.total_amount)}</span>
        </h2>
      </div>
    </form>
  );
};
