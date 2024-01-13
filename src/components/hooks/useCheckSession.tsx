"use client";
import { useEffect } from "react";
import { $user } from "@/stores/users";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import {
  $AppState,
  $internalLinkName,
  $isCheckingSession,
} from "@/stores/generalConfig";
import { internalLinks, isUserRequired } from "../Utils/internalLinks";
export const useCheckSession = () => {
  const user = useStore($user);
  const appState = useStore($AppState);
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
    $isCheckingSession.set(isLoading);
  }, [isLoading]);
  console.log(appState);
  useEffect(() => {
    if (!user.isLoggedIn && !isUserRequired(internalLinkName)) {
      return;
    } else if (!user.isLoggedIn && isUserRequired(internalLinkName)) {
      redirect(internalLinks("users"));
    } else {
      refetchCheckSession();
    }
  }, [user.isLoggedIn, internalLinkName, refetchCheckSession]);
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
