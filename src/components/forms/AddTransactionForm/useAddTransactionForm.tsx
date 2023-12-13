export const useAddTransactionForm = ({
  handleTransactions,
}: handleTransactionsProps) => {
  const { invoice, refetchInvoices } = handleTransactions;
  const handleAddTransaction = (e: any) => {
    e.preventDefault();
    console.log("handleAddTransaction");
  };
  return {
    handleAddTransaction,
  };
};
