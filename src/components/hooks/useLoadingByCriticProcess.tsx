import { useStore } from "@nanostores/react";
import Loading from "@/app/loading";
import { $GlobalLoading } from "@/stores/generalConfig";
import { useEffect, useState } from "react";
/* import { useEffect, useState } from "react"; */

export const useLoadingByCriticProcess = () => {
  const { isLoading, message } = useStore($GlobalLoading);
  const [activar, setActivar] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setActivar(true);
    } else {
      setTimeout(() => {
        setActivar(false);
      }, 1000);
    }
  }, [isLoading]);
  return {
    showLoading: activar,
    LoadingElement: <Loading label={message} />,
  };
};
