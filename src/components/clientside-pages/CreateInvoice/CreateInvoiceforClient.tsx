"use client";
import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  button,
} from "@nextui-org/react";
import { useCreateInvoiceforClient } from "./useCreateInvoiceforClient";
import { PageWrapper } from "@/components/Utils/PageWrapper";
import { HeaderCreateInvoice } from "./HeaderCreateInvoice";
import { NotClientInBusiness } from "./NotClientInBusiness";
import { CreateInvoiceDetail } from "./CreateInvoiceDetail";
import { moneyFormat } from "@/components/Utils/dataFormat";
import { AddIcon } from "@/icons/AddIcon";
import { ChangeCalculator } from "./ChangeCalculator";
import { paymentMethod } from "@/data/constants";
import { PaymentMethodItem } from "../Balances/PaymentMethodItem";

export const CreateInvoiceforClient = ({ id }: { id: string }) => {
  const {
    date,
    handleOnChange,
    username,
    businessSelected,
    createInvoiceDetail,
    total,
    payNow,
    handlePayNow,
    paymentNames,
    infoSelectedMethod,
    payment_method_id,
    handleCreateInvoice,
    handleSelectPaymentMethod,
  } = useCreateInvoiceforClient({
    id,
  });
  const { handleOpenAddDetail } = createInvoiceDetail;
  if (!businessSelected.isClientInBusiness)
    return <NotClientInBusiness handle={{ username, businessSelected }} />;

  return (
    <div className="w-full flex flex-col gap-2 mb-20">
      <HeaderCreateInvoice handle={{ username: username || "Seleccione" }} />
      <section className="pt-2 px-4">
        <PageWrapper>
          <form
            onSubmit={handleCreateInvoice}
            className="w-[20rem] sm:w-full mt-20 bg-gris/30 p-4 rounded-xl shadow-md"
          >
            <h2 className="text-2xl text-center font-bold my-2">
              Crear Factura
            </h2>
            <div className="flex gap-4 mb-4 items-center">
              <Input
                className="w-[10rem]"
                labelPlacement="inside"
                isRequired
                variant="underlined"
                type="date"
                name="date"
                value={date}
                onChange={handleOnChange}
              />
              <Button
                color="primary"
                variant="light"
                className=" uppercase"
                onPress={() => handleOpenAddDetail()}
                startContent={<AddIcon className="" />}
              >
                Agregar detalle
              </Button>
            </div>
            <CreateInvoiceDetail handle={{ createInvoiceDetail }} />
            <div className="flex flex-col">
              <div className="flex justify-between w-full">
                <div className="flex flex-col mt-3 gap-3 w-1/2">
                  <Checkbox
                    isSelected={payNow}
                    onValueChange={handlePayNow}
                    size="lg"
                  >
                    Paga ahora
                  </Checkbox>
                  {payNow && (
                    <Select
                      label="metodo de pago"
                      placeholder="selecciona el methodo de pago"
                      aria-label="metodo de pago"
                      variant="flat"
                      color="primary"
                      onChange={handleSelectPaymentMethod}
                      selectedKeys={[payment_method_id]}
                    >
                      {paymentNames.map((method) => (
                        <SelectItem
                          className="uppercase"
                          key={method.id}
                          value={method.id}
                        >
                          {method.name}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                  {payNow &&
                    payment_method_id === `${paymentMethod.cash.id}` && (
                      <ChangeCalculator total={total} />
                    )}
                </div>
                <div className="flex flex-col w-1/2">
                  <div className=" text-secundario rounded-xl flex justify-end mt-4 ">
                    <p className="bg-gris rounded-lg p-3 shadow-md">
                      Total:{" "}
                      <span className="text-primario">
                        {moneyFormat(total)}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-end mt-8 gap-4">
                    <Button
                      color="primary"
                      variant="solid"
                      className="uppercase"
                      type="submit"
                    >
                      {" "}
                      Crear Factura
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 justify-center items-center bg-slate-100 mt-4 shadow-sm rounded-lg">
                {payNow &&
                  payment_method_id !== `${paymentMethod.cash.id}` &&
                  infoSelectedMethod.map((payment_method) => (
                    <PaymentMethodItem
                      key={payment_method.id}
                      payment_method={payment_method}
                    />
                  ))}
              </div>
            </div>
          </form>
        </PageWrapper>
      </section>
    </div>
  );
};
