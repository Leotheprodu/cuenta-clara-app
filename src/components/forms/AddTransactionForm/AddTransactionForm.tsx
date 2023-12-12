import { Button } from "@nextui-org/react";
import { useAddTransactionForm } from "./useAddTransactionForm";

export const AddTransactionForm = ({ invoice }: { invoice: Invoice }) => {
  const { handleAddTransaction } = useAddTransactionForm({ invoice });

  return (
    <form id="add-transaction-form" onSubmit={handleAddTransaction}></form>
  );
};
