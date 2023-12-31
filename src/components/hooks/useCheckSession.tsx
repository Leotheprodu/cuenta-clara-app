"use client";
import { useEffect } from "react";
import { $user } from "@/stores/users";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { redirect } from "next/navigation";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $isCheckingSession } from "@/stores/generalConfig";
import { whiteListPaths } from "@/data/constants";
import { internalLinks } from "../Utils/internalLinks";
export const useCheckSession = () => {
  const pathname = usePathname();
  const user = useStore($user);
  const { status, data, isLoading } = useQuery({
    queryKey: ["checkIsLogedIn"],
    queryFn: async () =>
      await fetchAPI({
        url: "auth/check-session",
      }),
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    $isCheckingSession.set(isLoading);
  }, [isLoading]);
  useEffect(() => {
    if (!user.isLoggedIn && !whiteListPaths.includes(pathname)) {
      redirect(internalLinks("users") || "/");
    }
  }, [user, pathname]);
  useEffect(() => {
    if (status === "success") {
      if (data.isLoggedIn) {
        $user.set(data);
      }
    } else if (status === "error") {
      $user.set({ ...user, isLoggedIn: false });
      if (!whiteListPaths.includes(pathname)) {
        redirect(internalLinks("users") || "/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, status]);
};
