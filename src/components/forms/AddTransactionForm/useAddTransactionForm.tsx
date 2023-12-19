import { handleOnChange } from "@/components/Utils/formUtils";
import { useState } from "react";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { paymentStatus } from "@/data/constants";
export const useAddTransactionForm = ({
  handleTransactions,
  initForm,
}: useTransactionsFormProps) => {
  const user = useStore($user);
  const { invoice, refetchInvoices } = handleTransactions;
  const [form, setForm] = useState(initForm);
  const [payment_method_id, setPayment_method_id] = useState<string>("1");
  const handleSelectPaymentMethod = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPayment_method_id(e.target.value);
  };
  const handleAddTransaction = (e: any) => {
    e.preventDefault();
    const dataToSend = {
      ...form,
      parent_user_id: user.user.id,
      client_id: invoice.client.id,
      payment_method_id: parseInt(payment_method_id, 10),
      invoice_id: invoice.id,
      status_id: paymentStatus.completed.id,
    };
    console.log(dataToSend);
  };
  return {
    ...form,
    handleAddTransaction,
    handleSelectPaymentMethod,
    payment_method_id,
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleOnChange(setForm, e),
  };
};
