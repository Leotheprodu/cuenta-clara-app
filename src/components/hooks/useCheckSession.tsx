"use client";
import { useEffect } from "react";
import { $user } from "@/stores/users";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $GlobalLoading, $internalLinkName } from "@/stores/generalConfig";
import { internalLinks, isUserRequired } from "../Utils/internalLinks";
export const useCheckSession = () => {
  const user = useStore($user);
  const internalLinkName = useStore($internalLinkName);
  const {
    status: statusCheckSession,
    data,
    isLoading,
    refetch: refetchCheckSession,
  } = useQuery({
    queryKey: ["checkIsLogedIn"],
    queryFn: async () =>
      await fetchAPI({
        url: "auth/check-session",
      }),
    /*  refetchOnWindowFocus: false, */
  });
  useEffect(() => {
    $GlobalLoading.set({ isLoading, message: "Actualizando sesión..." });
  }, [isLoading]);
  useEffect(() => {
    if (!user.isLoggedIn && !isUserRequired(internalLinkName)) {
      return;
    } else if (
      !user.isLoggedIn &&
      isUserRequired(internalLinkName) &&
      statusCheckSession === "error"
    ) {
      redirect(internalLinks("users"));
    }
  }, [
    user.isLoggedIn,
    internalLinkName,
    refetchCheckSession,
    statusCheckSession,
  ]);
  useEffect(() => {
    if (statusCheckSession === "success") {
      if (data.isLoggedIn) {
        $user.set(data);
      } else if (!data.isLoggedIn && isUserRequired(internalLinkName)) {
        $user.set({ ...user, isLoggedIn: false });
      }
    } else if (
      statusCheckSession === "error" &&
      isUserRequired(internalLinkName)
    ) {
      $user.set({ ...user, isLoggedIn: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, statusCheckSession]);
  return {
    statusCheckSession,
  };
};
