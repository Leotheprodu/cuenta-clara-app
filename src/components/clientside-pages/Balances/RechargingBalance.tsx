"use client";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import Link from "next/link";
import { internalLinks } from "@/components/Utils/internalLinks";
import { moneyFormat } from "@/components/Utils/dataFormat";
import { useEffect, useState } from "react";
import { appName, ramdomSaludo } from "@/data/constants";

export const RechargingBalance = ({
  balanceType,
}: {
  balanceType: BalanceTypes;
}) => {
  const user = useStore($user);
  const [saludo, setSaludo] = useState<string>("");
  useEffect(() => {
    const cantidad = ramdomSaludo.length;
    const random = Math.floor(Math.random() * cantidad);
    setSaludo(ramdomSaludo[random]);
  }, []);
  return (
    <section>
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
      <div>
        <div>
          <h3>1. Selecciona el método de pago</h3>
        </div>
      </div>
    </section>
  );
};
