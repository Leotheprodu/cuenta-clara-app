"use client";
import { RechargeTypeItem } from "./RechargeTypeItem";
import { useRecargeBalance } from "./useRecargeBalance";

export const RechargeBalance = () => {
  const { balanceTypes } = useRecargeBalance();
  return (
    <div className="relative">
      <section className="bg-secundario w-full text-gris text-center pt-10 pb-28 ">
        <div className="w-1/2 my-0 mx-auto">
          <h1 className="text-2xl mb-8">Recargar Saldo</h1>
          <p className="text-base font-light">
            Para poder utilizar esta aplicación es necesario que recargues
            saldo, este saldo son puntos y se llaman colones (como la moneda de
            Costa Rica).
          </p>
          <br />

          <p className="text-base font-light ">
            Este saldo se va a ir descontando a medida que vayas utilizando la
            aplicación.
          </p>
        </div>
      </section>
      <section className="absolute bottom-[-4rem] w-full">
        <div className="flex gap-4 justify-center items-center flex-wrap">
          {balanceTypes.map((balanceType) => (
            <RechargeTypeItem key={balanceType.id} balanceType={balanceType} />
          ))}
        </div>
      </section>
    </div>
  );
};
