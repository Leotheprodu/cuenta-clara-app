import { handleOnChange } from "@/components/Utils/formUtils";
import { useState, useEffect, use } from "react";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { initialStateTransactionForm, paymentStatus } from "@/data/constants";
import { getCurrentDate } from "@/components/Utils/getCurrentDate";
import toast from "react-hot-toast";
export const useAddTransactionForm = ({
  handleTransactions,
}: handleTransactionsProps) => {
  const user = useStore($user);
  const { invoice, refetchInvoices } = handleTransactions;
  const [form, setForm] = useState(initialStateTransactionForm);
  const [payment_method_id, setPayment_method_id] = useState<string>("1");
  const balanceInvoice =
    invoice.total_amount -
    invoice.transactions.reduce((acc: number, transaction: Transaction) => {
      return acc + parseFloat(transaction.amount);
    }, 0);

  useEffect(() => {
    setForm({
      ...form,
      date: getCurrentDate(),
      amount: balanceInvoice,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (form.amount > balanceInvoice) {
      setForm({
        ...form,
        amount: balanceInvoice,
      });
      toast.error("El monto no puede ser mayor al saldo de la factura");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.amount, balanceInvoice]);

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
