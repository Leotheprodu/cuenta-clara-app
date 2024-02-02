import Loading from "@/app/loading";
import { ModalChangeClient } from "@/components/clientside-pages/Invoices/ModalChangeClient";
import { $selectedBusiness } from "@/stores/business";
import { $AppState } from "@/stores/generalConfig";
import { useStore } from "@nanostores/react";
import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";

export const HeaderCreateInvoice = ({ handle }: HeaderCreateInvoiceProps) => {
  const {
    username = "Seleccione",
    showChangeClient = true,
    isLoading = false,
  } = handle;
  const appState = useStore($AppState);
  const selectedBusiness = useStore($selectedBusiness);
  useEffect(() => {
    $AppState.set({ ...appState, client_name: username });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div className="bg-secundario z-10 w-screen h-[3rem] flex gap-2 justify-center items-center fixed left-0">
      {showChangeClient && <ModalChangeClient />}
      <div className="flex text-sm sm:text-base text-blanco gap-1">
        <p>Cliente:</p>
        {isLoading ? (
          <Spinner size="sm" color="warning" />
        ) : username === "" ? (
          <span className="uppercase text-terciario">Seleccione</span>
        ) : (
          <span className="uppercase text-terciario">{username}</span>
        )}
      </div>

      {selectedBusiness && (
        <p className="text-sm sm:text-base text-center text-blanco">
          Negocio:{" "}
          <span className="uppercase text-terciario">
            {selectedBusiness.name}
          </span>
        </p>
      )}
    </div>
  );
};
