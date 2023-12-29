import { formatNumber, moneyFormat } from "@/components/Utils/dataFormat";
import { internalLinks } from "@/components/Utils/internalLinks";
import { billingPrice } from "@/data/constants";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { CheckmarkIcon } from "react-hot-toast";

export const RechargeTypeItem = ({
  balanceType,
}: {
  balanceType: BalanceTypes;
}) => {
  return (
    <div className="bg-blanco rounded-xl shadow-large w-[20rem] h-[25rem] overflow-hidden hover:scale-105 duration-75 ease-in">
      <div className="p-3 h-[6rem] border-b-1 border-b-primario/20 flex flex-col items-center">
        <h3 className="text-2xl text-center uppercase gradient-text">
          {balanceType.name}
        </h3>
        <small className="text-3xl font-bold text-center">
          {moneyFormat(balanceType.price)}
          <span className="ml-3 text-lg text-gray-500 font-thin">c/u</span>
        </small>
      </div>
      <div className="p-3 flex flex-col gap-7">
        <div className="flex gap-1">
          <CheckmarkIcon className="text-sm" />
          <p className="text-sm">
            Obtienes {balanceType.extra * 100}% extra de saldo (
            {moneyFormat(balanceType.balance)})
          </p>
        </div>
        <div className="flex gap-1">
          <CheckmarkIcon className="text-sm" />
          <p className="text-sm">
            Permite crear hasta{" "}
            {moneyFormat(balanceType.balance / billingPrice)} en facturas
          </p>
        </div>
        <div className="flex gap-1">
          <CheckmarkIcon className="text-sm" />
          <p className="text-sm">
            Representa el{" "}
            {formatNumber(
              (balanceType.price / (balanceType.balance / billingPrice)) * 100
            )}
            % de tus ingresos
          </p>
        </div>
      </div>
      <div className=" flex justify-center my-5">
        <Button
          href={`${internalLinks("recharges")}/${balanceType.id}`}
          as={Link}
          type="button"
          color="success"
          variant="shadow"
        >
          {" "}
          Seleccionar
        </Button>
      </div>
    </div>
  );
};
