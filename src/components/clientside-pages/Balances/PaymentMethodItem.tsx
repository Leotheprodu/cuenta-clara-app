"use client";
import { $balanceRechargeInfo } from "@/stores/business";
import { useStore } from "@nanostores/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { cellphoneFormat } from "@/components/Utils/cellphoneFormat";
import { ShowQrCode } from "./ShowQrCode";
import { Button } from "@nextui-org/react";
export const PaymentMethodItem = ({
  payment_method,
}: {
  payment_method: PaymentInfo;
}) => {
  const maxWidth = typeof window !== "undefined" ? window.innerWidth - 130 : 0; // 300 es el margen derecho que deseas
  const maxHeight =
    typeof window !== "undefined" ? window.innerHeight - 300 : 0; // 500 es el margen inferior que deseas
  const balanceRechargeInfo = useStore($balanceRechargeInfo);
  const [showBigQR, setShowBigQR] = useState<boolean>(false);
  const handleCopyText = (textToCopy: string) => {
    // Copia el contenido del estado al portapapeles
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success(`${textToCopy} Copiado al portapapeles`);
      })
      .catch((err) => {
        toast.error(`No se pudo copiar al portapapeles`);
      });
  };
  const handleSelectedMethodDetail = (payment_method: PaymentInfo) => {
    $balanceRechargeInfo.set({
      ...balanceRechargeInfo,
      payment_method,
    });
  };
  const handleShowBigQR = () => {
    setShowBigQR(!showBigQR);
  };
  return (
    <>
      {showBigQR && (
        <motion.div
          drag
          dragConstraints={{
            top: 0,
            left: 0,
            right: maxWidth,
            bottom: maxHeight,
          }}
          layoutId={`qr-${payment_method.id}`}
          className="fixed left-2 top-[8rem] z-40 bg-blanco p-4 shadow-sm rounded-md border-1 border-primario/25"
        >
          <ShowQrCode
            value={payment_method.payment_method_cellphone}
            title={cellphoneFormat(payment_method.payment_method_cellphone)}
            handleShowBigQR={handleShowBigQR}
          />
        </motion.div>
      )}
      <div
        className="flex flex-col justify-center items-center gap-2 bg-primary-50 hover:bg-primary-100 shadow-sm rounded-xl p-2 ease-in duration-200 w-full"
        onClick={() => handleSelectedMethodDetail(payment_method)}
      >
        <h3 className="text-center font-bold text-secundario uppercase">
          {payment_method.payment_method.name}
        </h3>
        {payment_method.payment_method_full_name && (
          <p className="">Nombre: {payment_method.payment_method_full_name}</p>
        )}
        {payment_method.payment_method_cellphone && (
          <p className="">
            numero:{" "}
            <span
              className=" font-bold cursor-pointer hover:text-slate-600 hover:underline"
              onClick={() =>
                handleCopyText(payment_method.payment_method_cellphone)
              }
            >
              {" "}
              {cellphoneFormat(payment_method.payment_method_cellphone)}
            </span>
          </p>
        )}
        {payment_method.payment_method_email && (
          <p className="">
            email:{" "}
            <span
              className=" font-bold cursor-pointer hover:text-slate-600 hover:underline"
              onClick={() =>
                handleCopyText(payment_method.payment_method_email)
              }
            >
              {" "}
              {payment_method.payment_method_email}
            </span>
          </p>
        )}
        {payment_method.payment_method_iban && (
          <p className="">
            cuenta:{" "}
            <span
              className=" font-bold cursor-pointer hover:text-slate-600 hover:underline"
              onClick={() => handleCopyText(payment_method.payment_method_iban)}
            >
              {" "}
              {payment_method.payment_method_iban}
            </span>
          </p>
        )}
        {payment_method.payment_method_description && (
          <p className="">
            descripcion: {payment_method.payment_method_description}
          </p>
        )}
        <motion.div layoutId={`qr-${payment_method.id}`}>
          <Button
            type="button"
            color={showBigQR ? "danger" : "primary"}
            variant="ghost"
            onClick={handleShowBigQR}
          >
            {showBigQR ? "Ocultar QR" : "Ver QR"}
          </Button>
        </motion.div>
      </div>
    </>
  );
};
