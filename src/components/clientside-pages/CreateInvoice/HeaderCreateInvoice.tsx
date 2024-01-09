import { ModalChangeClient } from "@/components/clientside-pages/Invoices/ModalChangeClient";
import { $selectedBusiness } from "@/stores/business";
import { useStore } from "@nanostores/react";

export const HeaderCreateInvoice = ({ handle }: HeaderCreateInvoiceProps) => {
  const { username } = handle;
  const selectedBusiness = useStore($selectedBusiness);
  return (
    <div className="bg-secundario z-10 w-full h-[3rem] flex gap-2 justify-center items-center fixed left-0">
      <ModalChangeClient />
      <p className="bg-primario p-1 rounded-md text-center text-blanco">
        Cliente: <span className="uppercase text-terciario">{username}</span>
      </p>

      {selectedBusiness && (
        <p className="bg-primario p-1 rounded-md text-center text-blanco">
          Negocio:{" "}
          <span className="uppercase text-terciario">
            {selectedBusiness.name}
          </span>
        </p>
      )}
    </div>
  );
};
