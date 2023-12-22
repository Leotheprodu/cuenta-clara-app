import { handleOnChange } from "@/components/Utils/formUtils";
import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { initialStateTransactionForm, paymentStatus } from "@/data/constants";
import { getCurrentDate } from "@/components/Utils/getCurrentDate";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { fetchAPI } from "@/components/Utils/fetchAPI";
export const useAddTransactionForm = ({
  handleTransactions,
  onClose,
}: handleTransactionsProps) => {
  const user = useStore($user);
  const { invoice, refetchInvoices } = handleTransactions;
  const balanceInvoice =
    invoice.total_amount -
    invoice.transactions.reduce((acc: number, transaction: Transaction) => {
      return acc + parseFloat(transaction.amount);
    }, 0);
  const [form, setForm] = useState({
    ...initialStateTransactionForm,
    date: getCurrentDate(),
    amount: balanceInvoice,
    description: `Pago de factura #${invoice.id}`,
  });
  const [payment_method_id, setPayment_method_id] = useState<string>("1");
  const {
    status: statusAddTransaction,
    error: errorAddTransaction,
    data: dataAddTransaction,
    mutate: mutateAddTransaction,
  } = useMutation({
    mutationKey: ["invoice-add-transaction"],
    mutationFn: async () =>
      await fetchAPI({
        url: `invoices/add-transaction/${invoice.client.id}`,
        method: "POST",
        body: form,
      }),
  });

  useEffect(() => {
    if (statusAddTransaction === "success") {
      toast.success("Transaccion agregada con exito");
      refetchInvoices();
      onClose();
    } else if (statusAddTransaction === "error") {
      toast.error(errorAddTransaction.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusAddTransaction]);
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
  useEffect(() => {
    setForm({
      ...form,
      parent_user_id: user.user.id,
      client_id: invoice.client.id,
      payment_method_id: parseInt(payment_method_id, 10),
      invoice_id: invoice.id,
      status_id: paymentStatus.completed.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice, user, paymentStatus]);
  const handleSelectPaymentMethod = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPayment_method_id(e.target.value);
  };
  const handleAddTransaction = (e: any) => {
    e.preventDefault();
    mutateAddTransaction();
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
