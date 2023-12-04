import { useStore } from "@nanostores/react";
import { $isCheckingSession } from "@/stores/generalConfig";
import Loading from "@/app/loading";
/* import { useEffect, useState } from "react"; */

export const useLoadingByCriticProcess = ({ label }: { label: string }) => {
  const isCheckingSession = useStore($isCheckingSession);

  return {
    showLoading: isCheckingSession,
    LoadingElement: <Loading label={label} />,
  };
};
