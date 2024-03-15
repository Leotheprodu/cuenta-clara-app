"use client";
import Link from "next/link";
import { useHeader } from "./useHeader";
import { HeaderBusinessSelector } from "./HeaderBusinessSelector";
import { appName } from "@/data/constants";
import { NavMenu } from "./NavMenu";

export const Header = () => {
  const {
    business,
    isLoadingBusiness,
    handleSelectionBusiness,
    value,
    isPending,
    path,
    balance,
    handleShowBalance,
    showBalance,
  } = useHeader();
  return (
    <header className="h-16 flex w-screen bg-primario fixed top-0 z-20">
      <div className="flex w-full h-full items-center px-1 sm:px-6">
        <Link href="/">
          <h1 className="gradient-text font-sans uppercase">{appName}</h1>
        </Link>

        <HeaderBusinessSelector
          handle={{
            business,
            isLoadingBusiness,
            handleSelectionBusiness,
            value,
            isPending,
            path,
            balance,
            handleShowBalance,
            showBalance,
          }}
        />
      </div>
      <NavMenu />
    </header>
  );
};
