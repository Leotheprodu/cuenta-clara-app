import { $balanceRechargeInfo } from "@/stores/business";
import { useStore } from "@nanostores/react";
import toast from "react-hot-toast";

export const PaymentMethodItem = ({
  payment_method,
}: {
  payment_method: PaymentInfo;
}) => {
  const balanceRechargeInfo = useStore($balanceRechargeInfo);
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
  return (
    <div
      className="flex flex-col justify-center items-center gap-2 bg-slate-200 shadow-medium rounded-md p-2 hover:scale-110 ease-in duration-200 cursor-pointer"
      onClick={() => handleSelectedMethodDetail(payment_method)}
    >
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
            {payment_method.payment_method_cellphone}
          </span>
        </p>
      )}
      {payment_method.payment_method_email && (
        <p className="">
          email:{" "}
          <span
            className=" font-bold cursor-pointer hover:text-slate-600 hover:underline"
            onClick={() => handleCopyText(payment_method.payment_method_email)}
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
    </div>
  );
};
