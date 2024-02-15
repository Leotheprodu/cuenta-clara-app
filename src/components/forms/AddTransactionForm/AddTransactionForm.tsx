import { Input, Select, SelectItem } from "@nextui-org/react";
import { useAddTransactionForm } from "./useAddTransactionForm";
import { paymentMethod, paymentMethods } from "@/data/constants";
import { ChangeCalculator } from "@/components/clientside-pages/CreateInvoice/ChangeCalculator";

export const AddTransactionForm = ({
  handleTransactions,
  onClose,
}: handleTransactionsFormProps) => {
  const {
    handleAddTransaction,
    handleSelectPaymentMethod,
    payment_method_id,
    handleOnChange,
    date,
    amount,
    description,
  } = useAddTransactionForm({
    handleTransactions,
    onClose,
  });

  return (
    <form
      className="flex flex-col items-center justify-center"
      id="add-transaction-form"
      onSubmit={handleAddTransaction}
    >
      <div className="sm:w-[20rem] flex flex-col items-center justify-center gap-6">
        <Input
          variant="underlined"
          color="primary"
          type="date"
          name="date"
          value={date}
          onChange={handleOnChange}
        ></Input>
        <Input
          variant="flat"
          color="primary"
          label="Monto"
          type="number"
          name="amount"
          placeholder="Ingresa el monto"
          className=""
          isRequired
          value={amount.toString()}
          onChange={handleOnChange}
        ></Input>
        <div className="flex w-full gap-1 items-center justify-center">
          <Select
            className="w-full"
            label="metodo de pago"
            placeholder="selecciona el methodo de pago"
            aria-label="metodo de pago"
            variant="flat"
            color="primary"
            isRequired
            onChange={handleSelectPaymentMethod}
            selectedKeys={[payment_method_id]}
          >
            {paymentMethods.map((method) => (
              <SelectItem
                className="uppercase"
                key={method.id}
                value={method.id}
              >
                {method.name}
              </SelectItem>
            ))}
          </Select>
          {payment_method_id === paymentMethod.cash.id.toString() && (
            <ChangeCalculator total={amount} />
          )}
        </div>
        <Input
          variant="flat"
          color="primary"
          label="Detalle"
          type="text"
          name="description"
          placeholder="Ingrese el detalle de la transaccion"
          className=""
          value={description}
          onChange={handleOnChange}
          isRequired
        ></Input>
      </div>
    </form>
  );
};
