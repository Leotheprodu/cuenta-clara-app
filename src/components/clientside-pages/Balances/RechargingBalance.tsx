"use client";
import { moneyFormat } from "@/components/Utils/dataFormat";
import { appName } from "@/data/constants";
import { useRechargingBalance } from "./useRechargingBalance";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { PaymentMethodItem } from "./PaymentMethodItem";
export const RechargingBalance = ({
  balanceType,
}: {
  balanceType: BalanceTypes;
}) => {
  const {
    user,
    saludo,
    paymentNames,
    handleSelectedMethod,
    selectedMethod,
    infoSelectedMethod,
    balanceRechargeInfo,
    handleSendRecharge,
    isPendingSendRecharge,
    statusSendRecharge,
  } = useRechargingBalance({ balanceType });
  return (
    <section className="pb-20">
      <div className="flex flex-col items-center">
        <p className="sm:w-1/2 mx-2 bg-slate-100 p-3 rounded-sm shadow-sm text-slate-600">
          {saludo} {user?.user.username}!👋 estas a punto de{" "}
          <span className="font-bold">recargar tu saldo</span> que actualmente
          es de {moneyFormat(user?.balance)} el costo de una{" "}
          <span className="bg-red-100 p-1 rounded-sm">{balanceType.name}</span>{" "}
          es de {moneyFormat(balanceType.price)} pero al terminar de procesar el
          pago obtendras un saldo de{" "}
          {moneyFormat(balanceType.balance * 1 + user?.balance)} es decir, te
          damos un bono de{" "}
          {moneyFormat(balanceType.balance - balanceType.price)} 😁👌 para que
          sigas usando <span className="gradient-text">{appName}</span>
        </p>
      </div>
      <h2 className=" my-7 text-center text-slate-600">
        Sigue estos 3 simples pasos para recargar tu saldo
      </h2>

      <div className="w-1/2 my-0 mx-auto">
        <h3 className="mb-10 text-slate-600">
          1. Selecciona el metodo de pago que mas te guste
        </h3>
        <RadioGroup value={selectedMethod} onValueChange={handleSelectedMethod}>
          {paymentNames.map((payment_name) => (
            <Radio key={payment_name.id} value={`${payment_name.id}`}>
              {payment_name.name}
            </Radio>
          ))}
        </RadioGroup>
      </div>
      <div className="w-1/2 my-0 mx-auto">
        {infoSelectedMethod.length > 0 && (
          <div className="flex flex-col items-center my-10">
            <h3 className="mb-10 text-slate-600">
              2. Realiza el pago con la siguiente informacion, al tocar el
              numero/correo/cuenta lo copias para que vayas a tu app favorita a
              pagar cuando lo hagas vuelves para que hagas el tercer paso.
            </h3>
            <div className=" flex justify-center items-center gap-2 flex-wrap">
              {infoSelectedMethod.map((payment_method) => (
                <PaymentMethodItem
                  key={payment_method.id}
                  payment_method={payment_method}
                />
              ))}
            </div>
            <p className="mt-10 text-slate-600">
              {" "}
              Recuerda guardar el comprobante para enviarlo por whatsapp en el
              siguiente paso para agilizar la recarga.
            </p>
          </div>
        )}
      </div>
      <div>
        {balanceRechargeInfo.payment_method.id > 0 && (
          <div className="w-1/2 my-0 mx-auto flex flex-col items-center justify-center">
            <h3 className="mb-10 text-slate-600">
              3. Una vez realizado el pago, toca el siguiente boton, para
              confirmar la recarga ademas te conectaremos a whatsapp para que
              puedas enviar el comprobante.
            </h3>
            <Button
              isLoading={isPendingSendRecharge}
              isDisabled={statusSendRecharge === "success"}
              className="w-1/4"
              color="primary"
              variant="shadow"
              onClick={handleSendRecharge}
            >
              Confirmar Pago
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
