import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useAddTransactionForm } from "./useAddTransactionForm";
import { paymentMethods } from "@/data/constants";
import { getCurrentDate } from "@/components/Utils/getCurrentDate";

export const AddTransactionForm = ({
  handleTransactions,
}: handleTransactionsProps) => {
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
          required
          value={amount.toString()}
          onChange={handleOnChange}
        ></Input>
        <Select
          label="metodo de pago"
          placeholder="selecciona el methodo de pago"
          aria-label="metodo de pago"
          variant="flat"
          color="primary"
          onChange={handleSelectPaymentMethod}
          selectedKeys={[payment_method_id]}
        >
          {paymentMethods.map((method) => (
            <SelectItem className="uppercase" key={method.id} value={method.id}>
              {method.name}
            </SelectItem>
          ))}
        </Select>
        <Input
          variant="flat"
          color="primary"
          label="Detalle"
          type="text"
          name="description"
          placeholder="Ingresa algun detalle si es necesario"
          className=""
          value={description}
          onChange={handleOnChange}
        ></Input>
      </div>
    </form>
  );
};
