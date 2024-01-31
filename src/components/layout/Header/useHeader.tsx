import { use, useEffect, useState } from "react";
import { fetchAPI } from "@/components/Utils/fetchAPI";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import { $selectedBusiness } from "@/stores/business";
import { useCheckSession } from "@/components/hooks/useCheckSession";
import { usePathname } from "next/navigation";
import { BusinessDefault } from "@/data/constants";
import { moneyFormat } from "@/components/Utils/dataFormat";
import { $GlobalLoading, $internalLinkName } from "@/stores/generalConfig";
import { isUserRequired } from "@/components/Utils/internalLinks";

export const useHeader = () => {
  const { statusCheckSession } = useCheckSession();
  const path = usePathname();
  const user = useStore($user);
  const [business, setBusiness] = useState([BusinessDefault]);
  const [value, setValue] = useState(new Set(["0"]));
  const [showBalance, setShowBalance] = useState(false);
  const internalLinkName = useStore($internalLinkName);
  const {
    status: statusBusiness,
    data: dataBusiness,
    isLoading: isLoadingBusiness,
    refetch,
  } = useQuery({
    queryKey: ["users-business"],
    queryFn: async () =>
      await fetchAPI({
        url: "users_business",
      }),
    retry: 2,
  });
  useEffect(() => {
    $GlobalLoading.set({ isLoading: false, message: `pagina cargada` });
  }, [internalLinkName]);
  useEffect(() => {
    if (
      user.isLoggedIn &&
      isUserRequired(internalLinkName) &&
      business[0].id === 0
    ) {
      refetch();
    }
  }, [user.isLoggedIn, business, refetch, internalLinkName]);

  useEffect(() => {
    if (!user.isLoggedIn) {
      return;
    }
    if (statusBusiness === "success") {
      setBusiness(dataBusiness);
      const defaultBussines = dataBusiness.filter((item: any) => {
        if (item.default) {
          return item;
        }
      });
      if (defaultBussines.length === 1) {
        setValue(new Set([defaultBussines[0].id.toString()]));
        $selectedBusiness.set({
          id: defaultBussines[0].id,
          name: defaultBussines[0].name,
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusBusiness, statusCheckSession, dataBusiness, user.isLoggedIn]);

  const { status, mutate, isPending, data } = useMutation({
    mutationKey: ["favorite-business"],
    mutationFn: async () =>
      await fetchAPI({
        url: `users_business/favorite/${Array.from(value)[0]}`,
      }),
    retry: 2,
  });
  useEffect(() => {
    if (status === "success" && user.isLoggedIn) {
      const defaultBussines = data.filter((item: any) => {
        if (item.default) {
          return item;
        }
      });
      $selectedBusiness.set({
        id: defaultBussines[0].id,
        name: defaultBussines[0].name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, user]);
  const handleSelectionBusiness = (e: any) => {
    setValue(e);
  };
  const handleShowBalance = () => {
    setShowBalance(!showBalance);
  };
  const mutateFunction = () => {
    mutate();
  };
  return {
    business,
    isLoadingBusiness,
    value,
    handleSelectionBusiness,
    isPending,
    mutateFunction,
    path,
    isLoggedIn: user.isLoggedIn,
    balance: moneyFormat(user.balance),
    handleShowBalance,
    showBalance,
  };
};
