"use client";
import { useStore } from "@nanostores/react";
import { $user } from "@/stores/users";
import Link from "next/link";
import { internalLinks } from "@/components/Utils/internalLinks";

export const RechargingBalance = ({
  balanceType,
}: {
  balanceType: BalanceTypes;
}) => {
  const user = useStore($user);
  return <div>RechargingBalance</div>;
};
