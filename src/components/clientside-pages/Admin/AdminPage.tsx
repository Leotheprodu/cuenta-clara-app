"use client";

import { useLoadingByCriticProcess } from "@/components/hooks/useLoadingByCriticProcess";
import { useNamingPagesRoutes } from "@/components/hooks/useNamingPagesRoutes";

export const AdminPage = () => {
  useNamingPagesRoutes({ internalLink: "admin" });

  const { showLoading, LoadingElement } = useLoadingByCriticProcess();

  if (showLoading) {
    return LoadingElement;
  }

  return <div className="flex flex-col gap-10">AdminPage</div>;
};
