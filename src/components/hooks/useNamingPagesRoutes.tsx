import { $internalLinkName } from "@/stores/generalConfig";
import { useEffect } from "react";
export const useNamingPagesRoutes = ({
  internalLink,
}: {
  internalLink: string;
}) => {
  useEffect(() => {
    if (internalLink) {
      $internalLinkName.set(internalLink);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalLink]);
};
