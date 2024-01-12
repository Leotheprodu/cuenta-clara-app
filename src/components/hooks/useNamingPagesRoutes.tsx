import { $AppState } from "@/stores/generalConfig";
import { useStore } from "@nanostores/react";
import { useEffect } from "react";
export const useNamingPagesRoutes = ({
  internalLink,
}: {
  internalLink: string;
}) => {
  const appState = useStore($AppState);

  useEffect(() => {
    $AppState.set({
      ...appState,
      page: internalLink,
    });
    console.log(internalLink);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalLink]);
};
