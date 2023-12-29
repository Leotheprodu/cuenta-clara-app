"use client";
import { RechargeTypeItem } from "./RechargeTypeItem";
import { useRecargeBalance } from "./useRecargeBalance";

export const RechargeBalance = () => {
  const { balanceTypes } = useRecargeBalance();
  return (
    <div className="">
      <section className="bg-secundario w-full text-gris text-center pt-10 pb-28 ">
        <div className="w-1/2 my-0 mx-auto">
          <h1 className="text-2xl mb-8">Recarga de Saldo</h1>
          <p className="text-base font-light">
            Para poder utilizar esta aplicación es necesario tener saldo
            positivo, y ademas realizar cualquiera de estas recargas al menos
            una vez al mes para tener tu cuenta activa.
          </p>
          <br />

          <p className="text-base font-light ">
            Este saldo se va a ir descontando a medida que vayas utilizando la
            aplicación.
          </p>
        </div>
      </section>
      <section className="relative w-full">
        <div className="flex gap-4 justify-center items-center flex-wrap absolute top-[-3rem] pb-24">
          {balanceTypes.map((balanceType) => (
            <RechargeTypeItem key={balanceType.id} balanceType={balanceType} />
          ))}
        </div>
      </section>
    </div>
  );
};
