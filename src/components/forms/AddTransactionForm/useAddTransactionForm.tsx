export const useAddTransactionForm = ({ invoice }: { invoice: Invoice }) => {
  const handleAddTransaction = (e: any) => {
    e.preventDefault();
    console.log("handleAddTransaction");
  };
  return {
    handleAddTransaction,
  };
};
