"use client";
import { useEffect } from "react";
import { $user } from "@/stores/users";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $AppState, $isCheckingSession } from "@/stores/generalConfig";
import { internalLinks, isUserRequired } from "../Utils/internalLinks";
export const useCheckSession = () => {
  const user = useStore($user);
  const appState = useStore($AppState);
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
    $isCheckingSession.set(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (!user.isLoggedIn && !isUserRequired(appState.page)) {
      return;
    } else if (!user.isLoggedIn && isUserRequired(appState.page)) {
      redirect(internalLinks("users"));
    } else {
      refetchCheckSession();
    }
  }, [user.isLoggedIn, appState, refetchCheckSession]);
  useEffect(() => {
    if (statusCheckSession === "success") {
      if (data.isLoggedIn) {
        $user.set(data);
      } else if (!data.isLoggedIn && isUserRequired(appState.page)) {
        $user.set({ ...user, isLoggedIn: false });
      }
    } else if (
      statusCheckSession === "error" &&
      isUserRequired(appState.page)
    ) {
      $user.set({ ...user, isLoggedIn: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, statusCheckSession]);
  return {
    statusCheckSession,
  };
};
