import { fetchAPI } from "@/components/Utils/fetchAPI";
import { ClientDashboardInitialData } from "@/data/constants";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { usePinCheckHandle } from "./usePinCheckHandle";
import toast from "react-hot-toast";
import { notFound } from "next/navigation";

export const useClientSideDashboard = ({ token }: { token: string }) => {
  const [clientInfo, setClientInfo] = useState<ClientDashboardData>(
    ClientDashboardInitialData
  );
  const [clientHavePin, setClientHavePin] = useState<boolean>(false);
  const [okPin, setOkPin] = useState<boolean>(false);
  const { status, error, data, mutate } = useMutation({
    mutationKey: ["dashboard-client"],
    mutationFn: async (pinInput: string) =>
      await fetchAPI({
        url: `clients/dashboard-info/${token}`,
        method: "POST",
        body: {
          pin: pinInput,
        },
      }),
  });
  const { pinCheckHandle } = usePinCheckHandle({
    clientHavePin,
    okPin,
    status,
  });
  const { pin } = pinCheckHandle;
  useEffect(() => {
    if (pin[0] !== "" && pin[1] !== "" && pin[2] !== "" && pin[3] !== "") {
      mutate(pin.join(""));
    }
  }, [pin, mutate]);

  useEffect(() => {
    mutate("");
  }, [mutate]);

  useEffect(() => {
    if (status === "error" && error.message === "Token no encontrado") {
      toast.error("Token no encontrado");
      return notFound();
    }
    if (status === "success") {
      setOkPin(true);
      setClientHavePin(true);
      setClientInfo(data);
    } else if (status === "error" && error.message === "No PIN") {
      setClientHavePin(false);
    } else if (status === "error" && error.message === "Si PIN") {
      setClientHavePin(true);
    } else if (status === "error" && error.message === "New PIN") {
      setClientHavePin(true);
    } else if (status === "error" && error.message === "Invalid PIN") {
      setOkPin(false);
      toast.error("PIN incorrecto, intente de nuevo");
    } else if (status === "error") {
      toast.error("Error al cargar la información");
    }
  }, [status, data, error]);
  return {
    clientInfo,
    okPin,
    pin,
    pinCheckHandle: {
      ...pinCheckHandle,
      clientHavePin,
    },
  };
};
