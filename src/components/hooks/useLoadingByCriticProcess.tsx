import { useStore } from "@nanostores/react";
import Loading from "@/app/loading";
import { $GlobalLoading } from "@/stores/generalConfig";
/* import { useEffect, useState } from "react"; */

export const useLoadingByCriticProcess = () => {
  const { isLoading, message } = useStore($GlobalLoading);

  return {
    showLoading: isLoading,
    LoadingElement: <Loading label={message} />,
  };
};
