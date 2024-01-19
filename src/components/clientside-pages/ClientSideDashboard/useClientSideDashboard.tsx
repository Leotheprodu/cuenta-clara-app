import { fetchAPI } from "@/components/Utils/fetchAPI";
import { ClientDashboardInitialData } from "@/data/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { use, useEffect, useState } from "react";
import { usePinCheckHandle } from "./usePinCheckHandle";
import toast from "react-hot-toast";

export const useClientSideDashboard = ({ token }: { token: string }) => {
  const [clientInfo, setClientInfo] = useState<ClientDashboardData>(
    ClientDashboardInitialData
  );
  const [clientHavePin, setClientHavePin] = useState<boolean>(false);
  const [okPin, setOkPin] = useState<boolean>(false);
  const { status, error, data, mutate } = useMutation({
    mutationKey: ["dashboard-client"],
    mutationFn: async () =>
      await fetchAPI({
        url: `clients/dashboard-info/${token}`,
        method: "POST",
        body: {
          pin: pin.join(""),
        },
      }),
  });
  const { pinCheckHandle } = usePinCheckHandle({ clientHavePin, okPin });
  const { pin } = pinCheckHandle;
  useEffect(() => {
    if (pin[0] !== "" && pin[1] !== "" && pin[2] !== "" && pin[3] !== "") {
      mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]);

  useEffect(() => {
    mutate();
  }, [mutate]);

  useEffect(() => {
    if (status === "success") {
      setOkPin(true);
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
    }
  }, [status, data, error]);

  return {
    clientInfo,
    okPin,
    pinCheckHandle: {
      ...pinCheckHandle,
      clientHavePin,
    },
  };
};
